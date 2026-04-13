import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { NoteDto } from "src/note/dto/note.dto";

export class RecordatorioDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    note_id: number;

    @IsNotEmpty()
    @IsBoolean()
    activo: boolean;

    @IsOptional()
    note?: NoteDto;
}
