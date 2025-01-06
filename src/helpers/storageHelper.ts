import {AxiosHelper} from "./axiosHelper";

export const setUser = (email: string, token: string) => {
    const cookieValue = encodeURIComponent(`${email}:${token}`);
    document.cookie = `auth=${cookieValue}`;
}

export const getUser = (): {email: string, token: string} | false => {
    if (document.cookie.includes('auth=')) {
        const cookies: string[] = document.cookie.split('; ');
        for(let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split('=');
            if (key === 'auth') {
                const [email, token] = decodeURIComponent(value).split(':');
                new AxiosHelper(email, token);
                return { email, token };
            }
        }
    }
    return false;
}

