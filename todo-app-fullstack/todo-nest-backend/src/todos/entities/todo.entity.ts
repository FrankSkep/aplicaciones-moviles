import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  userId: number;

  @Field()
  titulo: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field()
  completada: boolean;

  @Field()
  createdAt: Date;
}