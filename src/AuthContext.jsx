import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadProfile = async (currentUser) => {
    if (!supabase || !currentUser) return null;
    const fallbackProfile = {
      email: currentUser.email,
      full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
      role: currentUser.user_metadata?.role || 'user'
    };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) throw error;

      const resolvedProfile = data || fallbackProfile;
      setProfile(resolvedProfile);
      setUserRole(resolvedProfile.role || 'user');
      return resolvedProfile;
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile(fallbackProfile);
      setUserRole(fallbackProfile.role || 'user');
      return fallbackProfile;
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadProfile(session.user);
        } else {
          setUser(null);
          setProfile(null);
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    try {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser(session.user);
            await loadProfile(session.user);
          } else {
            setUser(null);
            setProfile(null);
            setUserRole(null);
          }
          setLoading(false);
        }
      );

      return () => {
        if (data?.subscription?.unsubscribe) {
          data.subscription.unsubscribe();
        }
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
    }
  }, []);

  const signUp = async (email, password, fullName) => {
    if (!supabase) throw new Error('Supabase not initialized');
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (signUpError) throw signUpError;

      // Create profile entry
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          full_name: fullName,
          role: 'user',
          created_at: new Date().toISOString()
        });
      }

      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const logIn = async (email, password) => {
    if (!supabase) throw new Error('Supabase not initialized');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logOut = async () => {
    if (!supabase) throw new Error('Supabase not initialized');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isAdmin = userRole === 'admin';
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  return (
    <AuthContext.Provider value={{ user, loading, userRole, profile, displayName, signUp, logIn, logOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
