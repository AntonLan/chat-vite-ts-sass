import React, {useContext} from 'react';
import CamIcon from '../assets/images/cam.svg'
import AddIcon from '../assets/images/addicon.svg'
import MoreIcon from '../assets/images/more.svg'
import Messages from "./Messages";
import InputMessage from "./InputMessage";
import {ChatContext} from "../context/ChatContext";

const Chat = () => {
    const {data} = useContext(ChatContext)

    return (
        <div className="chat">
            <div className="chat-info">
                <span>{data.user?.displayName}</span>
                <div className="chat-icons">
                    <img src={CamIcon} alt="CamIcon"/>
                    <img src={AddIcon} alt="AddIcon"/>
                    <img src={MoreIcon} alt="MoreIcon"/>
                </div>
            </div>
            <Messages/>
            <InputMessage/>
        </div>
    );
};

export default Chat;