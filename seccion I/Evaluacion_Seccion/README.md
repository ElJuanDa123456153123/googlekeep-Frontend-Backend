## PREGUNTAS:
# 1.	Configure y levante un contenedor Docker con una instancia de PostgreSQL lista para ser utilizada por la aplicación NestJS. Demuestre que el contenedor esta corriendo y que la conexión es exitosa.
# 2.	Cree un nuevo proyecto NestJS desde cero con la siguiente estructura modular y configuración global:
  a.	Cree el proyecto y muestre la estructura de carpetas.
  b.	Configure el prefijo global de rutas api/v2 en el archivo main.ts.
  c.	 Instale e integre los paquetes @nestjs/typeorm, typeorm, pg y @nestjs/config. Muestre el package.json con las dependencias instaladas.
  d.	Configure el ValidationPipe global con las opciones whitelist: true, forbidNonWhitelisted: true y transform: true. Explique para que sirve cada una.
# 3.	Implemente la entidad Producto y su correspondiente ProductoDto aplicando los decoradores de TypeORM y class-validator aprendidos en clase.						
La entidad Producto debe contener los siguientes campos:

| Campo         | Tipo TypeScript | Decorador TypeORM         | Descripcion                     |
|---------------|-----------------|---------------------------|---------------------------------|
| Id            | number          | @PrimaryGeneratedColumn() | Clave primaria autoincremental  |
| nombre        | string          | @Column()                 | Nombre del producto             |
| descripcion   | string          | @Column({nullable: true}) | Descripcion opcional            |
| precio        | number          | @Column('decimal')        | Precio con decimales            |
| stock         | number          | @Column({default: 0})     | Cantidad en inventario          |
| activo        | boolean         | @Column({default: true})  | Estado del producto             |
| created_at    | Date            | @CreateDateColumn()       | Fecha de creacion               |
| updated_at    | Date            | @UpdateDateColumn()       | Fecha de ultima actualizacion   |

El DTO ProductoDto debe incluir las siguientes validaciones con class-validator:
  •	nombre: obligatorio, string, mínimo 3 caracteres, máximo 100 caracteres.
  •	descripción: opcional (@IsOptional), string, máximo 255 caracteres.
  •	precio: obligatorio, numero (@IsNumber), valor mínimo 0.01 (@Min).
  •	stock: opcional, numero entero (@IsInt), valor mínimo 0 (@Min).
  •	activo: opcional, booleano (@IsBoolean).
Nota: El campo id debe ser @IsOptional() y @IsNumber() para soportar tanto creacion (sin id) como actualización (con id).
# 4.	Implemente el servicio ProductoService y el controlador ProductoController con los cuatro metodos CRUD descritos a continuación. Todos los endpoints deben probarse en Postman en base a la siguiente ruta: api/v2/productocontroller/
    a.	getAll() - Listar todos los productos.
    b.	getById(id) - Obtener un producto por ID.
    i.	lanzar una excepción si el producto no existe.
    c.	saveOrUpdate(data) - Guardar o Actualizar.
    i.	Si id es undefined, null o 0: crear un nuevo producto con repository.save(data) y retornar mensaje de éxito.
    ii.	Si id tiene un valor valido: verificar primero que el producto exista (lanzar error si no existe), luego actualizar con repository.update({id}, data) y retornar mensaje de éxito.
    d.	deleteById(id) - Eliminar un producto
    i.	Antes de eliminar, verifique que el registro exista; en caso contrario lanzar una excepción descriptiva.
