import { Repository } from "typeorm";
import { Producto } from "./model/producto.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoDto } from "./dto/producto.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly repository: Repository<Producto>
    ) {}

    getAll() {
        return this.repository.find();
    }

    async getById(id: number) {
        var entity = await this.repository.findOneBy({id});
        if (entity != 0 && entity != null) {
            return entity;
        } else {
            throw new Error("El producto no existe");
        }
    }

    save(entity: ProductoDto) {
        var productoEntity = this.repository.create(entity);
        return this.repository.save(productoEntity);
    }

    async delete(id: number) {
        var entity = await this.getById(id);
        if(entity != 0 && entity != null)
            return this.repository.delete(id);
        else 
            throw new Error("El producto no existe");
    }
}