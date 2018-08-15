import { AngularFireModule } from 'angularfire2';

/*
  To customize with your Firebase config
*/
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };

export const firebase = AngularFireModule.initializeApp(firebaseConfig)