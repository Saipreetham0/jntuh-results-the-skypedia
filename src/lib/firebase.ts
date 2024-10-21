// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc,setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Firebase Cloud Messaging
let messaging: Messaging | null = null;

if (typeof window !== 'undefined') {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.error('Failed to initialize Firebase Cloud Messaging:', error);
  }
}

// FCM token management
export async function getFCMToken(): Promise<string | null> {
  if (!messaging) {
    console.warn('Messaging is not initialized');
    return null;
  }

  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
    });

    if (currentToken) {
      return currentToken;
    }

    console.warn('No registration token available');
    return null;
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
}

// Foreground message handler
export type FCMPayload = {
  notification: {
    title: string;
    body: string;
    icon?: string;
  };
  data?: Record<string, string>;
};

export function onFCMMessage(callback: (payload: FCMPayload) => void): () => void {
  if (!messaging) {
    console.warn('Messaging is not initialized');
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    callback(payload as FCMPayload);
  });
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

// Store FCM token in Firestore
export async function storeFCMToken(userId: string, token: string): Promise<void> {
  try {
    const tokenDoc = doc(db, 'users', userId, 'tokens', 'fcm');
    await setDoc(tokenDoc, {
      token,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error storing FCM token:', error);
    throw error;
  }
}

export { app, auth, db, messaging };