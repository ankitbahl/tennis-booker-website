import { useState } from "react";
import { AxiosHelper } from "../helpers/axiosHelper";

const useSettings = () => {
    const [settings, setSettings] = useState({ password: '', recEmail: '' });

    const getSettings = async () => {
        const out = await AxiosHelper.getWithAxios('/account-settings');
        setSettings({ password: out.data.password, recEmail: out.data.recEmail });
    };

    const saveSettings = async (password: string, recEmail: string) => {
        await AxiosHelper.postWithAxios('/account-settings', { password, recEmail });
    };

    return { settings, getSettings, saveSettings }
}

export default useSettings;