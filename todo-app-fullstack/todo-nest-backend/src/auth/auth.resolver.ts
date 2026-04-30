import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/authpayload.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/utils/guard/gqp-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }
  
  @Mutation(() => Usuario)
  async register(@Args('input') input: CreateAuthInput) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input.email, input.password);
  }

  @Mutation(() => AuthPayload)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

    @UseGuards(GqlAuthGuard)
  @Query(() => Usuario)
  async getUsuario(@Args('id', { type: () => Int }) id: number) {
    return this.authService.getUsuario(id);
  }

}
