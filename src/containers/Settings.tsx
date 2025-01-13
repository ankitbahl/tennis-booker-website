import React, {useEffect, useState} from 'react';
import {getUser} from "../helpers/storageHelper";
import {useNavigate} from "react-router-dom";
import SettingsContent from "../components/SettingsContent";
import useSettings from "../hooks/useSettings";

const Settings = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({ token: '', email: '' });

    const { settings, saveSettings, getSettings } = useSettings();
    useEffect(() => {
        getAndSetUserFromStorage();
        getSettings();
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
        <SettingsContent user={user} password={settings.password} recEmail={settings.recEmail} saveSettings={saveSettings}/>
    </div>
};

export default Settings;