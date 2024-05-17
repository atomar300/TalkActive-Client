import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./LoginRegister.css";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors, register } from '../redux/actions/userAction';
import Loader from './Loader';
import toast from 'react-hot-toast';
import profileImg from "../assets/256-1024-1687278473.jpg";
import Compress from 'compress.js';


const LoginRegister = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [isRegistration, setIsRegistration] = useState(false);
    const [profileImage, setProfileImage] = useState(profileImg);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);


    const loginRegisterSubmit = (e) => {
        e.preventDefault();
        if (isRegistration) {
            dispatch(register(name, email, password, profileImage));
        }
        else {
            dispatch(login(email, password));
        }
    };


    const profileImageHandler = async (event) => {
        const file = event.target.files[0];
        const compress = new Compress();
        const resizedImage = await compress.compress([file], {
            size: 2, // max 2 mb
            quality: 1, // values are 0 to 1
            maxWidth: 500,
            maxHeight: 500,
        })
        const img = resizedImage[0];
        const imageString = img.prefix + img.data;
        setProfileImage(imageString);
    };


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/chats");
        }

        const convertDefaultImageToBase64 = async () => {
            const response = await fetch(profileImage);
            const blob = await response.blob();
            const compress = new Compress();
            const resizedImage = await compress.compress([blob], {})
            const img = resizedImage[0];
            const imageString = img.prefix + img.data;
            setProfileImage(imageString);
        }

        convertDefaultImageToBase64();

    }, [dispatch, error, isAuthenticated, navigate])


    return (
        <div className='login-register-container'>
            {loading ? <Loader /> : (
                <div className="login-register-form">
                    <h2>{isRegistration ? ("Register") : ("Login")}</h2>
                    <form onSubmit={loginRegisterSubmit}>

                        {isRegistration && (
                            <div>
                                <label>Name:</label>
                                <input type='text' required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        )}

                        <label>Email:</label>
                        <input type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />

                        <label>Password:</label>
                        <input type="text" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />

                        {isRegistration && (
                            <div className='registerImage'>
                                <label>Profile Picture:</label>
                                <div>
                                    <div><img src={profileImage} alt='' /></div>
                                    <input type="file" name="profileImage" accept="image/*" onChange={e => profileImageHandler(e)} />
                                </div>
                            </div>
                        )}

                        <div className='login-register-text'>
                            {isRegistration ? (
                                <p>Already a User? <Link onClick={() => setIsRegistration(!isRegistration)}>Login</Link></p>
                            ) : (
                                <p>New User? <Link onClick={() => setIsRegistration(!isRegistration)}>Register</Link></p>
                            )}
                        </div>

                        <button type='submit'>{isRegistration ? "Register" : "Login"}</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default LoginRegister