import {useState} from "react";
import {collection, doc, serverTimestamp, getDocs, getDoc, query, updateDoc, setDoc, where} from "firebase/firestore";
import {db} from "../../firebase";
import {useAuth} from "./useAuth";

export function useSearch() {
    const {user} = useAuth()
    const [userName, setUserName] = useState("")
    const [actualUser, setActualUser] = useState<any>()
    const [error, setError] = useState(false)

    const handleSearch = async () => {

        try {
            const q = query(collection(db, "users"), where("displayName", "==", userName))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setActualUser(doc.data())
            })
        } catch (e: any) {
            setError(true)
        }

    }

    const handleChange = (e: any) => {
        setUserName(e.target.value)
    }

    const handleKey = (e: any) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
        const combinedId =
            user.uid > actualUser.uid
                ? user.uid + actualUser.uid
                : actualUser.uid + user.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages: []});
                //create user chats
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: actualUser.uid,
                        displayName: actualUser.displayName,
                        photoURL: actualUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
                await updateDoc(doc(db, "userChats", actualUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
            }
            setUserName("")
            setActualUser(null)
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }


    return {actualUser, userName, error, handleKey, handleChange, handleSelect}
}