import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Attachment } from "src/attachment/model/attachment.model";
import { Note } from "src/note/model/note.model";
import { Noteshare } from "src/noteshare/model/noteshare.model";
import { Usuario } from "src/usuario/model/usuario.model";

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5222,
        username: 'postgres',
        password: '1844',
        database: 'impocruz-db',
        entities: [Usuario, Noteshare, Note, Attachment],
        synchronize: true,
    }),
);