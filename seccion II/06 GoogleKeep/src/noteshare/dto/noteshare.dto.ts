import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Note } from "src/note/model/note.model";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";

export class NoteshareDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    @IsNotEmpty()
    role: number;

    @IsNumber()
    @IsNotEmpty()
    usuario: number;
    
    @IsNotEmpty()
    note: number;
}