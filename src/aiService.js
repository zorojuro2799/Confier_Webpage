import { products } from './components/Products.jsx';

const productMap = new Map(products.map((product) => [product.id, product]));

const productKnowledge = products.map((product) => ({
  ...product,
  searchText: [
    product.name,
    product.subtitle,
    product.tagline,
    product.composition,
    ...(product.benefits || []),
    product.usage?.dosage || '',
  ].join(' ').toLowerCase()
}));

const issueProfiles = [
  {
    id: 'white_feces',
    keywords: ['white feces', 'white faeces', 'white gut', 'gut issue', 'gut problem', 'తెల్ల మలం', 'सफेद मल'],
    productIds: [1, 11, 2],
    reasons: {
      en: 'This looks like a gut-health and hepatopancreas support issue.',
      te: 'ఇది గట్ ఆరోగ్యం మరియు హెపటోపాంక్రియాస్ సహాయానికి సంబంధించిన సమస్యలా ఉంది.',
      hi: 'यह आंत स्वास्थ्य और हेपाटोपैंक्रियास सपोर्ट से जुड़ी समस्या लगती है।'
    }
  },
  {
    id: 'ammonia',
    keywords: ['ammonia', 'nitrite', 'toxic gas', 'gas problem', 'అమ్మోనియా', 'अमोनिया'],
    productIds: [9, 6, 10],
    reasons: {
      en: 'This sounds like ammonia / toxic gas stress in the pond.',
      te: 'ఇది చెరువులో అమ్మోనియా / విష గ్యాస్ ఒత్తిడి సమస్యలా ఉంది.',
      hi: 'यह तालाब में अमोनिया / जहरीली गैस तनाव की समस्या लगती है।'
    }
  },
  {
    id: 'oxygen',
    keywords: ['oxygen', 'low do', 'dissolved oxygen', 'shrimp at surface', 'ఆక్సిజన్', 'ऑक्सीजन'],
    productIds: [10, 6, 4],
    reasons: {
      en: 'This points to low dissolved oxygen and organic load stress.',
      te: 'ఇది తక్కువ ద్రవీభవించిన ఆక్సిజన్ మరియు ఆర్గానిక్ లోడ్ ఒత్తిడిని సూచిస్తోంది.',
      hi: 'यह कम घुलित ऑक्सीजन और ऑर्गेनिक लोड तनाव की ओर इशारा करता है।'
    }
  },
  {
    id: 'sludge',
    keywords: ['sludge', 'bottom', 'black soil', 'bad smell', 'pond bottom', 'బురద', 'कीचड़'],
    productIds: [6, 4, 7],
    reasons: {
      en: 'This looks like a pond-bottom and sludge-management issue.',
      te: 'ఇది చెరువు అడుగు భాగం మరియు బురద నిర్వహణ సమస్యలా ఉంది.',
      hi: 'यह तालाब के तल और कीचड़ प्रबंधन की समस्या लगती है।'
    }
  },
  {
    id: 'growth',
    keywords: ['growth', 'slow growth', 'yield', 'fcr', 'feed conversion', 'పెరుగుదల', 'विकास'],
    productIds: [5, 3, 11],
    reasons: {
      en: 'This is mainly a growth, mineral, and feed-performance issue.',
      te: 'ఇది ప్రధానంగా పెరుగుదల, ఖనిజాలు, మరియు ఫీడ్ పనితీరు సమస్య.',
      hi: 'यह मुख्य रूप से विकास, खनिज और फीड प्रदर्शन की समस्या है।'
    }
  },
  {
    id: 'moulting',
    keywords: ['moult', 'molt', 'soft shell', 'hard shell', 'cramp', 'మోల్టింగ్', 'నరమ గుడ్డు', 'मोल्ट', 'नरम खोल'],
    productIds: [5, 3, 8],
    reasons: {
      en: 'This looks related to moulting, mineral balance, and shell formation.',
      te: 'ఇది మోల్టింగ్, ఖనిజ సమతుల్యం, మరియు షెల్ ఏర్పాటుకు సంబంధించినది.',
      hi: 'यह मोल्टिंग, मिनरल बैलेंस और शेल फॉर्मेशन से जुड़ा मामला है।'
    }
  },
  {
    id: 'hepatopancreas',
    keywords: ['hepatopancreas', 'liver', 'hp issue', 'లివర్', 'हेपाटोपैंक्रियास', 'लिवर'],
    productIds: [2, 1, 11],
    reasons: {
      en: 'This sounds like hepatopancreas / liver support is needed.',
      te: 'ఇక్కడ హెపటోపాంక్రియాస్ / లివర్‌కు సపోర్ట్ అవసరమైందని అనిపిస్తోంది.',
      hi: 'यहाँ हेपाटोपैंक्रियास / लिवर सपोर्ट की ज़रूरत लग रही है।'
    }
  },
  {
    id: 'water_quality',
    keywords: ['water quality', 'ph', 'salinity', 'water issue', 'pond water', 'నీటి నాణ్యత', 'जल गुणवत्ता'],
    productIds: [4, 7, 10],
    reasons: {
      en: 'This looks like a pond-water quality management issue.',
      te: 'ఇది చెరువు నీటి నాణ్యత నిర్వహణ సమస్యలా ఉంది.',
      hi: 'यह तालाब के पानी की गुणवत्ता प्रबंधन की समस्या लगती है।'
    }
  }
];

const uiText = {
  en: {
    askMore: 'Please share the exact pond or shrimp issue. I can help with ammonia, sludge, oxygen, gut health, moulting, water quality, growth, and dosage questions, and I will recommend only Confier products.',
    recommendLead: 'Based on your issue, these Confier products fit best:',
    usageLead: 'For product usage, always follow the dosage shown in the product details on this website. If you tell me the product name, I can explain where it is used and why.',
    onlyConfier: 'I only recommend products listed on this website.',
  },
  te: {
    askMore: 'దయచేసి మీ చెరువు లేదా శ్రిమ్ప్ సమస్యను స్పష్టంగా చెప్పండి. నేను అమ్మోనియా, బురద, ఆక్సిజన్, గట్ ఆరోగ్యం, మోల్టింగ్, నీటి నాణ్యత, పెరుగుదల మరియు డోసేజ్ గురించి సహాయం చేస్తాను. నేను కాన్‌ఫియర్ ఉత్పత్తులనే మాత్రమే సూచిస్తాను.',
    recommendLead: 'మీ సమస్యకు ఈ కాన్‌ఫియర్ ఉత్పత్తులు సరిపోతాయి:',
    usageLead: 'ఉత్పత్తి వాడకం కోసం ఈ వెబ్‌సైట్‌లో ఉన్న డోసేజ్‌ను అనుసరించండి. ఉత్పత్తి పేరు చెబితే ఎక్కడ, ఎందుకు వాడాలో నేను వివరంగా చెబుతాను.',
    onlyConfier: 'నేను ఈ వెబ్‌సైట్‌లో ఉన్న కాన్‌ఫియర్ ఉత్పత్తులనే సూచిస్తాను.',
  },
  hi: {
    askMore: 'कृपया अपनी तालाब या झींगा समस्या स्पष्ट बताइए। मैं अमोनिया, कीचड़, ऑक्सीजन, गट हेल्थ, मोल्टिंग, पानी की गुणवत्ता, विकास और डोज़ेज़ से जुड़े सवालों में मदद कर सकता हूँ। मैं केवल कॉनफियर उत्पाद ही सुझाता हूँ।',
    recommendLead: 'आपकी समस्या के लिए ये कॉनफियर उत्पाद सबसे उपयुक्त हैं:',
    usageLead: 'उत्पाद उपयोग के लिए इस वेबसाइट पर दिए गए डोज़ेज़ का पालन करें। अगर आप उत्पाद का नाम बताएँगे तो मैं कहाँ और क्यों उपयोग करना है यह समझाऊँगा।',
    onlyConfier: 'मैं केवल इस वेबसाइट पर सूचीबद्ध कॉनफियर उत्पाद सुझाता हूँ।',
  }
};

const detectRelevantProducts = (message) => {
  const query = message.toLowerCase();
  const profileScores = issueProfiles.map((profile) => ({
    profile,
    score: profile.keywords.reduce((sum, keyword) => sum + (query.includes(keyword) ? 1 : 0), 0)
  }));

  const matchedProfiles = profileScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matchedProfiles.length > 0) {
    const mergedIds = [...new Set(matchedProfiles.flatMap((item) => item.profile.productIds))].slice(0, 3);
    return {
      products: mergedIds.map((id) => productMap.get(id)).filter(Boolean),
      reason: matchedProfiles[0].profile.reasons
    };
  }

  const scored = productKnowledge.map((product) => {
    let score = 0;
    const tokens = query.split(/\s+/).filter(Boolean);
    tokens.forEach((token) => {
      if (token.length > 2 && product.searchText.includes(token)) score += 1;
    });
    if (query.includes(product.name.toLowerCase())) score += 10;
    return { product, score };
  });

  const topProducts = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.product);

  return { products: topProducts, reason: null };
};

const buildResponseText = (userMessage, productsForIssue, reason, language) => {
  const ui = uiText[language] || uiText.en;
  const normalized = userMessage.toLowerCase();

  if (normalized.includes('dose') || normalized.includes('dosage') || normalized.includes('usage') || normalized.includes('how to use')) {
    return `${ui.usageLead}\n\n${ui.onlyConfier}`;
  }

  if (!productsForIssue.length) {
    return ui.askMore;
  }

  const first = productsForIssue[0];
  const second = productsForIssue[1];

  if (language === 'te') {
    return `${reason?.te || ui.recommendLead}\n\nమొదటి సిఫారసు: ${first.name} - ${first.subtitle}.\n${second ? `తర్వాత పరిశీలించవచ్చు: ${second.name} - ${second.subtitle}.\n` : ''}\nమీ లక్షణాలు, నీటి పరిస్థితి, లేదా శ్రిమ్ప్ ప్రవర్తన గురించి ఇంకొంచెం చెబితే నేను ఇంకా ఖచ్చితంగా చెప్పగలను.\n\n${ui.onlyConfier}`;
  }

  if (language === 'hi') {
    return `${reason?.hi || ui.recommendLead}\n\nपहली सिफारिश: ${first.name} - ${first.subtitle}.\n${second ? `इसके बाद विचार करें: ${second.name} - ${second.subtitle}.\n` : ''}\nअगर आप लक्षण, पानी की स्थिति, या झींगा व्यवहार के बारे में थोड़ा और बताएँगे तो मैं और सटीक सुझाव दे सकता हूँ।\n\n${ui.onlyConfier}`;
  }

  return `${reason?.en || ui.recommendLead}\n\nFirst recommendation: ${first.name} - ${first.subtitle}.\n${second ? `You can also consider ${second.name} - ${second.subtitle}.\n` : ''}\nIf you share more symptoms, pond condition, or shrimp behavior, I can narrow it down further.\n\n${ui.onlyConfier}`;
};

export const createProductKnowledgeBase = () => productKnowledge;

export const getAIResponse = async (userMessage, language = 'en') => {
  const { products: recommendedProducts, reason } = detectRelevantProducts(userMessage);
  const text = buildResponseText(userMessage, recommendedProducts, reason, language);

  return {
    text,
    products: recommendedProducts,
    confidence: recommendedProducts.length > 0 ? 'high' : 'medium'
  };
};

export default {
  getAIResponse,
  createProductKnowledgeBase
};
