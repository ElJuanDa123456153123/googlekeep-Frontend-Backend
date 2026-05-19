import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './model/producto.model';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly repo: Repository<Producto>,
    ) {}

    getall() {
        return this.repo.find();
    }

    async getById(id: number) {
        const producto = await this.repo.findOneBy({ id });
        if (!producto) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return producto;
    }

    async createOrUpdate(data: ProductoDto) {
        if(data.id === undefined || data.id === null || data.id === 0) {
            const nuevo = this.repo.create(data);
            await this.repo.save(nuevo);
            return { message: 'Producto creado', producto: nuevo };
        } else {
            await this.getById(data.id); // valida que exista o lanza error
            await this.repo.update({ id: data.id }, data);
            return { message: 'Producto actualizado'}
        }
    }

    async delete(id: number) {
        await this.getById(id); // valida que exista o lanza error
        await this.repo.delete({ id });
        return { message: 'Producto eliminado' }
    }
}