import { Todo } from "../todos/types";

export type User = {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    todos: Todo[];
}

export type UserResponse = {
    message: string;
    data: User[];

}