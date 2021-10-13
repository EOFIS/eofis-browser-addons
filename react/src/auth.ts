import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getUser() {
    const cookie = Cookies.get("user");
    if (!cookie) return null;
    return jwt_decode(cookie);
}