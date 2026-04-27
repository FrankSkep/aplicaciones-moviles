import { PartialType } from "@nestjs/graphql";
import { CreateAuthInput } from "./create-auth.input";

export class UpdateAuthInput extends PartialType(CreateAuthInput) {
    id: number = 0;
}