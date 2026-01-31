
import React, { useState, useRef, useEffect } from 'react';
import { generateDiagnosisStream } from './services/geminiService';
import { LANGUAGES, APPLIANCES, UI_STRINGS } from './constants';
import { Language, Message, User, StoredAccount } from './types';

// Icons
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.17a2 2 0 0 1 1-1.74l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
);
const BackIcon = ({ dir }: { dir: 'ltr' | 'rtl' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dir === 'rtl' ? 'rotate-180' : ''}><path d="m15 18-6-6 6-6"/></svg>
);

const ApplianceIcon = ({ id, className }: { id: string, className?: string }) => {
  switch (id) {
    case 'smartphone':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
    case 'tv':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
    case 'laptop':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="2" y1="18" x2="22" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/></svg>;
    case 'washing_machine':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 10a2 2 0 0 0-2 2"/></svg>;
    case 'fridge':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="5" x2="9" y2="8"/><line x1="9" y1="13" x2="9" y2="17"/></svg>;
    case 'ac':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="8" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M7 14v2"/><path d="M12 14v2"/><path d="M17 14v2"/></svg>;
    case 'airfryer':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M4 11h16"/><circle cx="12" cy="7" r="2"/></svg>;
    case 'oven':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="18" rx="2"/><rect x="7" y="7" width="10" height="8" rx="1"/><circle cx="8" cy="18" r="0.5"/><circle cx="12" cy="18" r="0.5"/><circle cx="16" cy="18" r="0.5"/></svg>;
    default:
      return <span>🔧</span>;
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'auth' | 'main'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Form fields
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('fixpro_user');
    const savedTheme = localStorage.getItem('fixpro_theme') as 'light' | 'dark' || 'light';
    const savedLang = localStorage.getItem('fixpro_lang') as Language || 'ar';
    
    setTheme(savedTheme);
    setLang(savedLang);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('main');
    }

    // Check for shared conversation in URL
    const params = new URLSearchParams(window.location.search);
    const sharedChat = params.get('share');
    if (sharedChat) {
      try {
        const jsonStr = decodeURIComponent(escape(atob(sharedChat)));
        const sharedMessages = JSON.parse(jsonStr).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(sharedMessages);
        setView('main');
        // Clean URL without reloading
        window.history.replaceState({}, '', window.location.pathname);
      } catch (err) {
        console.error("Failed to parse shared chat", err);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('fixpro_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fixpro_lang', lang);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    const accounts: StoredAccount[] = JSON.parse(localStorage.getItem('fixpro_accounts') || '[]');

    if (authMode === 'signup') {
      if (accounts.some(acc => acc.email === authEmail)) {
        setAuthError(UI_STRINGS[lang].signupError);
        return;
      }
      const newAccount: StoredAccount = {
        name: authName,
        email: authEmail,
        passwordHash: authPassword,
      };
      accounts.push(newAccount);
      localStorage.setItem('fixpro_accounts', JSON.stringify(accounts));
      
      const newUser = { name: authName, email: authEmail, isLoggedIn: true };
      setUser(newUser);
      localStorage.setItem('fixpro_user', JSON.stringify(newUser));
      setView('main');
    } else {
      const account = accounts.find(acc => acc.email === authEmail && acc.passwordHash === authPassword);
      if (account) {
        const newUser = { name: account.name, email: account.email, isLoggedIn: true };
        setUser(newUser);
        localStorage.setItem('fixpro_user', JSON.stringify(newUser));
        setView('main');
      } else {
        setAuthError(UI_STRINGS[lang].loginError);
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fixpro_user');
    setMessages([]);
    setView('landing');
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;
    
    const userMessage: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: input, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    const currentImage = selectedImage;
    
    setInput(''); 
    setSelectedImage(null); 
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessagePlaceholder: Message = { 
      id: aiMessageId, 
      role: 'model', 
      content: '', 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      await generateDiagnosisStream(
        currentInput, 
        history, 
        (chunk) => {
          setIsLoading(false);
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, content: msg.content + chunk } 
              : msg
          ));
        },
        currentImage || undefined
      );
      
    } catch (error: any) {
      setIsLoading(false);
      let errorMessage = UI_STRINGS[lang].errorGeneral;
      if (error.message === 'QUOTA_EXCEEDED') {
        errorMessage = UI_STRINGS[lang].errorQuota;
      }
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, content: errorMessage } 
          : msg
      ));
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleShareApp = async () => {
    const url = window.location.origin;
    const shareData = {
      title: 'FixPro - AI Maintenance Expert',
      text: UI_STRINGS[lang].tagline,
      url: url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(url);
        alert(UI_STRINGS[lang].linkCopied);
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  const handleShareChat = async () => {
    if (messages.length === 0) return;
    try {
      // Simple serialization of the chat history
      const dataToShare = JSON.stringify(messages);
      // Encode unicode string to base64 safely
      const encoded = btoa(unescape(encodeURIComponent(dataToShare)));
      const url = `${window.location.origin}?share=${encoded}`;
      
      // Safety check for URL length (browsers usually support ~2000 chars, some more)
      // If it's too long, we might just share the text.
      if (url.length > 8000) {
        // Fallback: Share just text content
        const textContent = messages.map(m => `${m.role === 'user' ? 'User' : 'FixPro'}: ${m.content}`).join('\n\n');
        if (navigator.share) {
           await navigator.share({
             title: 'FixPro Diagnosis',
             text: textContent.substring(0, 10000) // Truncate if massive
           });
        } else {
           navigator.clipboard.writeText(textContent);
           alert(UI_STRINGS[lang].linkCopied);
        }
        return;
      }

      const shareData = {
        title: 'FixPro Diagnosis',
        text: 'Check out this repair advice from FixPro!',
        url: url,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        alert(UI_STRINGS[lang].linkCopied);
      }
    } catch (e) {
      console.error("Share chat failed", e);
    }
  };

  const dir = LANGUAGES[lang].dir;

  const formatContent = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>');
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return <li key={i} className="ml-4 mb-1 list-disc" dangerouslySetInnerHTML={{ __html: formatted.substring(2) }} />;
      }
      if (formatted.includes('⚠️')) {
        return <p key={i} className="my-2 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg font-bold" dangerouslySetInnerHTML={{ __html: formatted }} />;
      }
      return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  if (view === 'landing') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${theme === 'dark' ? 'from-slate-950 via-slate-900 to-blue-950 text-white' : 'from-blue-50 via-white to-indigo-50 text-slate-900'} overflow-hidden transition-all duration-700`} dir={dir}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative text-center space-y-8 max-w-xl animate-in fade-in zoom-in duration-1000">
          <div className="mx-auto w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/30 transform hover:rotate-6 transition-transform cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">FixPro</h1>
            <p className="text-2xl opacity-80 font-semibold tracking-tight leading-tight">{UI_STRINGS[lang].tagline}</p>
          </div>
          <button 
            onClick={() => setView('auth')}
            className="w-full py-5 px-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold rounded-3xl shadow-2xl shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
          >
            {UI_STRINGS[lang].getStarted}
            <svg className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-all duration-300 font-sans selection:bg-blue-500/30`} dir={dir}>
      
      {/* Enhanced Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowSettings(false)}>
          <div className={`${theme === 'dark' ? 'bg-slate-900 border-slate-700 shadow-blue-500/10' : 'bg-white border-slate-200 shadow-slate-200/50'} w-full max-w-sm rounded-[2.5rem] p-10 shadow-3xl border-2 animate-in slide-in-from-bottom-12 duration-500`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white p-2 rounded-xl"><SettingsIcon /></div>
                <h3 className="text-3xl font-black tracking-tighter">{UI_STRINGS[lang].settings}</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'} text-2xl`}>&times;</button>
            </div>
            
            <div className="space-y-10">
              <section className="space-y-5">
                <label className={`text-xs font-black uppercase tracking-[0.25em] ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {UI_STRINGS[lang].appearance}
                </label>
                <div className={`flex gap-3 p-2 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <button onClick={() => setTheme('light')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all ${theme === 'light' ? 'bg-white shadow-xl text-blue-600 scale-[1.05] ring-2 ring-blue-500/20' : 'text-slate-500 hover:opacity-80'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                    {UI_STRINGS[lang].lightMode}
                  </button>
                  <button onClick={() => setTheme('dark')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all ${theme === 'dark' ? 'bg-slate-700 shadow-xl text-blue-400 scale-[1.05] ring-2 ring-blue-500/20' : 'text-slate-500 hover:opacity-80'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    {UI_STRINGS[lang].darkMode}
                  </button>
                </div>
              </section>

              <section className="space-y-5">
                <label className={`text-xs font-black uppercase tracking-[0.25em] ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {UI_STRINGS[lang].language}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(Object.keys(LANGUAGES) as Language[]).map((l) => (
                    <button key={l} onClick={() => setLang(l)} className={`py-5 px-4 rounded-2xl border-2 font-black text-sm transition-all ${lang === l ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 scale-[1.02]' : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                      {LANGUAGES[l].label}
                    </button>
                  ))}
                </div>
              </section>

              <button 
                onClick={handleShareApp}
                className={`w-full py-5 flex items-center justify-center gap-3 rounded-2xl border-2 transition-all font-black text-lg ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white hover:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-500 shadow-sm'}`}
              >
                <ShareIcon /> {UI_STRINGS[lang].shareApp}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Auth Screen (Login/Signup) */}
      {view === 'auth' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl">
          <div className={`${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white'} w-full max-w-md rounded-[3rem] p-10 shadow-3xl border animate-in zoom-in-95 duration-500`}>
            <div className="flex justify-center mb-8 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${authMode === 'login' ? 'bg-white dark:bg-slate-700 shadow-xl text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}>
                {UI_STRINGS[lang].login}
              </button>
              <button onClick={() => setAuthMode('signup')} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${authMode === 'signup' ? 'bg-white dark:bg-slate-700 shadow-xl text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}>
                {UI_STRINGS[lang].signup}
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{UI_STRINGS[lang].name}</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 group-focus-within:text-blue-500 transition-all"><UserIcon /></span>
                    <input type="text" value={authName} onChange={e => setAuthName(e.target.value)} required
                      className={`w-full ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border-2 focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 outline-none transition-all font-bold`} />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{UI_STRINGS[lang].email}</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 group-focus-within:text-blue-500 transition-all"><MailIcon /></span>
                  <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required
                    className={`w-full ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border-2 focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 outline-none transition-all font-bold`} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{UI_STRINGS[lang].password}</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 group-focus-within:text-blue-500 transition-all"><LockIcon /></span>
                  <input type={showPassword ? "text" : "password"} value={authPassword} onChange={e => setAuthPassword(e.target.value)} required
                    className={`w-full ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border-2 focus:border-blue-500 rounded-2xl pl-14 pr-14 py-4 outline-none transition-all font-bold`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 hover:text-blue-500 transition-all focus:outline-none">
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
              </div>

              {authError && <p className="text-red-500 text-xs font-black px-1 animate-pulse">{authError}</p>}

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-95 text-lg mt-4">
                {authMode === 'login' ? UI_STRINGS[lang].startAction : UI_STRINGS[lang].createAction}
              </button>

              <p className="text-center text-xs font-bold opacity-40 mt-4">
                {authMode === 'login' ? UI_STRINGS[lang].noAccount : UI_STRINGS[lang].hasAccount}
                <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="ml-2 text-blue-500 hover:underline">
                  {authMode === 'login' ? UI_STRINGS[lang].signup : UI_STRINGS[lang].login}
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* App Content */}
      {view === 'main' && (
        <>
          <header className={`sticky top-0 z-[100] backdrop-blur-lg border-b ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'} px-6 py-4 transition-all duration-300`}>
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                {messages.length > 0 && (
                  <button onClick={() => setMessages([])} className="p-3 hover:bg-blue-500/10 hover:text-blue-500 rounded-2xl transition-all">
                    <BackIcon dir={dir} />
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  </div>
                  <h1 className="text-2xl font-black tracking-tighter">FixPro</h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {messages.length > 0 && (
                  <button onClick={handleShareChat} className={`hidden md:flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                    <ShareIcon />
                    <span>{UI_STRINGS[lang].shareDiagnosis}</span>
                  </button>
                )}
                <button onClick={() => setShowSettings(true)} className={`p-3 rounded-2xl transition-all ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-blue-600'}`}>
                  <SettingsIcon />
                </button>
                {user && (
                  <div className={`flex items-center gap-3 pl-4 border-l ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} rtl:border-l-0 rtl:border-r rtl:pr-4`}>
                    <div className="hidden sm:flex flex-col items-end rtl:items-start leading-tight">
                      <span className="text-sm font-black">{user.name}</span>
                      <button onClick={handleLogout} className="text-[10px] text-red-500 font-bold hover:underline opacity-80 uppercase tracking-tighter">{UI_STRINGS[lang].logout}</button>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-xl overflow-hidden">
                      <UserIcon />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 relative">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
                    {user ? UI_STRINGS[lang].welcomeUser.replace('{name}', user.name) : UI_STRINGS[lang].welcome}
                  </h2>
                  <p className="text-lg opacity-40 max-w-lg mx-auto font-bold tracking-tight">{UI_STRINGS[lang].tagline}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl">
                  {APPLIANCES.map((app) => (
                    <button 
                      key={app.id} 
                      onClick={() => setInput(app.name[lang] + " " + (lang === 'ar' ? 'بها عطل' : 'needs repair'))} 
                      className={`${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/50 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-400'} border-2 p-8 rounded-[2.5rem] transition-all group flex flex-col items-center gap-4 hover:shadow-3xl hover:shadow-blue-500/10 active:scale-95 backdrop-blur-sm`}
                    >
                      <ApplianceIcon id={app.id} className="w-16 h-16 group-hover:scale-125 transition-transform duration-500 group-hover:text-blue-500" />
                      <span className="text-sm font-black tracking-tight uppercase opacity-60 group-hover:opacity-100">{app.name[lang]}</span>
                    </button>
                  ))}
                </div>

                <div className={`p-6 rounded-3xl text-sm font-bold ${theme === 'dark' ? 'bg-amber-500/5 text-amber-200 border border-amber-500/20' : 'bg-amber-50 text-amber-900 border border-amber-100'} max-w-xl flex gap-4 text-start leading-relaxed shadow-lg`}>
                   <span className="text-2xl mt-1">⚠️</span>
                   <p className="opacity-90 italic">{UI_STRINGS[lang].safetyNotice}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 pb-48">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex items-start gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-8 duration-500`}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl ${msg.role === 'user' ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white' : 'bg-slate-800 text-slate-400 font-black text-xs'}`}>
                      {msg.role === 'user' ? <UserIcon /> : "AI"}
                    </div>
                    <div className={`group relative max-w-[85%] rounded-[2.5rem] p-8 shadow-2xl border transition-all ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-tr-none border-transparent' 
                        : (theme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800') + ' rounded-tl-none backdrop-blur-lg'
                    }`}>
                      {/* Message specific share button */}
                      {msg.role === 'model' && msg.content !== '' && (
                         <button 
                           onClick={() => {
                             navigator.clipboard.writeText(msg.content);
                             alert(UI_STRINGS[lang].linkCopied || "Copied!");
                           }}
                           className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-blue-500"
                           title="Copy Text"
                         >
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                         </button>
                      )}
                      
                      <div className="whitespace-pre-wrap leading-relaxed text-base md:text-lg">
                        {msg.content === '' ? (
                          <div className="flex gap-2 py-2">
                             <div className="w-2 h-2 bg-blue-500/40 rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-blue-500/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                             <div className="w-2 h-2 bg-blue-500/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          </div>
                        ) : formatContent(msg.content)}
                      </div>
                      <div className={`text-[10px] mt-4 font-black tracking-widest uppercase opacity-40 ${msg.role === 'user' ? 'text-white/70' : ''}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-4 items-center px-10 animate-pulse">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-sm font-black text-blue-500/60 uppercase tracking-widest">{UI_STRINGS[lang].analyzing}</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </main>

          <footer className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-[100] transition-all duration-500`}>
            <div className={`p-4 rounded-[3rem] shadow-3xl backdrop-blur-2xl border-2 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800/50' : 'bg-white/80 border-white/50 shadow-blue-500/10'} transition-all`}>
              <div className="space-y-4">
                {selectedImage && (
                  <div className="flex items-center gap-4 p-3 bg-blue-500/10 dark:bg-blue-900/20 rounded-[2rem] border border-blue-500/20 animate-in slide-in-from-bottom-4 w-fit">
                    <div className="relative group">
                      <img src={selectedImage} alt="Analysis Target" className="h-16 w-16 object-cover rounded-2xl shadow-xl transition-transform group-hover:scale-110" />
                      <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg shadow-2xl hover:bg-red-600 transition-all font-bold">&times;</button>
                    </div>
                    <div className="pr-6 rtl:pr-0 rtl:pl-6">
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400 block uppercase tracking-tighter">{UI_STRINGS[lang].uploadImage}</span>
                      <span className="text-[10px] font-bold opacity-50">Ready for scan</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 px-2">
                    <button onClick={() => cameraInputRef.current?.click()} className={`p-4 rounded-[1.5rem] transition-all ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-blue-50 text-slate-500 hover:text-blue-600'}`} title={UI_STRINGS[lang].openCamera}>
                      <CameraIcon />
                    </button>
                    <button onClick={() => galleryInputRef.current?.click()} className={`p-4 rounded-[1.5rem] transition-all ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-blue-50 text-slate-500 hover:text-blue-600'}`} title={UI_STRINGS[lang].uploadFile}>
                      <FileIcon />
                    </button>
                  </div>

                  <input type="file" ref={cameraInputRef} onChange={handleFileChange} accept="image/*" capture="environment" className="hidden" />
                  <input type="file" ref={galleryInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  
                  <div className="flex-1 relative">
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder={UI_STRINGS[lang].placeholder} rows={1} className={`w-full ${theme === 'dark' ? 'bg-slate-800/50 text-white placeholder-slate-600' : 'bg-slate-100 text-slate-900 placeholder-slate-400'} border-2 border-transparent focus:border-blue-500 rounded-[2rem] px-6 py-4 resize-none max-h-40 outline-none font-bold text-base transition-all shadow-inner`} />
                  </div>
                  
                  <button onClick={handleSend} disabled={isLoading || (!input.trim() && !selectedImage)} className={`p-5 rounded-[2rem] transition-all ${ isLoading || (!input.trim() && !selectedImage) ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/40 hover:scale-[1.05] active:scale-90' }`} >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
