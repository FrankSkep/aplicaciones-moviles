import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @Field()
  @IsString()
  name: string = '';
  @IsEmail()
  @Field()
  email: string = '';
  @Field()
  @IsString()
  @MinLength(6)
  passwordHash: string = '';
}
