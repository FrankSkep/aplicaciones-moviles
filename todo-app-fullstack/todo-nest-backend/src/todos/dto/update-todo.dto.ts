import { Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTodoInput } from './create-todo.dto';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
