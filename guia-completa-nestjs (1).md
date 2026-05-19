# 🚀 Guía Completa — NestJS + TypeORM + PostgreSQL + Docker
> Taller de Aplicaciones en Internet — 7mo Semestre

---

## PASO 1 — Requisitos previos

Asegúrate de tener instalado:
- Node.js (v18 o superior)
- Docker Desktop
- Postman
- NestJS CLI:

```bash
npm i -g @nestjs/cli
```

---

## PASO 2 — Crear el proyecto NestJS

```bash
nest new nombre-proyecto
cd nombre-proyecto
```

Selecciona **npm** cuando pregunte el gestor de paquetes.

---

## PASO 3 — Instalar dependencias

```bash
npm install @nestjs/typeorm typeorm pg @nestjs/config class-validator class-transformer
```

| Paquete | Para qué sirve |
|---|---|
| `@nestjs/typeorm` | Integración TypeORM con NestJS |
| `typeorm` | ORM para manejar la BD |
| `pg` | Driver de PostgreSQL |
| `@nestjs/config` | Manejo de configuración y variables |
| `class-validator` | Validaciones en el DTO (`@IsString`, etc.) |
| `class-transformer` | Transforma tipos automáticamente |

---

## PASO 4 — Crear docker-compose.yml

Crea el archivo `docker-compose.yml` en la **raíz del proyecto** (mismo nivel que `package.json`):

```yaml
services:
  postgres:
    image: postgres:17
    container_name: postgres-nest
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: nestdb
    ports:
      - '8005:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

> 💡 El puerto `8005:5432` significa: accede por el puerto `8005` desde fuera, pero internamente PostgreSQL usa `5432`.

Levantar el contenedor:

```bash
docker-compose up -d
docker ps  # verificar que está en estado "Up"
```

---

## PASO 5 — Estructura de carpetas

```
src/
├── config/
│   └── orm.config.ts
├── producto/
│   ├── dto/
│   │   └── producto.dto.ts
│   ├── model/
│   │   └── producto.model.ts
│   ├── producto.controller.ts
│   └── producto.service.ts
├── app.module.ts
└── main.ts
```

Crear las carpetas manualmente o con comandos:

```bash
mkdir src/config
mkdir src/producto
mkdir src/producto/dto
mkdir src/producto/model
```

---

## PASO 6 — Configurar main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // elimina campos no declarados en el DTO
    forbidNonWhitelisted: true, // lanza error si llegan campos extra
    transform: true,           // convierte tipos automáticamente (ej: string → number)
  }));
  await app.listen(3000);
}
bootstrap();
```

---

## PASO 7 — Configurar orm.config.ts

```typescript
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Producto } from 'src/producto/model/producto.model';

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 8005,           // mismo puerto del docker-compose
        username: 'admin',
        password: 'admin123',
        database: 'nestdb',
        entities: [Producto],
        synchronize: true,    // crea tablas automáticamente (desactivar en producción)
    }),
);
```

> 💡 **synchronize: true** crea y actualiza las tablas automáticamente según las entidades. Se desactiva en producción para evitar pérdida de datos.

---

## PASO 8 — Configurar app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoController } from './producto/producto.controller';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/model/producto.model';
import { ConfigModule } from '@nestjs/config';
import { ProductoService } from './producto/producto.service';

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
    TypeOrmModule.forFeature([Producto])
  ],
  controllers: [AppController, ProductoController],
  providers: [
    AppService,
    ProductoService
  ],
})
export class AppModule {}
```

---

## PASO 9 — Crear la Entidad (Model)

`src/producto/model/producto.model.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

| Decorador | Descripción |
|---|---|
| `@Entity()` | Marca la clase como tabla en la BD |
| `@PrimaryGeneratedColumn()` | Clave primaria autoincremental |
| `@Column()` | Columna normal |
| `@Column({ nullable: true })` | Columna opcional |
| `@Column('decimal')` | Columna con decimales |
| `@Column({ default: 0 })` | Columna con valor por defecto |
| `@CreateDateColumn()` | Fecha de creación automática |
| `@UpdateDateColumn()` | Fecha de actualización automática |

---

## PASO 10 — Crear el DTO

`src/producto/dto/producto.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsInt, Min, MaxLength, MinLength } from 'class-validator';

export class ProductoDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion: string;

  @IsNumber()
  @Min(0.01)
  precio: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsBoolean()
  activo: boolean;
}
```

| Decorador | Descripción |
|---|---|
| `@IsNotEmpty()` | Campo obligatorio |
| `@IsOptional()` | Campo opcional |
| `@IsString()` | Debe ser texto |
| `@IsNumber()` | Debe ser número |
| `@IsInt()` | Debe ser entero |
| `@IsBoolean()` | Debe ser booleano |
| `@Min(n)` | Valor mínimo |
| `@MinLength(n)` | Longitud mínima |
| `@MaxLength(n)` | Longitud máxima |

---

## PASO 11 — Crear el Servicio

`src/producto/producto.service.ts`

```typescript
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Producto } from "./model/producto.model";
import { ProductoDto } from "./dto/producto.dto";

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly repo: Repository<Producto>,
    ) {}

    getAll() {
        return this.repo.find();
    }

    async getById(id: number) {
        const producto = await this.repo.findOneBy({ id });
        if (!producto) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return producto;
    }

    async createOrUpdate(data: ProductoDto) {
        if(data.id === undefined || data.id === null || data.id === 0) {
            const nuevoProducto = this.repo.create(data);
            await this.repo.save(nuevoProducto);
            return { mensaje: 'producto creado' }
        }
        else {
            await this.getById(data.id);
            await this.repo.update({ id: data.id }, data);
            return { mensaje: 'producto actualizado' }
        }
    }

    async delete(id: number) {
        await this.getById(id);
        await this.repo.delete({ id });
        return { mensaje: 'producto eliminado' }
    }
}
```

---

## PASO 12 — Crear el Controlador

`src/producto/producto.controller.ts`

```typescript
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';

@Controller('productocontroller')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  getAll() {
    return this.productoService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productoService.getById(id);
  }

  @Post()
  saveOrUpdate(@Body() dto: ProductoDto) {
    return this.productoService.saveOrUpdate(dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.productoService.deleteById(id);
  }
}
```

---

## PASO 13 — Levantar el proyecto

```bash
npm run start:dev
```

Debes ver en consola:
```
LOG [TypeOrmCoreModule] Data Source initialized
LOG [NestApplication] Nest application successfully started
```

---

## PASO 14 — Probar en Postman

URL base: `http://localhost:3000/api/v2/productocontroller`

### Crear producto
- **POST** `http://localhost:3000/api/v2/productocontroller`
- Body → raw → JSON:
```json
{
  "nombre": "Laptop Lenovo",
  "descripcion": "Laptop gamer 16GB RAM",
  "precio": 1200.99,
  "stock": 10,
  "activo": true
}
```

### Listar todos
- **GET** `http://localhost:3000/api/v2/productocontroller`

### Obtener por ID
- **GET** `http://localhost:3000/api/v2/productocontroller/1`

### Actualizar
- **POST** `http://localhost:3000/api/v2/productocontroller`
- Body:
```json
{
  "id": 1,
  "nombre": "Laptop Lenovo ACTUALIZADA",
  "precio": 999.99,
  "stock": 5
}
```

### Eliminar
- **DELETE** `http://localhost:3000/api/v2/productocontroller/1`

### Probar error 404
- **GET** `http://localhost:3000/api/v2/productocontroller/999`
- Respuesta esperada:
```json
{
  "statusCode": 404,
  "message": "Producto 999 no encontrado"
}
```

---

## 🧠 Resumen para el examen

| Capa | Archivo | Decorador clave |
|---|---|---|
| **Entidad** | `producto.model.ts` | `@Entity()`, `@Column()` |
| **DTO** | `producto.dto.ts` | `@IsString()`, `@IsNumber()` |
| **Servicio** | `producto.service.ts` | `@Injectable()` |
| **Controlador** | `producto.controller.ts` | `@Controller()`, `@Get()`, `@Post()`, `@Delete()` |

| Concepto | Explicación para el profe |
|---|---|
| `synchronize: true` | Crea/actualiza tablas automáticamente. Se desactiva en producción |
| `whitelist: true` | Elimina campos no declarados en el DTO |
| `forbidNonWhitelisted: true` | Lanza error si llegan campos extra |
| `transform: true` | Convierte tipos automáticamente (string → number) |
| `docker-compose up -d` | Levanta contenedores en segundo plano |
| `docker ps` | Verifica contenedores corriendo |
