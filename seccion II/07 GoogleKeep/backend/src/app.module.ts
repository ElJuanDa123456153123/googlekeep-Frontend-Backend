import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsuarioController } from './usuario/usuario.controller';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/model/usuario.model';
import { ConfigModule } from '@nestjs/config';
import { UsuarioService } from './usuario/usuario.service';
import { Noteshare } from './noteshare/model/noteshare.model';
import { Note } from './note/model/note.model';
import { NoteShareController } from './noteshare/noteshare.controller';
import { NoteShareService } from './noteshare/noteshare.service';
import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';
import { AuthModule } from './auth/auth.module';

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
    TypeOrmModule.forFeature([Usuario, Noteshare, Note, Noteshare]),
    AuthModule
  ],
  controllers: [
    AppController, 
    UsuarioController,
    NoteShareController,
    NoteController
  ],
  providers: [
    // AppService
    UsuarioService,
    NoteShareService,
    NoteService
  ],
})
export class AppModule {}
