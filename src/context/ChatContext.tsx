import {createContext, ReactNode, useContext, useEffect, useReducer, useState} from "react";
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
import {useAuth} from "../components/hooks/useAuth";


interface IProps {
    children: ReactNode
}

export interface ChatContextInterface {
    dispatch: any
    data: any
}

export const chatContextDefaults: ChatContextInterface = {
    dispatch: null,
    data: {},
};

export const ChatContext = createContext<ChatContextInterface>(chatContextDefaults);

export function ChatContextProvider({children}: IProps) {
    const { user } = useAuth();
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state: any, action: any) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: user.uid > action.payload.uid
                        ? user.uid + action.payload.uid
                        : action.payload.uid + user.uid,
                }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);


    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}