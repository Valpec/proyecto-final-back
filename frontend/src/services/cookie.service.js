import {jwtDecode} from 'jwt-decode';

export const getJwtFromCookies = () => {
    const name = 'jwtCookieToken=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
    }
    return null;
};

export const getCartFromToken = () => {
    const token = getJwtFromCookies();
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.user.cart; 
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    }
    return null;
};

export const getUserFromToken = () => {
    const token = getJwtFromCookies();
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.user; 
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    }
    return null;
};
