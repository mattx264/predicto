export interface DecodedToken {
    sub: string;
    email: string;
    jti: string;
    iat: number;
    exp: number;
}

export const decodeJwtToken = (token: string): DecodedToken | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const getJoinDateFromToken = (token: string): string => {
    const decoded = decodeJwtToken(token);
    if (decoded?.iat) {
        return new Date(decoded.iat * 1000).toISOString();
    }
    return new Date().toISOString();
};