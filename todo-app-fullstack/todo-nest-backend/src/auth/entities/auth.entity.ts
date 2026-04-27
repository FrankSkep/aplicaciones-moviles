import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Auth {
    id: number = 0;

    email: string = '';
    
    name: string = '';
}