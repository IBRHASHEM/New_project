import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Currency, Property, User, InquiryForm } from '../types';
import { MOCK_PROPERTIES, USD_TO_EGP_RATE } from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

type ModalType = 'viewing' | 'brochure' | 'list-property' | 'login' | 'register' | 'callback' | null;

interface ModalPayload {
  propertyId?: string;
  projectId?: string;
  agentId?: string;
  title?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  compareList: string[];
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;
  user: User | null;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  activeModal: ModalType;
  modalPayload: ModalPayload;
  openModal: (type: ModalType, payload?: ModalPayload) => void;
  closeModal: () => void;
  formatPrice: (priceEgp: number) => string;
  submitInquiry: (form: InquiryForm) => Promise<boolean>;
  properties: Property[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_FAVS_KEY = 'prime_estate_favs';
const LOCAL_STORAGE_COMPARE_KEY = 'prime_estate_compare';
const LOCAL_STORAGE_LANG_KEY = 'prime_estate_lang';
const LOCAL_STORAGE_CURR_KEY = 'prime_estate_curr';
const LOCAL_STORAGE_USER_KEY = 'prime_estate_user';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_LANG_KEY) as Language) || 'en';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_CURR_KEY) as Currency) || 'EGP';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVS_KEY);
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalPayload, setModalPayload] = useState<ModalPayload>({});

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CURR_KEY, currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      
      const prop = MOCK_PROPERTIES.find(p => p.id === propertyId);
      const title = language === 'ar' ? prop?.titleAr : prop?.titleEn;
      
      if (exists) {
        showToast(language === 'ar' ? `تمت إزالة "${title || 'العقار'}" من المفضلة` : `Removed "${title || 'Property'}" from favorites`, 'info');
      } else {
        showToast(language === 'ar' ? `تمت إضافة "${title || 'العقار'}" إلى المفضلة` : `Added "${title || 'Property'}" to favorites`, 'success');
      }
      return updated;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const addToCompare = (propertyId: string) => {
    if (compareList.includes(propertyId)) {
      showToast(language === 'ar' ? 'هذا العقار موجود بالفعل في قائمة المقارنة' : 'Property is already in compare list', 'info');
      return;
    }
    if (compareList.length >= 4) {
      showToast(language === 'ar' ? 'يمكنك مقارنة 4 عقارات كحد أقصى' : 'You can compare up to 4 properties at a time', 'error');
      return;
    }
    setCompareList((prev) => [...prev, propertyId]);
    showToast(language === 'ar' ? 'تمت إضافة العقار للمقارنة' : 'Added property to compare list', 'success');
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== propertyId));
    showToast(language === 'ar' ? 'تمت الإزالة من المقارنة' : 'Removed from compare list', 'info');
  };

  const isInCompare = (propertyId: string) => compareList.includes(propertyId);

  const clearCompare = () => setCompareList([]);

  const loginUser = (email: string, name: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
    setUser(newUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    showToast(language === 'ar' ? `مرحباً بعودتك، ${name}!` : `Welcome back, ${name}!`, 'success');
    closeModal();
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    showToast(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = (type: ModalType, payload: ModalPayload = {}) => {
    setActiveModal(type);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload({});
  };

  const formatPrice = (priceEgp: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(priceEgp / USD_TO_EGP_RATE);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `${priceEgp.toLocaleString('en-US')} EGP`;
  };

  const submitInquiry = async (form: InquiryForm): Promise<boolean> => {
    console.log('Inquiry submitted:', form);
    await new Promise((resolve) => setTimeout(resolve, 600));
    showToast(
      language === 'ar'
        ? 'تم إرسال طلبك بنجاح! سيتواصل معك أحد مستشارينا في أسرع وقت.'
        : 'Your inquiry has been submitted! Our expert consultant will contact you shortly.',
      'success'
    );
    closeModal();
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        user,
        loginUser,
        logoutUser,
        toasts,
        showToast,
        removeToast,
        activeModal,
        modalPayload,
        openModal,
        closeModal,
        formatPrice,
        submitInquiry,
        properties: MOCK_PROPERTIES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
