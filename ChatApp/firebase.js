import * as firebase from "firebase"
import 'firebase/firestore'
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDlHp190JQ0-TYROxvVYF_uf9S1KLKk4BM",
    authDomain: "signal-chat-app-61659.firebaseapp.com",
    projectId: "signal-chat-app-61659",
    storageBucket: "signal-chat-app-61659.appspot.com",
    messagingSenderId: "74169007198",
    appId: "1:74169007198:web:9d5d7215f2df1c825e08cf"
  };
  let app;
  
  if(firebase.apps.length===0){

      app=firebase.initializeApp(firebaseConfig);
  }
  else{
      app=firebase.app()
  }
  const db=app.firestore()
  const auth =firebase.auth();

  export {db,auth}

