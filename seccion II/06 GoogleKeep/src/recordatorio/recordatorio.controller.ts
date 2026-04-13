import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { RecordatorioService } from "./recordatorio.service";
import { RecordatorioDto } from "./dto/recordatorio.dto";

@Controller('recordatorio')
export class RecordatorioController {
    constructor(
        private readonly service: RecordatorioService
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
    async save(@Body() data: RecordatorioDto) {
        return await this.service.save(data);
    }

    @Post('deletebyid/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete(id);
    }
}
