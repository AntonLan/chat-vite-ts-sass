import React from 'react';
import {useSearch} from "./hooks/useSearch";

const Search = () => {
const {actualUser, userName, error, handleChange, handleKey, handleSelect} = useSearch()


    return (
        <div className="search">
            <div className="search-form">
                <input
                    value={userName}
                    onKeyDown={handleKey}
                    onChange={handleChange}
                    type="search"
                    placeholder="Find a user"/>
            </div>
            {error && <span>User not found</span>}
            {actualUser &&
                <div
                    onClick={handleSelect}
                    className="user-chat">
                    <img src={actualUser?.photoURL}
                         alt="avatar"/>
                    <div className="user-chat-info">
                        <span>{actualUser?.displayName}</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default Search;