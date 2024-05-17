import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import moment from 'moment';
import "./Message.css";

const Message = () => {

    const messageRef = useRef(null);
    const { selectedFriend } = useSelector((state) => state.friend);
    const { currentChatMessages } = useSelector((state) => state.message);

    const [zoomImage, setZoomImage] = useState('');

    useEffect(() => {
        messageRef.current?.scrollIntoView({ block: 'end' });
    }, [currentChatMessages]);


    return (
        <div className='zoom-image-and-message-container'>
            {zoomImage ? (
                <div className='zoom-image-container'>
                    <IoMdArrowBack onClick={() => setZoomImage('')} />
                    <img src={zoomImage} alt='Zoomed' />
                </div>
            ) : (
                <div className='message-container'>
                    {
                        currentChatMessages.map((message, index) => (
                            <div key={index} className={message.sender === (selectedFriend && selectedFriend.id) ? 'message sender' : 'message receiver'}>
                                {message.image ? (<img className='message-content' src={message.content} onClick={() => setZoomImage(message.content)} alt='Message' />) : (<p className='message-content'>{message.content}</p>)}
                                <p className='message-time'>{moment(message.timestamp).format('h:mm A DD-MM-YYYY')}</p>
                            </div>
                        ))
                    }
                    <div ref={messageRef} />
                </div>
            )}
        </div>
    )
}

export default Message