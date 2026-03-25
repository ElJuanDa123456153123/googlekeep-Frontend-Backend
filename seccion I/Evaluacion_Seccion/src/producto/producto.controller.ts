import { Body, Controller, Param, Post } from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { ProductoDto } from "./dto/producto.dto";

@Controller("producto")
export class ProductoController {
    constructor(
        private readonly service: ProductoService
    ) {}

    @Post()
    getAll() {
        return this.service.getAll();
    }

    @Post("getbyid/:id")
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    @Post("save")
    save(@Body() entity: ProductoDto) {
        return this.service.save(entity);
    }

    // producto/delete/1
    @Post("delete/:id")
    delete(@Param("id") id: number) {
        return this.service.delete(id);
    }
}