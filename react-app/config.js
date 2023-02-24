import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAadcK_GlIKwuuBM2I_ZJ_rrzMrVF7s3-Q",
  authDomain: "test-3f6ca.firebaseapp.com",
  projectId: "test-3f6ca",
  storageBucket: "test-3f6ca.appspot.com",
  messagingSenderId: "379226473677",
  appId: "1:379226473677:web:b0735fc56c591bc1fdd584"
};


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
// export const auth = getAuth(firebaseConfig);
