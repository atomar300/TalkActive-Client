import React, { useEffect } from 'react'
import "./Requests.css";
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequest, clearErrors, getAllFriendRequests, getAllSentFriendRequests, unsendFriendRequest } from '../redux/actions/requestAction';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Requests = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { friendRequests, sentFriendRequests, error, loading } = useSelector(state => state.request);
    const { isSubscribed } = useSelector(state => state.message);


    const handleAcceptRequest = (id) => {
        toast.promise(dispatch(acceptRequest(id)), { success: "Friend Request Accepted!" })
    }


    const handleUnsendRequest = (id) => {
        toast.promise(dispatch(unsendFriendRequest(id)), { success: "Friend Request Unsent!" })
    }

    useEffect(() => {
        if (!isSubscribed) {
            navigate("/chats")
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        dispatch(getAllFriendRequests());
        dispatch(getAllSentFriendRequests());
    }, [dispatch, error, navigate])

    return (
        <div className='requests-container'>
            {loading ? <Loader /> : (
                <div className='requests-content'>

                    <div className='friendRequests-container'>
                        <div><h2>Friend Requests</h2></div>
                        <ul>
                            {friendRequests && friendRequests.map(r => (
                                <li key={r.id}>
                                    <img src={r.profileImage} alt=''/>
                                    <p>{r.name}</p>
                                    <button onClick={() => handleAcceptRequest(r.id)}>Accept</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='sentFriendRequests-container'>
                        <div><h2>Sent Friend Requests</h2></div>
                        <ul>
                            {sentFriendRequests && sentFriendRequests.map(s => (
                                <li key={s.id}>
                                    <img src={s.profileImage} alt=''/>
                                    <p>{s.name}</p>
                                    <button onClick={() => handleUnsendRequest(s.id)}>Unsend</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Requests