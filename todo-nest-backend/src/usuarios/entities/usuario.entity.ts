import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Usuario {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  createdAt: Date;
}
