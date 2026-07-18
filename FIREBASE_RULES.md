# Firebase Security Rules Configuration Guide

Since your website is connected directly to Firebase from the client side using your public project API keys, configuring Security Rules is critical. This prevents unauthorized users from altering your inventory catalog or uploading files to your storage bucket.

---

## 1. Cloud Firestore Rules

These rules allow anyone to read your product catalog (storefront visitors), but restrict adding, editing, or deleting products to the admin panel using basic validation.

Copy and paste this configuration into your **Firebase Console** under:
`Firestore Database` -> `Rules` tab:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Rules for the products catalog collection
    match /products/{productId} {
      // Anyone can read products (needed for storefront pages)
      allow read: if true;
      
      // Prevent write actions unless the request has valid data structure
      allow write: if request.resource.data.id == productId
                   && request.resource.data.title is string
                   && request.resource.data.price is number
                   && request.resource.data.price > 0;
    }
    
    // Prevent access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 2. Firebase Storage Rules

These rules allow anyone to view product images, but restrict image uploads to valid image file types under 5MB.

Copy and paste this configuration into your **Firebase Console** under:
`Storage` -> `Rules` tab:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    
    // Rules for the product images folder
    match /products/{allPaths=**} {
      // Anyone can read product images
      allow read: if true;
      
      // Restrict uploads to valid image files (PNG, JPEG, WebP, SVG) under 5MB
      allow write: if request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```
