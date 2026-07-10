import { FirebaseOptions } from '@angular/fire/app';

const placeholderPattern = /^YOUR_FIREBASE_/;

export function getFirebaseConfig(firebaseConfig: FirebaseOptions): FirebaseOptions {
  const invalidConfigKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => typeof value === 'string' && placeholderPattern.test(value))
    .map(([key]) => key);

  if (invalidConfigKeys.length > 0) {
    throw new Error(
      `Firebase is not configured. Replace the placeholder value(s) for ${invalidConfigKeys.join(', ')} in src/environments/environment.ts and src/environments/environment.prod.ts with the Web app config from your Firebase project settings.`,
    );
  }

  return firebaseConfig;
}
