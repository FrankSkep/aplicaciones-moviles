import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Auth {
    @Field(() => Int)
    id: number = 0;

    @Field()
    email: string = '';
    
    @Field({ nullable: true })
    name: string = '';
}