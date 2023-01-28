import {createContext, ReactNode, useEffect, useState} from "react";
import {auth, db, storage} from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {useNavigate} from "react-router-dom";
import {UserType} from "../service/model/UserType";


interface IProps {
    children: ReactNode
}

export interface AuthContextInterface {
    singUp: (login: string, email: string, password: string, file: any) => void;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    error: string,
    user: UserType
}

export const authContextDefaults: AuthContextInterface = {
    singUp: () => null,
    logIn: () => null,
    logOut: () => null,
    error: "",
    user: {
        uid: "",
        displayName: "",
        email: "",
        photoURL: ""
    }
};

export const AuthContext = createContext<AuthContextInterface>(authContextDefaults);

export function AuthContextProvider({children}: IProps) {
    const [error, setError] = useState("")
    const [user, setUser] = useState<UserType>({displayName: "", email: "", photoURL: undefined, uid: ""})
    const navigate = useNavigate()

    async function singUp(login: string, email: string, password: string, file: any) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, login);
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed",
                (snapshot) => {
                },
                (error) => {
                    alert(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(response.user, {
                            displayName: login,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "users", response.user.uid), {
                            uid: response.user.uid,
                            displayName: login,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "userChats", response.user.uid), {})
                        navigate("/")
                    })
                }
            )
        } catch (e: any) {
            setError(e.message)
        }

    }

    async function logIn(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (e: any) {
            setError(e.message)
        }

    }


    async function logOut() {
        try {
            await signOut(auth)
            navigate("/login")
        } catch (e: any) {
            setError(e.message)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser as UserType);
        })
        return () => {
            unsubscribe()
        }
    })

    return (
        <AuthContext.Provider value={{singUp, user, error, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}