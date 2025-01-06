import {useEffect, useState} from "react";
import {AxiosHelper} from "../helpers/axiosHelper";

const useSettings = () => {
    const [password, setPassword] = useState('');

    const getPassword = async () => {
        const out = await AxiosHelper.getWithAxios('/account-password');
        setPassword(out.data.password);
    };

    const postPassword = async (password: string) => {
        await AxiosHelper.postWithAxios('/account-password', { password });
    };

    return { password, getPassword, postPassword }
}

export default useSettings;