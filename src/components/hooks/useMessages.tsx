import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../../context/ChatContext";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

export function useMessages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return {messages}
}