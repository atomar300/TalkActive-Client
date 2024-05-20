import React from 'react'
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
import {logout} from "../redux/actions/userAction"
import { useDispatch, useSelector } from 'react-redux';
import { SiSpringboot } from "react-icons/si";
import { IoChatbox } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";



const Header = () => {

    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector(state => state.user);

    const navigate = useNavigate();

    return (
        <div className='header-container'>
            <div className='header'>
                <ul className='header-items-container'>
                    <li>
                        <Link to="/">TalkActive</Link>
                    </li>
                    <li>
                        <Link to="/chats"><IoChatbox /></Link>
                    </li>
                    <li>
                        <Link to="/search"><FaSearch /></Link>
                    </li>
                    <li>
                        <Link to="/requests"><FaUserFriends /></Link>
                    </li>
                    <li>
                        <Link>{
                            isAuthenticated ? (
                                <SiSpringboot onClick={() => dispatch(logout())} />
                            ) : (
                                <RiLoginBoxFill />
                            )
                        }</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header