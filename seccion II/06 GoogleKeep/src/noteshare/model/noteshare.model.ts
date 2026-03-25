import { Note } from "src/note/model/note.model";
import { Usuario } from "src/usuario/model/usuario.model";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class Noteshare {
    @PrimaryGeneratedColumn({name: 'noteshare_id'})
    id: number;

    @Column()
    role: number;

    @Column()
    note: number;

    @Column()
    usuario: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}