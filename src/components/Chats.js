import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./Chats.css"
import { clearErrors, getAllFriends, getFriendDetails, newMessageTrueValue, newMessageFalseValue } from "../redux/actions/friendAction";
import toast from 'react-hot-toast';
import { addToCurrentChatMessages, getMessages } from '../redux/actions/messageAction';
import { CiSearch } from "react-icons/ci";
import { IS_SUBSCRIBED } from '../redux/constants/messageConstants';
import Conversation from './Conversation';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const Chats = () => {

  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  // const [isBioPopUpOpen, setIsBioPopUpOpen] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { selectedFriend, allFriends } = useSelector((state) => state.friend);
  const { chatId, error } = useSelector((state) => state.message);


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllFriends());
    connectSocket();
  }, []);


  useEffect(() => {
    setFilteredFriends(allFriends);
  }, [allFriends]);


  const connectSocket = () => {
    // const socket = new SockJS("http://localhost:8080/ws");
    const socket = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
    const client = Stomp.over(socket);
    setStompClient(client);
    const token = localStorage.getItem("talkactiveToken");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    client.connect(headers, onConnect, onError);
  };

  const onError = (error) => {
    toast.error(error);
    console.log(error);
  }

  const onConnect = () => {
    setIsConnected(true);
  };

  useEffect(() => {
    if (isConnected && stompClient) {
      stompClient.subscribe(`/user/${user.id}/notification`, payload => onNotificationReceived(payload));
      dispatch({ type: IS_SUBSCRIBED });
    }
  }, [isConnected])

  useEffect(() => {
    if (chatId && isConnected && stompClient) {
      const sub = stompClient.subscribe(`/group/${chatId}`, (payload) => onPrivateMessageReceived(payload));
      setSubscription(sub);
    }
  }, [chatId]);

  const onNotificationReceived = (payload) => {
    const message = JSON.parse(payload.body);
    toast.promise(dispatch(newMessageTrueValue(message.sender)), { success: `New Message from: ${message.senderName}` })
  }

  const onPrivateMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);

    if (user.id !== message.sender && message.content === "typing") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }

    else if (user.id !== message.sender) {
      dispatch(addToCurrentChatMessages(message));
    }
  }


  const handleUserClick = (selectedId) => {
    dispatch(newMessageFalseValue(selectedId));
    if (selectedFriend && selectedFriend.id !== selectedId) {
      if (stompClient && subscription) {
        subscription.unsubscribe();
      }
      dispatch(getFriendDetails(selectedId));
      const userIds = { user1: user.id, user2: selectedId };
      dispatch(getMessages(userIds));
      // dispatch(newMessageFalseValue(selectedId));
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    const filtered = allFriends.filter(u => u.name.match(new RegExp(value, "gi")));
    setFilteredFriends(filtered);
  }


  return (
    <div className='chat-page'>
      <div className="chat-container">
        <div className="users-list">
          <div className={isSideMenuOpen ? "hiddenUsersListContainer" : "users-list-container"}>
            <div>
              <div className='profile-pic'><img src={user.profileImage} alt='Profile' /></div>
              {user.name}
            </div>
            <p>All Friends:</p>
            <div className='search-box'>
              <input
                type='text'
                placeholder='Search...'
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button><CiSearch /></button>
            </div>
            <ul>
              {filteredFriends && filteredFriends.map(u => (
                <li key={u.id} className={u.newMessage ? 'new-message' : 'no-message'} onClick={() => handleUserClick(u.id)}>
                  <div className='friendImage'><img src={u.profileImage} alt='Profile' /></div>
                  {u.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='sideMenu'>{isSideMenuOpen ? <IoIosArrowForward onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} /> : <IoIosArrowBack onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} />}</div>
        </div>
        {selectedFriend && selectedFriend.id ? (
          <Conversation stompClient={stompClient} isTyping={isTyping} />
        ) : (
          <div className='empty-area'>
            <h1>Welcome to TalkActive</h1>
            <p>Where Talkative Minds Connect.</p>
          </div>
        )}
      </div>

      {/* {isBioPopUpOpen && (
        <div className="bio-container" onClick={() => setIsBioPopUpOpen(false)}>
          <div className="bio">
            <h2>{`${selectedFriend.name}'s bio`}</h2>
            <p>{selectedFriend && selectedFriend.bio}</p>
          </div>
        </div>
      )} */}

    </div>
  )
}

export default Chats