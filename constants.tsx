
import { Appliance, Language } from './types';

export const SYSTEM_INSTRUCTION = `
You are FixPro, a world-class senior maintenance engineer and electronics expert.
Your goal: Deliver professional, accurate, and safe diagnostic advice for home appliances and electronics.

RULES:
1. FORMATTING: Use Markdown for clarity (bold headers, bullet points for steps).
2. SAFETY FIRST: If a task involves high voltage, gas, or dangerous components, start with a ⚠️ SAFETY WARNING.
3. STRUCTURE:
   - Possible Cause
   - Safety Precautions
   - Step-by-Step Diagnostic/Repair
   - Tools Needed (if applicable)
   - Professional Referral (when necessary)

MULTILINGUAL: Support Arabic, Amazigh (Tifinagh), French, and English perfectly.
`;

export const LANGUAGES: Record<Language, { label: string, dir: 'ltr' | 'rtl' }> = {
  ar: { label: 'العربية', dir: 'rtl' },
  ber: { label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', dir: 'ltr' },
  fr: { label: 'Français', dir: 'ltr' },
  en: { label: 'English', dir: 'ltr' }
};

export const APPLIANCES: Appliance[] = [
  { id: 'smartphone', name: { ar: 'هاتف ذكي', fr: 'Smartphone', en: 'Smartphone', ber: 'ⵜⴰⵜⵉⵍⵉⴼⵓⵏⵜ' }, icon: '' },
  { id: 'tv', name: { ar: 'تلفاز', fr: 'Smart TV', en: 'Smart TV', ber: 'ⵜⵉⵍⵉⴼⵉⵣⵢⵓⵏ' }, icon: '' },
  { id: 'laptop', name: { ar: 'حاسوب', fr: 'Ordinateur', en: 'Laptop', ber: 'ⴰⵙⵍⴽⵉⵎ' }, icon: '' },
  { id: 'washing_machine', name: { ar: 'غسالة', fr: 'Lave-linge', en: 'Washer', ber: 'ⵜⴰⵎⵛⵓⵜ' }, icon: '' },
  { id: 'fridge', name: { ar: 'ثلاجة', fr: 'Réfrigérateur', en: 'Fridge', ber: 'ⴰⵙⵎⵎⵉⴹ' }, icon: '' },
  { id: 'ac', name: { ar: 'مكيف', fr: 'Climatiseur', en: 'AC Unit', ber: 'ⴰⵎⵉⵙⵉⴷ' }, icon: '' },
  { id: 'airfryer', name: { ar: 'قلاية هوائية', fr: 'Friteuse', en: 'Air Fryer', ber: 'ⵜⴰⴼⵔⴰⵢⵜ' }, icon: '' },
  { id: 'oven', name: { ar: 'فرن', fr: 'Four', en: 'Oven', ber: 'ⴰⴼⴰⵔⵏⵓ' }, icon: '' },
];

export const UI_STRINGS: Record<Language, Record<string, string>> = {
  ar: {
    welcome: 'مركز الصيانة الذكي',
    welcomeUser: 'مرحباً، {name}',
    tagline: 'FixPro: خبيرك التقني في كل زمان ومكان',
    placeholder: 'كيف يمكنني مساعدتك في صيانة جهازك اليوم؟',
    send: 'إرسال',
    safetyNotice: 'إخلاء مسؤولية: اتبع دائماً معايير السلامة المهنية. بعض الأعطال تتطلب فنياً مختصاً.',
    uploadImage: 'تحليل الصورة',
    openCamera: 'الكاميرا',
    uploadFile: 'ملف',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'خروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم الكامل',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    signupError: 'هذا البريد الإلكتروني مستخدم بالفعل',
    startAction: 'دخول',
    createAction: 'إنشاء الحساب',
    getStarted: 'ابدأ الصيانة الآن',
    settings: 'الإعدادات المتقدمة',
    appearance: 'المظهر والسمات',
    lightMode: 'وضع النهار',
    darkMode: 'الوضع الليلي',
    language: 'لغة الواجهة',
    back: 'الرجوع للخلف',
    errorTitle: 'خطأ في النظام',
    errorQuota: 'تم تجاوز الحد المسموح، يرجى المحاولة لاحقاً.',
    errorGeneral: 'تعذر الاتصال بالخادم الذكي.',
    shareApp: 'مشاركة التطبيق',
    shareDiagnosis: 'مشاركة التشخيص',
    linkCopied: 'تم نسخ رابط المحادثة!',
    analyzing: 'جاري التحليل التقني...'
  },
  en: {
    welcome: 'Smart Repair Center',
    welcomeUser: 'Welcome, {name}',
    tagline: 'FixPro: Your Pro Engineer Anywhere',
    placeholder: 'Describe your appliance issue here...',
    send: 'Send',
    safetyNotice: 'Disclaimer: Always follow safety standards. Some repairs require certified pros.',
    uploadImage: 'Analyze Image',
    openCamera: 'Camera',
    uploadFile: 'Upload',
    login: 'Login',
    signup: 'Create Account',
    logout: 'Logout',
    email: 'Email Address',
    password: 'Password',
    name: 'Full Name',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    loginError: 'Invalid email or password',
    signupError: 'Email already exists',
    startAction: 'Sign In',
    createAction: 'Sign Up',
    getStarted: 'Start Repair',
    settings: 'Settings',
    appearance: 'Appearance',
    lightMode: 'Light',
    darkMode: 'Dark',
    language: 'Language',
    back: 'Back',
    errorTitle: 'System Error',
    errorQuota: 'Quota exceeded, please try later.',
    errorGeneral: 'AI Connection failed.',
    shareApp: 'Share App',
    shareDiagnosis: 'Share Diagnosis',
    linkCopied: 'Chat link copied!',
    analyzing: 'Technical analysis in progress...'
  },
  fr: {
    welcome: 'Centre de Réparation',
    welcomeUser: 'Bienvenue, {name}',
    tagline: 'FixPro: Votre Expert Technique Partout',
    placeholder: 'Décrivez votre problème technique...',
    send: 'Envoyer',
    safetyNotice: 'Avis: Respectez les normes de sécurité. Certains cas exigent un pro.',
    uploadImage: 'Analyse Image',
    openCamera: 'Caméra',
    uploadFile: 'Fichier',
    login: 'Connexion',
    signup: 'Créer un compte',
    logout: 'Déconnexion',
    email: 'Adresse Email',
    password: 'Mot de passe',
    name: 'Nom Complet',
    noAccount: "Pas de compte ?",
    hasAccount: 'Déjà un compte ?',
    loginError: 'Email ou mot de passe incorrect',
    signupError: 'Cet email est déjà utilisé',
    startAction: 'Se connecter',
    createAction: "S'inscrire",
    getStarted: 'Commencer',
    settings: 'Paramètres',
    appearance: 'Apparence',
    lightMode: 'Clair',
    darkMode: 'Sombre',
    language: 'Langue',
    back: 'Retour',
    errorTitle: 'Erreur Système',
    errorQuota: 'Quota dépassé, réessayez plus tard.',
    errorGeneral: 'Échec de la connexion IA.',
    shareApp: 'Partager',
    shareDiagnosis: 'Partager le diagnostic',
    linkCopied: 'Lien copié !',
    analyzing: 'Analyse technique en cours...'
  },
  ber: {
    welcome: 'ⴰⵎⵎⴰⵙ ⵏ ⵜⵄⵎⵔⵜ',
    welcomeUser: 'ⴰⵏⵙⵓⴼ, {name}',
    tagline: 'FixPro: ⴰⵎⵙⵏⴰⵡ ⵏⵏⴽ ⴳ ⴽⵓ ⴰⴷⵖⴰⵔ',
    placeholder: 'ⴰⵔⵓ ⵜⴰⵎⵓⴽⵔيسⵜ ⵏⵏⴽ...',
    send: 'ⴰⵣⵏ',
    safetyNotice: 'ⴰⴷⴰⵢⵏ: ⴹⴼⵔ ⵉⵙⴻⴳⴳⴰⴷⵏ ⵏ ⵜⴼⵍⵓⵙⵜ.',
    uploadImage: 'ⴰⵙⵍⵍⴻⵢ ⵏ ⵜⵡⵍⴰⴼⵜ',
    openCamera: 'ⵜⴰⴽⴰⵎⵉⵔⴰ',
    uploadFile: 'ⴰⴼⴰⵢⵍⵓ',
    login: 'ⴽⵛⵎ',
    signup: 'ⴳ ⴰⴽⴰⵡⵏⵜ',
    logout: 'ⴼⴼⵖ',
    email: 'ⵉⵎⵉⵍ',
    password: 'ⵜⴰⴳⵓⵔⵉ ⵏ ⵓⴽⵛⵓⵎ',
    name: 'ⵉⵙⵎ ⴰⵎⴽⵎⵍ',
    noAccount: "ⵓⵔ ⵖⵓⵔⴽ ⴰⴽⴰⵡⵏⵜ ?",
    hasAccount: 'ⵖⵓⵔⴽ ⴰⴽⴰⵡⵏⵜ ?',
    loginError: 'ⵉⵎⵉⵍ ⵏⵖ ⵜⴰⴳⵓⵔⵉ ⵏ ⵓⴽⵛⵓⵎ ⵓⵔ ⴳⵉⵏ ⵉⴳⵉ',
    signupError: 'ⵉⵎⵉⵍ ⴰⴷ ⵉⵜⵜⵓⵙⵎⵔⵙ ⵢⴰⴷ',
    startAction: 'ⴽⵛⵎ',
    createAction: 'ⴳ ⴰⴽⴰⵡⵏⵜ',
    getStarted: 'ⴱⴷⵓ ⵜⴰⵄⵎⵔⵜ',
    settings: 'ⵉⵙⴻⴳⴳⴰⴷⵏ',
    appearance: 'ⴰⵎⵓⵖ',
    lightMode: 'ⴰⵙⵙ',
    darkMode: 'ⵉⴹ',
    language: 'ⵜⵓⵜⵍⴰⵢⵜ',
    back: 'ⵓⵖⴰⵍ',
    errorTitle: 'ⵜⵓⴳⵏⴰ ⵏ ⵓⵏⴳⵔⴰⵡ',
    errorQuota: 'ⵜⵓⴳⵏⴰ ⵏ ⵓⵣⴷⴰⵢ: ⴳⴳⵓⵏ ⴽرا ⵏ ⵜⵉⴽⴽﻠⵜ.',
    errorGeneral: 'ⵜⵓⴳⵏⴰ ⵏ ⵓⵣⴷⴰⵢ ⴷ IA',
    shareApp: 'ⴰⵣⵏ ⵜⴰⵎⵙⵙⵓⴳⵓⵔⵜ',
    shareDiagnosis: 'ⴱⴹⵓ ⴰⵙⴼⵙⵢ',
    linkCopied: 'ⵜⴰⵙⵖⵓⵏⵜ ⵜⴻⵜⵜⵓⴽⵙ!',
    analyzing: 'ⴰⵙⵍⵍⴻⵢ ⴰⵜⵉⴽⵏⵉⴽ...'
  }
};
