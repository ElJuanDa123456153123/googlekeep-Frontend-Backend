import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/model/usuario.model';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<{ acccess_token: string }> {
    const user = await this.usuarioService.findByForLogin(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const isPasswordValid = await this.usuarioService.verifyPassword(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      acccess_token: await this.jwtService.signAsync(payload),
    };
  }
}