import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { NoteShareService } from "./noteshare.service";
import { NoteshareDto } from "./dto/noteshare.dto";

@Controller()
export class NoteShareController {
    constructor(
        private readonly service: NoteShareService
    ) {}

    @Post('getall')
    getAll() {
        return this.service.getAll();
    }

    @Post('getbyid/:id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.service.getById(id);
    }

    @Post('saveorupdate')
    async save(@Body() data: NoteshareDto) {
        return await this.service.save(data);
    }

    @Post('deletebyid/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete(id);
    }
}