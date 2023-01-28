import React, {useContext} from 'react';
import {useAuth} from "./hooks/useAuth";
import {useChats} from "./hooks/useChats";
import {ChatContext} from "../context/ChatContext";

const Chats = () => {
    const {user} = useAuth()
    const {chats} = useChats(user)
    const {dispatch} = useContext(ChatContext)

    const handleSelect = (user: any) => {
        dispatch({type: "CHANGE_USER", payload: user})
    }


    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a: any,b: any)=>b[1].date - a[1].date).map((chat: any) => {
                return (
                    <div
                        onClick={() => handleSelect(chat[1].userInfo)}
                        key={chat[0]}
                        className="user-chat">
                        <img src={chat[1].userInfo.photoURL}
                             alt="avatar"/>
                        <div className="user-chat-info">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Chats;