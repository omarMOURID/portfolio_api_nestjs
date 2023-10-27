import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from './auth.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: authConstant.secret,
      signOptions: { expiresIn: authConstant.timout },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
