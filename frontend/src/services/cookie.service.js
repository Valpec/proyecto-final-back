import {jwtDecode} from 'jwt-decode';

// Función para obtener el JWT de las cookies
const getJwtFromCookies = () => {
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

// // Uso de la función
// export const cartId = getCartFromToken();
// console.log("Cart ID from JWT:", cartId);