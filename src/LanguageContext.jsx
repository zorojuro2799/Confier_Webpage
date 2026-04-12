import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en-us');

  const t = (key) => {
    const dict = {
      'nav.products': { 'en-us': 'Products', 'en-uk': 'Products', de: 'Produkte', te: 'ఉత్పత్తులు', pa: 'ਉਤਪਾਦ', mr: 'उत्पादने', hi: 'उत्पाद', ta: 'தயாரிப்புகள்' },
      'nav.about': { 'en-us': 'Our Story', 'en-uk': 'Our Story', de: 'Über Uns', te: 'మా కథ', pa: 'ਸਾਡੀ ਕਹਾਣੀ', mr: 'आमची कथा', hi: 'हमारी कहानी', ta: 'எங்கள் கதை' },
      'nav.range': { 'en-us': 'Our Range', 'en-uk': 'Our Range', de: 'Unser Sortiment', te: 'మా ఉత్పత్తులు', pa: 'ਸਾਡੀ ਰੇਂਜ', hi: 'हमारी रेंज' },
      'nav.results': { 'en-us': 'Success Stories', 'en-uk': 'Success Stories', de: 'Erfolgsgeschichten', te: 'విజయ గాథలు', pa: 'ਸਫਲਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ', hi: 'सफलता की कहानियाँ' },
      'nav.rnd': { 'en-us': 'Innovation Lab', 'en-uk': 'Innovation Lab', de: 'Innovationslabor', te: 'ఆవిష్కరణ ప్రయోగశాల', hi: 'नवाचार लैब' },
      'nav.contact': { 'en-us': 'Contact Us', 'en-uk': 'Contact Us', de: 'Kontakt', te: 'మమ్మల్ని సంప్రదించండి', pa: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ', hi: 'संपर्क करें' },
      'nav.lang': { 'en-us': 'Language', 'en-uk': 'Language', de: 'Sprache', te: 'భాష', pa: 'ਭਾਸ਼ਾ', hi: 'भाषा' },
      
      // Hero
      'hero.badge': { 'en-us': 'Growing Together', 'en-uk': 'Growing Together', de: 'Gemeinsam Wachsen', te: 'కలిసి ఎదుగుదాం', pa: 'ਮਿਲ ਕੇ ਵਧੀਏ', mr: 'मिळून वाढूया', hi: 'साथ मिलकर बढ़ें', ta: 'ஒன்றாக வளர்வோம்' },
      'hero.title1': { 'en-us': 'Growing Together,', 'en-uk': 'Growing Together,', de: 'Gemeinsam Wachsen,', te: 'కలిసి ఎదుగుదాం,', pa: 'ਮਿਲ ਕੇ ਵਧੀਏ,', mr: 'मिळून वाढूया,', hi: 'साथ मिलकर बढ़ें,', ta: 'ஒன்றாக வளர்வோம்,' },
      'hero.title2': { 'en-us': 'Thriving Together.', 'en-uk': 'Thriving Together.', de: 'Gemeinsam Gedeihen.', te: 'కలిసి వృద్ధి చెందుదాం.', pa: 'ਮਿਲ ਕੇ ਖੁਸ਼ਹਾਲ ਹੋਈਏ।', mr: 'मिळून प्रगती करूया.', hi: 'साथ मिलकर समृद्ध हों।', ta: 'ஒன்றாகச் సెழிப்போம்.' },
      'hero.subtitle': { 'en-us': 'To the hands that nurture our waters: Thank you. Your dedication is the heart of our mission. We are here to ensure every harvest is a success story rooted in trust.', de: 'An die Hände, die unsere Gewässer pflegen: Danke.', te: 'మా నీటిని సంరక్షించే చేతులకు: ధన్యవాదాలు. మీ అంకితభావమే మా లక్ష్యం.', pa: 'ਸਾਡੇ ਪਾਣੀਆਂ ਦੀ ਦੇਖਭਾਲ ਕਰਨ ਵਾਲਿਆਂ ਦਾ ਧੰਨਵਾਦ।', hi: 'उन हाथों को जो हमारे पानी को पोषित करते हैं: धन्यवाद। आपकी मेहनत ही हमारा मिशन है।' },
      'hero.btn1': { 'en-us': 'Discover Our Range', 'en-uk': 'Discover Our Range', de: 'Entdecken', te: 'మా ఉత్పత్తులను కనుగొనండి', pa: 'ਸਾਡੇ ਉਤਪਾਦ ਦੇਖੋ', hi: 'हमारे उत्पाद देखें' },
      'hero.btn2': { 'en-us': 'Watch Success Story', 'en-uk': 'Watch Success Story', de: 'Erfolgsgeschichte', te: 'విజయ కథను చూడండి', pa: 'ਸਫਲਤਾ ਦੀ కహాని ਦੇਖੋ', hi: 'సఫలతా కి కహాని దేఖేం' },
      'hero.stat.growth': { 'en-us': 'Growth Rate', de: 'Wachstumsrate', te: 'వృద్ధి రేటు', hi: 'विकास दर' },
      'hero.stat.survival': { 'en-us': 'Survival Rate', de: 'Überlebensrate', te: 'మనుగడ రేటు', hi: 'జీవిత్ రహనే కి దర్' },
      
      // About
      'about.tag': { 'en-us': 'Our Heart', 'en-uk': 'Our Heart', de: 'Unser Herz', te: 'మా హృదయం', pa: 'ਸਾਡਾ ਦਿਲ', mr: 'आमचे हृदय', hi: 'हमारा हृदय', ta: 'எங்கள் இதயம்' },
      'about.title': { 'en-us': 'A Promise Rooted in Trust', 'en-uk': 'A Promise Rooted in Trust', de: 'Ein Versprechen aus Vertrauen', te: 'నమ్మకంతో కూడిన వాగ్దానం', hi: 'విశ్వాస్ మేం నిహిత్ ఏక్ వాదా' },
      'about.desc': { 'en-us': 'We understand the long days by the pond and the weight of your dedication. At Confier, our products are crafted with more than science—they are built with respect for exactly what you do.', de: 'Wir verstehen Ihre Hingabe.', te: 'చెరువు దగ్గర గడిపే సుదీర్ఘ దినాలు మరియు మీ అంకితభావం మాకు తెలుసు.', hi: 'హమ్ తాలాబ్ కే పాస్ కే లంబే దినోం ఔర్ ఆప్కే సమర్పణ్ కే మహత్వ కో సమఝతే హైం।' },
      'about.pillar1.title': { 'en-us': 'Standing By You', de: 'An Ihrer Seite', te: 'మీకు తోడుగా', hi: 'ఆప్కే సాథ్ ఖడే హైం' },
      'about.pillar1.text': { 'en-us': 'We are more than a supplier; we are your partner in every harvest, ensuring your success is shared.', de: 'Wir sind Ihr Partner.', te: 'మేము కేవలం సరఫరాదారు మాత్రమే కాదు; మీ ప్రతి దిగుబడిలో మీ భాగస్వామిలం.', hi: 'హమ్ కేవల్ ఏక్ ఆపూర్తికర్తా నహీం హైం; హమ్ ఆప్కీ హర్ ఫసల్ మేం ఆప్కే భాగీదార్ హైం।' },
      'about.pillar2.title': { 'en-us': 'Care in Every Formulation', de: 'Sorgfalt in jeder Formel', te: 'ప్రతి ఉత్పత్తిలో జాగ్రత్త', hi: 'హర్ ఫార్మూలేషన్ మేం దేఖభాల్' },
      'about.pillar2.text': { 'en-us': 'Our formulations are driven by empathy. We create supplements that protect your aquatic life like they were our own.', de: 'Mit Empathie entwickelt.', te: 'మా ఉత్పత్తులు సానుభూతితో రూపొందించబడ్డాయి. మేము మీ జలచరాలను సొంతంలా చూసుకుంటాము.', hi: 'హమారే ఫార్మూలేషన్ సహానుభూతి ద్వారా సంచాలిత్ హోతే హైం।' },
      'about.pillar3.title': { 'en-us': 'Our Word is Our Bond', de: 'Unser Wort gilt', te: 'మా మాట - మా నమ్మకం', hi: 'హమారా वादा హమారీ పహచాన్ హై' },
      'about.pillar3.text': { 'en-us': 'Transparency, ethics, and a shared vision for a better future for every shrimp farming family.', de: 'Transparenz und Ethik.', te: 'ప్రతి రొయ్యల పెంపకందారుడి కుటుంబానికి మెరుగైన భవిష్యత్తు కోసం పారదర్శకత మరియు నైతికత.', hi: 'హర్ ఝీంగా పాలన్ కరనే వాలే పరివార్ కే లియే ఏక్ బెహతర్ భవిష్య।' },
      
      // Products
      'prod.tag': { 'en-us': 'Our Range', 'en-uk': 'Our Range', de: 'Unsere Auswahl', te: 'మా ఉత్పత్తులు', pa: 'ਸਾਡੇ ਉਤਪਾਦ', mr: 'आमची उत्पादने', hi: 'हमारे उत्पाद', ta: 'எங்கள் தயாரிப்புகள்' },
      'prod.title': { 'en-us': 'Premium Feed Supplements', 'en-uk': 'Premium Feed Supplements', de: 'Premium Futterergänzungsmittel', te: 'ప్రీమియం ఫీడ్ సప్లిమెంట్స్', pa: 'ਪ੍ਰੀਮੀਅਮ ਫੀਡ ਸਪਲੀਮੈਂਟਸ', hi: 'प्रीमियम फीड सप्लीमेंट्स' },
      'prod.desc': { 'en-us': 'Scientific formulations designed to enhance growth, survival, and pond health.', de: 'Wissenschaftliche Formeln für besseres Wachstum.', te: 'పెరుగుదల మరియు చెరువు ఆరోగ్యాన్ని మెరుగుపరచడానికి రూపొందించిన శాస్త్రీయ ఉత్పత్తులు.', hi: 'विकास और तालाब के स्वास्थ्य को बढ़ाने के लिए वैज्ञानिक फॉर्मूलेशन।' },
      'prod.details': { 'en-us': 'View Details', de: 'Details Anzeigen', te: 'వివరాలు చూడండి', hi: 'विवरण देखें' },
      'prod.interact': { 'en-us': 'Tap to Interact 3D', de: '3D Interaktion', te: '3D తో ముచ్చటించండి', hi: '3D के साथ जुड़ें' },
      
      // R&D
      'rnd.tag': { 'en-us': 'Innovation Lab', 'en-uk': 'Innovation Lab', de: 'Innovationslabor', te: 'ఆవిష్కరణ ప్రయోగశాల', hi: 'नवाचार लैब' },
      'rnd.title': { 'en-us': 'Research & Development', 'en-uk': 'Research & Development', de: 'Forschung & Entwicklung', te: 'పరిశోధన & అభివృద్ధి', hi: 'अनुसंधान और विकास' },
      'rnd.desc': { 'en-us': 'Driving healthier growth and sustainable farming through advanced biotechnology.', de: 'Nachhaltige Landwirtschaft durch Biotechnologie.', te: 'అధునాతన బయోటెక్నాలజీ ద్వారా ఆరోగ్యకరమైన పెరుగుదల మరియు స్థిరమైన వ్యవసాయం.', hi: 'उन्नत जैव प्रौद्योगिकी के माध्यम से स्वस्थ विकास और टिकाऊ खेती।' },
      
      // Contact
      'contact.title': { 'en-us': "We're Here to Help", 'en-uk': "We're Here to Help", de: 'Wir Sind Hier, Um Zu Helfen', te: 'మేము సహాయం చేయడానికి ఉన్నాము', hi: 'हम सहायता के लिए यहाँ हैं' },
      'contact.btn': { 'en-us': 'Send Message', 'en-uk': 'Send Message', de: 'Nachricht Senden', te: 'సందేశం పంపండి', pa: 'ਸੁਨੇਹਾ ਭੇਜੋ', hi: 'संदेश भेजें' },
    };
    return dict[key]?.[lang] || dict[key]?.['en-us'] || key;
  };

  const eventsTag = { 'en-us': 'The Newsroom', de: 'Nachrichten', te: 'వార్తలు', hi: 'समाचार कक्ष' };
  
  // Patch the dictionary logic to include events.tag
  const originalT = t;
  const tWithEvents = (key) => {
    if (key === 'events.tag') return eventsTag[lang] || eventsTag['en-us'];
    return originalT(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tWithEvents }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
