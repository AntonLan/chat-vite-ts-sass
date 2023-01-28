import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

export function useChats(user: any) {
    const [chats, setChats] = useState<any>([])

    useEffect(() => {
        user.uid && getChat()
    }, [user.uid])

    const getChat = () => {
        const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
            setChats(doc.data())
        });
        return () => {
            unsub()
        }
    }

    return {chats}
}