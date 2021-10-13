interface AuthResponse {
    msg: string
};
interface AuthRequest {
    email: string,
    password: string
}
export type { AuthResponse, AuthRequest };