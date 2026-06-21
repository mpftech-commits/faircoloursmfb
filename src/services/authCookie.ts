const isSecureContext = window.location.protocol === "https:";
const defaultCookieFlags = isSecureContext
    ? "; path=/; SameSite=None; Secure"
    : "; path=/; SameSite=Lax";

export const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp(`(^|; )token=([^;]*)`));
    return match ? decodeURIComponent(match[2]) : null;
};

export const setTokenCookie = (token: string) => {
    document.cookie = `token=${encodeURIComponent(token)}${defaultCookieFlags}`;
};

export const removeTokenCookie = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT${defaultCookieFlags}`;
};
