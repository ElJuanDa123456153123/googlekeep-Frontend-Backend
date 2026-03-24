import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsuarioController } from './usuario/usuario.controller';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/model/usuario.model';
import { ConfigModule } from '@nestjs/config';
import { UsuarioService } from './usuario/usuario.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [AppController, UsuarioController],
  providers: [
    // AppService
    UsuarioService
  ],
})
export class AppModule {}
