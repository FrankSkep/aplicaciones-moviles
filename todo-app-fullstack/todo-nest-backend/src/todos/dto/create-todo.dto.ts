import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  completada?: boolean;
}
