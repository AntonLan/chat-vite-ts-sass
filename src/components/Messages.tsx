import React from 'react';
import Message from "./Message";
import {useMessages} from "./hooks/useMessages";

const Messages = () => {
    const {messages} = useMessages()

    return (
        <div className="messages">
            {messages.map((message: any) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    );
};

export default Messages;