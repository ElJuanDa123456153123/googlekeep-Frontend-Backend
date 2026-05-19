export class ProductoModel {
    id!: number;
    nombre!: string;
    descripcion?: string;
    precio!: number;
    stock?: number;
    activo?: boolean;
    created_at!: Date;
    updated_at!: Date;
}