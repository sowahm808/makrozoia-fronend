# Makrozoia Solutions LLC Frontend

Angular standalone frontend for Makrozoia Solutions LLC, including marketing pages, Firebase Authentication, Firestore-backed company profiles, protected dashboard routes, and responsive enterprise consulting UI.

## Features

- Angular standalone components with TypeScript and reactive forms
- Firebase email/password authentication
- Firestore company profile create, view, and update flow
- Guards for authenticated routes and company profile completion
- Mobile-first responsive navigation, header, footer, CTAs, loading, error, and success states
- Pages: Home, Services, About, Technologies, Contact, Login, Create Account, Dashboard, Company Profile Setup, Company Profile Edit/View

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Firebase project and enable:
   - Authentication → Email/Password provider
   - Firestore Database

3. Replace Firebase placeholders in:
   - `src/environments/environment.ts`
   - `src/environments/environment.prod.ts`

   ```ts
   firebase: {
     apiKey: '...',
     authDomain: '...',
     projectId: '...',
     storageBucket: '...',
     messagingSenderId: '...',
     appId: '...',
   }
   ```

4. Run locally:

   ```bash
   npm start
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## Firestore collection

Company profiles are stored in the `companyProfiles` collection and include contact, company, service interest, project stage, technology, cloud, AI, and audit fields (`createdByUid`, `createdAt`, `updatedAt`).

## Recommended Firestore rules starter

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /companyProfiles/{profileId} {
      allow read, update: if request.auth != null && resource.data.createdByUid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.createdByUid == request.auth.uid;
    }
  }
}
```
