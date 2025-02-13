import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged
} from 'firebase/auth';
import { auth, db} from '../services/firebase'; // Ensure the correct path for firebase.js
import {doc, setDoc} from 'firebase/firestore'
import firebase from "firebase/compat/app";

// Create the context
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            
            return setDoc(doc(db, 'users', email), {
                favShows: [],
            });
        });
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    // Provide the auth context to all children
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export function UserAuth() {
    return useContext(AuthContext);
}
