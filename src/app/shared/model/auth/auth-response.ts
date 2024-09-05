export interface AuthResponse {
    message: string;
    user?: {
        username: string;
        area: string;
        name: string;
        date_created: Date;
    };
}
