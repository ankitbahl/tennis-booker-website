import React, {useEffect, useState} from 'react';

type SettingsProps = {
    user: {token: string, email: string};
    password: string;
    saveSettings: (password: string, recEmail: string) => void;
    recEmail?: string;
}

const SettingsContent = ({user, password, saveSettings, recEmail}: SettingsProps) => {
    const [passwordInput, setPasswordInput] = useState('');
    const [recEmailInput, setRecEmailInput] = useState('');
    useEffect(() => {
        setPasswordInput(password);
        if (recEmail) {
            setRecEmailInput(recEmail);
        }
    }, [password, recEmail]);

    const saveDisabled = passwordInput === password && recEmailInput === recEmail;

    return <div>
        <h2>{`Email: ${user.email}`}</h2>
        <div className="flex">
            <span className="pt-2.5 pb-2.5 w-44">{`Rec US email: `}</span>
            <input
                onChange={e => setRecEmailInput(e.target.value)}
                value={recEmailInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-40"/>
        </div>
        <div className="flex">
            <span className="pt-2.5 pb-2.5 w-44">{`Rec US password: `}</span>
            <input
                onChange={e => setPasswordInput(e.target.value)}
                value={passwordInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-40"/>
        </div>
        <button
            disabled={saveDisabled}
            onClick={() => saveSettings(passwordInput, recEmailInput)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${saveDisabled ? 'opacity-50' : ''}`}
        >
            Save
        </button>
    </div>;
}

export default SettingsContent;