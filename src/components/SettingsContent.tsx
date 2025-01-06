import React, {useEffect, useState} from 'react';

type SettingsProps = {
    user: {token: string, email: string};
    password: string;
    setPassword: (password: string) => void
}

const SettingsContent = ({user, password, setPassword}: SettingsProps) => {
    const [passwordInput, setPasswordInput] = useState('');
    useEffect(() => {
        setPasswordInput(password);
    }, [password]);

    return <div>
        <h2>{`Email: ${user.email}`}</h2>
        <span>{`Rec US password: `}</span>
        <input
            onChange={e => setPasswordInput(e.target.value)}
            value={passwordInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-40"/>
        <button
            disabled={passwordInput === password}
            onClick={() => setPassword(passwordInput)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${passwordInput === password ? 'opacity-50' : ''}`}
        >
            Save
        </button>
    </div>;
}

export default SettingsContent;