import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

const app= firebase.initializeApp(


    {

 apiKey:"AIzaSyBHu9e5cuW4YGDhOseC5-8GAnRLvx_r2IM",
  authDomain:import.meta.env.AUTH_DOMAIN,
  projectId:import.meta.env.PROJECTID,// 
  storageBucket:import.meta.env.STORAGE_BUCKET,
  messagingSenderId:import.meta.env.MSGID,
  appId:import.meta.env.APPID
    
    }
)
export const auth=app.auth()

export default app;
