import {useContext, useState} from "react";
import {useAuth} from "./useAuth";
import {ChatContext} from "../../context/ChatContext";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../../firebase";
import {arrayUnion, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import { v4 as uuid } from 'uuid';

import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export function useInput () {
    const [text, setText] = useState("")
    const [img, setImg] = useState<any>()

    const { user } = useAuth()
    const { data } = useContext(ChatContext);

    const changeText = (e: any) => {
        setText(e.target.value)
    }

    const addImg = (e: any) => {
        setImg(e.target.files[0])
    }

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on("state_changed",
                (snapshot) => {
                },
                (error) => {
                    alert(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: user.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };


    return {text, changeText, handleSend, addImg}
}