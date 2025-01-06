import React, {useEffect, useState} from 'react';
import {getUser} from "../helpers/storageHelper";
import {useNavigate} from "react-router-dom";
import SettingsContent from "../components/SettingsContent";
import useSettings from "../hooks/useSettings";

const Settings = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({ token: '', email: '' });

    const { password, postPassword, getPassword } = useSettings();
    useEffect(() => {
        getAndSetUserFromStorage();
        getPassword();
    }, []);

    const getAndSetUserFromStorage = () => {
        const storageUser = getUser();
        if (!storageUser) {
            navigate('/login');
        } else {
            setUser(storageUser);
        }
    }
    return <div>
        <SettingsContent user={user} password={password} setPassword={postPassword}/>
    </div>
};

export default Settings;