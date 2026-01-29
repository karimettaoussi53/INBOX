
export type Language = 'ar' | 'fr' | 'en' | 'ber';

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface StoredAccount {
  name: string;
  email: string;
  passwordHash: string; // In a real app, this would be hashed
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Appliance {
  id: string;
  name: Record<Language, string>;
  icon: string;
}
