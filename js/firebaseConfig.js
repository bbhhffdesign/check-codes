import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STOREAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}
// creo una instancia de app iniciada, es decir llamo a la funcion initializeApp y le paso la configuracion como parametro, como un login.
const app = initializeApp(firebaseConfig);
//llamo a la funcion que maneja firestore, pasandole app que esta login.
const db = getFirestore(app);

async function getCol(col) {
    //esto es sincrono, ya que solo crea una referencia, apunta a la collection.
    const colRef = collection(db, 'claims')
    console.log(colRef);
    
    //esta es toda la informacion de la collection
    const snapshot = await getDocs(colRef);
    console.log(snapshot);

    //aca obtenemos el array de objetos
    //entramos al snapshot (de la colletion)
    //despues accedemos a los documentos
    //y luego les hacemos un map() 
    const data = snapshot.docs.map(documento => ({id: documento.id, ...documento.data()}));
    // const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(data);
    
    

}

// export default getCol;