import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column({nullable: true})
    descripcion: string;
    @Column('decimal')
    precio: number;
    @Column({default: 0})
    stock: number;
    @Column({default:true})
    activo: boolean;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}