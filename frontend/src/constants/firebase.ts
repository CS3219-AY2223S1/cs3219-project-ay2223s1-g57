// ref: https://github.dev/baktiaditya/cother/blob/master/src/components/base/resizeable-grid/cell.tsx
// Firebase configuration settings
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectID: FIREBASE_PROJECT_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MSGSENDERID,
  databaseURL: `https://${FIREBASE_PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`,
}
