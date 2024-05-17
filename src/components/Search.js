import React, { useEffect, useState } from 'react'
import "./Search.css";
import { CiSearch } from "react-icons/ci";
import { Api } from '../Api';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequest, getAllFriendRequests, getAllSentFriendRequests, sendFriendRequest, unsendFriendRequest } from '../redux/actions/requestAction';
import toast from 'react-hot-toast';
import { getAllFriends } from '../redux/actions/friendAction';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const { friendRequests, sentFriendRequests } = useSelector(state => state.request);
    const { allFriends } = useSelector((state) => state.friend);


    const handleSearch = async (value) => {
        setSearchInput(value);
        if (value.trim()) {
            const token = localStorage.getItem("talkactiveToken");
            const config = { headers: { "Authorization": `Bearer ${token}` } }
            const { data } = await Api.get(`/api/users?search=${value}`, config);
            setUsers(data);
        }
    }

    const handleSendFriendRequest = (user) => {
        toast.promise(dispatch(sendFriendRequest(user)), { success: "Friend Request Sent!" })
    }

    const handleUnsendFriendRequest = (id) => {
        toast.promise(dispatch(unsendFriendRequest(id)), { success: "Friend Request Unsent!" })
    }

    const handleAcceptRequest = async (id) => {
        await toast.promise(dispatch(acceptRequest(id)), { success: "Friend Request Accepted!" })
        // dispatch(getAllFriends());
    }


    useEffect(() => {
        // if (!isStompClientConnected) {
        //     navigate("/chats")
        // }

        dispatch(getAllFriends());
        dispatch(getAllFriendRequests());
        dispatch(getAllSentFriendRequests());
    }, [dispatch])


    return (
        <div className='search-users-container'>
            <div className='users-search-box'>
                <input
                    type='text'
                    placeholder='Search a user...'
                    value={searchInput}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button><CiSearch /></button>
            </div>
            <ul>
                {users && users.map(u => (
                    <li key={u.id}>
                        <img src={u.profileImage} alt='' />
                        <p>{u.name}</p>
                        {sentFriendRequests.find(f => f.id === u.id) ? (
                            <button onClick={() => handleUnsendFriendRequest(u.id)}>Unsend Friend Request</button>
                        ) : allFriends.find(f => f.id === u.id) ? (
                            <button>Already a Friend</button>
                        ) : friendRequests.find(r => r.id === u.id) ? (
                            <button onClick={() => handleAcceptRequest(u.id)}>Accept Request</button>
                        ) : (
                            <button onClick={() => handleSendFriendRequest(u)}>Send Friend Request</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Search