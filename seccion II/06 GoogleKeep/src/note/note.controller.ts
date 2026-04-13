import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { NoteService } from "./note.service";
import { NoteDto } from "./dto/note.dto";

@Controller('note')
export class NoteController {
    constructor(
        private readonly service: NoteService
    ) {}

    @Post('getall')
    getAll() {
        return this.service.getAll();
    }

    @Post('getbyid/:id')
    getPerson(@Param('id', ParseIntPipe) id: number) {
        return this.service.getById(id);
    }

    @Post('saveorupdate')
    async save(@Body() data: NoteDto) {
        return await this.service.save(data);
    }

    @Post('deletebyid/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete(id);
    }
}