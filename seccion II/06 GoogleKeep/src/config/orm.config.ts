import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Attachment } from "src/attachment/model/attachment.model";
import { Note } from "src/note/model/note.model";
import { Noteshare } from "src/noteshare/model/noteshare.model";
import { Usuario } from "src/usuario/model/usuario.model";
import { Recordatorio } from "src/recordatorio/model/recordatorio.model";

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 8000,
        username: 'sa',
        password: '1844',
        database: 'googlekeep-db',
        entities: [Usuario, Noteshare, Note, Recordatorio, Attachment],
        synchronize: true,
    }),
);