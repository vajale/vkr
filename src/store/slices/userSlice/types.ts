export interface User {
    id: string;
    username: string;
    avatar?: string;
}

export interface IUserSchema {
    user: User
}