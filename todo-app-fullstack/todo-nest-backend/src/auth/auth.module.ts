import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [PassportModule,
        JwtModule.register({})
    ],
    providers: [
        AuthResolver, AuthService, JwtStrategy, PrismaService
    ],
    exports: [AuthService]
})
export class AuthModule {
}

