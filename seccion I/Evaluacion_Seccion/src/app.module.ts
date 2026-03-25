import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Producto } from './producto/model/producto.model';
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';

export function configPG(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5222,
    username: 'postgres',
    password: '1844',
    database: 'impocruz-db',
    entities: [Producto],
    synchronize: true,
  };
}


@Module({
  imports: [
    //configuracion global
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // config de PG
    TypeOrmModule.forRootAsync({
      useFactory: () => configPG()
    }),

    // config de model
    TypeOrmModule.forFeature([Producto])
  ],
  controllers: [AppController, ProductoController],
  providers: [AppService, ProductoService],
})
export class AppModule {}
