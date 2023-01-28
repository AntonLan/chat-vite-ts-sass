import React, {useContext, useEffect, useRef} from 'react';
import {useAuth} from "./hooks/useAuth";
import {ChatContext} from "../context/ChatContext";

interface MessageProps {
    message: any
}

const Message = ({message}: MessageProps) => {
    const { user } = useAuth();
    const { data } = useContext(ChatContext);
    const ref: any = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);


    return (
        <div
            ref={ref}
            className={`message ${message.senderId === user.uid && "owner"}`}>
            <div className="message-info">
                <img
                    src={
                        message.senderId === user.uid
                            ? user.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="message-content">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;