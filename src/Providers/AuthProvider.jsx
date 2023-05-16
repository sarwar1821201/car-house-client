import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

 export const AuthContext= createContext();
const auth= getAuth(app);



const AuthProvider = ({children}) => {

const [user, setUser]= useState(null)
const [loading, setLoading]= useState(true)

  const createUser=(email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn= (email, password) =>{
    setLoading(true)
    return  signInWithEmailAndPassword(auth, email, password)
  }

     useEffect( ()=>{
       const unSubscribe=  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log( 'current user', currentUser)
            setLoading(false)
         });
         return () => {
           return unSubscribe();
         }
     } , [])

    const authInfo= {
        user, loading, createUser, signIn
    }

    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;