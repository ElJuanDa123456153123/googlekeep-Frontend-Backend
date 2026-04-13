import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";

export class NoteDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsBoolean()
    activo: boolean;

    @IsNotEmpty()
    usuario: UsuarioDto;
}