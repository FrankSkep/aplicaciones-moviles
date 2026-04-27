import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthPayload } from './dto/authpayload.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/utils/guard/gqp-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }
  
  @Mutation(() => CreateAuthInput)
  async register(@Args('input') input: CreateAuthInput) {
    return this.authService.register(input);
  }

  @Mutation(() => String)
  async login() {
    // Implementa la lógica de inicio de sesión aquí
    return 'Inicio de sesión exitoso';
  }

  @Mutation(() => AuthPayload)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

    @UseGuards(GqlAuthGuard)
  @Query(() => Usuario)
  async getUsuario(@Args('id') id: string) {
    return this.authService.getUsuario(id);
  }

}
