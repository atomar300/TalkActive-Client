import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';
import {logout} from "../redux/actions/userAction"
import { useDispatch } from 'react-redux';

const Header = () => {

    const dispatch = useDispatch();

    return (
        <div className='header-container'>
            <div className='header'>
                <ul className='header-items-container'>
                    <li>
                        <Link to="/">TalkActive</Link>
                    </li>
                    <li>
                        <Link to="/chats">Chats</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/requests">Requests</Link>
                    </li>
                    <li>
                        <Link><div onClick={() => dispatch(logout())}>Logout</div></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header