import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';

@Controller('productoController')
export class ProductoController {
    constructor(private readonly service: ProductoService) {}

    @Get('getall')
    getall() {
        return this.service.getall();
    }

    @Get('getbyid/:id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    @Post('createorupdate')
    createOrUpdate(@Body() data: ProductoDto) {
        return this.service.createOrUpdate(data);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}