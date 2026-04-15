import { User } from "../users/types";

export type Todo = {
    uuid: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    userId: number;
    user: User;
}