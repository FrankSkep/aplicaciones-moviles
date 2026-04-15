import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUsuarioInput {
  @Field()
  @IsEmail()
  nombre!: string;

  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  email!: string;
}
