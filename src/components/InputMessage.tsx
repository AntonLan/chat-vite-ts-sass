import React from 'react';
import AddImgIcon from '../assets/images/add-image.svg';
import ClipIcon from '../assets/images/clip.png';
import {useInput} from "./hooks/useInput";

const InputMessage = () => {
    const {text, changeText, addImg, handleSend} = useInput()


    return (
        <div className="input-messages">
            <input
                type="text"
                placeholder="Type something..."
                onChange={changeText}
                value={text}
            />
            <div className="send">
                <img src={ClipIcon} alt="ClipIcon"/>
                <input
                    onChange={addImg}
                    type="file"
                    id="file"/>
                <label htmlFor="file">
                    <img src={AddImgIcon} alt="AddImgIcon"/>
                </label>
                <button
                    onClick={handleSend}
                >send</button>
            </div>
        </div>
    );
};

export default InputMessage;