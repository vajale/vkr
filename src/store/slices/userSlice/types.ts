export interface User {
    id: string;
    username?: string;
    avatar?: string;
    pages?: {
        id: string,
        name: string,
        parent: string | ''
    }
}

export interface IUserSchema {
    user?: User
}
