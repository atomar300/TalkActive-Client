import React, { useState } from 'react'
import "./Conversation.css";
import Loader from './Loader';
import Message from './Message';
import { IoIosAttach } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Compress from 'compress.js';
import moment from 'moment';
import { addToCurrentChatMessages } from '../redux/actions/messageAction';


const Conversation = ({ stompClient, isTyping }) => {

    const [isBioPopUpOpen, setIsBioPopUpOpen] = useState(false);
    const [image, setImage] = useState('');
    const [messageInput, setMessageInput] = useState('');


    const { user } = useSelector((state) => state.user);
    const { selectedFriend } = useSelector((state) => state.friend);
    const { chatId, loading } = useSelector((state) => state.message);

    const dispatch = useDispatch();


    const sendMessage = (e) => {
        e.preventDefault();

        let chatMessage = {};

        // if image is being sent
        if (image && stompClient) {
            chatMessage = {
                sender: user.id,
                chat: chatId,
                content: image,
                image: true,
                timestamp: moment().format('YYYY-MM-DDTHH:mm:ss'),
            };
            setImage('');
        }
        // if plain text is being sent
        else {
            chatMessage = {
                sender: user.id,
                chat: chatId,
                content: messageInput.trim(),
                image: false,
                timestamp: moment().format('YYYY-MM-DDTHH:mm:ss'),
            };
            setMessageInput('');
        }

        stompClient.send("/app/private-chat", {}, JSON.stringify(chatMessage));
        dispatch(addToCurrentChatMessages(chatMessage));

        const notificationMessage = {
            sender: user.id,
            senderName: user.name,
            recipient: selectedFriend.id,
        }
        stompClient.send(`/app/notification`, {}, JSON.stringify(notificationMessage));
    };


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const compress = new Compress();
        const resizedImage = await compress.compress([file], {
            size: 2, // max 2 mb
            quality: 1, // values are 0 to 1
            maxWidth: 800,
            maxHeight: 800,
        })
        const img = resizedImage[0];
        const imageString = img.prefix + img.data;
        setImage(imageString);
    };

    const messageInputHandler = (val) => {
        setMessageInput(val);
        if (messageInput.trim() && stompClient) {
            const chatMessage = {
                sender: user.id,
                chat: chatId,
                content: "typing",
                image: false,
                timestamp: moment().format('YYYY-MM-DDTHH:mm:ss'),
            };
            stompClient.send("/app/typing", {}, JSON.stringify(chatMessage));
        }
    };


    return (
        <div className="chat-area">

            <div className='selected-user-header' onClick={() => setIsBioPopUpOpen(true)}>
                <div className='selected-user-header-profile-image'>
                    <img src={selectedFriend.profileImage} alt='No Profile Pic' />
                </div>
                <div className='selected-user-header-name-and-status'>
                    <div>{selectedFriend && selectedFriend.name}</div>
                    {isTyping ? (<div>{"Typing..."}</div>) : (<div>{selectedFriend && selectedFriend.status}</div>)}
                </div>
            </div>

            {loading ? (<Loader />) : (
                <Message />
            )}

            <div className='message-input-container'>
                <form onSubmit={e => sendMessage(e)}>

                    <div className="message-input">
                        {image ? (<div className='image-message-container'><img src={image} alt='Image was not selected' /></div>) : (<input type="text" value={messageInput} onChange={(e) => messageInputHandler(e.target.value)} placeholder="Message..." />)}
                        <label htmlFor="image-upload" className="attach-icon">
                            <IoIosAttach />
                        </label>
                        <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
                        <button type="submit"><IoMdSend /></button>
                    </div>

                </form>
            </div>


            {isBioPopUpOpen && (
                <div className="bio-container" onClick={() => setIsBioPopUpOpen(false)}>
                    <div className="bio">
                        <h2>{`${selectedFriend.name}'s bio`}</h2>
                        <p>{selectedFriend && selectedFriend.bio}</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Conversation