import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Recordatorio } from "./model/recordatorio.model";
import { RecordatorioDto } from "./dto/recordatorio.dto";

@Injectable()
export class RecordatorioService {
    constructor(
        @InjectRepository(Recordatorio)
        private readonly repository: Repository<Recordatorio>
    ) {}

    getAll() {
        return this.repository.find({
            relations: ['note']
        });
    }

    getById(id: number) {
        const data = this.repository.findOne({
            where: { id },
            relations: ['note']
        });
        return data;
    }

    async save(data: RecordatorioDto) {
        if(data.id != undefined && data.id != null && data.id != 0) {
            const recordatorio = await this.repository.findOneBy({id: data.id});
            if(!recordatorio) throw new Error(`Recordatorio con id ${data.id} no encontrado`);

            await this.repository.update({id: data.id}, data);
            return 'Se actualizo correctamente!!!';
        } else {
            const entity = await this.repository.create(data);
            await this.repository.save(entity);
            return 'Se guardo correctamente!!!';
        }
    }

    async delete(id: number) {
        const data = await this.findById(id);
        if (!data) throw new Error(`Recordatorio con id ${id} no encontrado`);
        await this.repository.delete({id: id});
        return 'Se elimino correctamente!!!';
    }

    async findById(id: number) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['note']
        });

        if(!entity) throw new Error(`Recordatorio con id ${id} no encontrado`);

        return entity;
    }
}
