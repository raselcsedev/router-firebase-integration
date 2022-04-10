import { useEffect, useState } from "react"
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import app from "../firebase.init";

const useFirebase =()=>{
    const [user, setUser] = useState({});

    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle =() =>{
        console.log('sign in google');
        signInWithPopup(auth, googleProvider)
        .then((result)=>{
            const user = result.user;
            setUser(user);
            console.log(user);
        })

    }

    const handleSignOut = () =>{
        signOut(auth)
        .then(()=>{})
    }

    useEffect( ()=>{
        onAuthStateChanged(auth, user =>{
            setUser(user);
        })
    }, []);
    return {
        user, 
        setUser,
        signInWithGoogle,
        handleSignOut
    }
}

export default useFirebase