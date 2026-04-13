import { IsBoolean } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "src/usuario/model/usuario.model";
import { Noteshare } from "src/noteshare/model/noteshare.model";

@Entity()
export class Note {
    @PrimaryGeneratedColumn({name: 'note_id'})
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    @IsBoolean()
    activo: boolean;

    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'usuario'})
    usuario: Usuario;

    @OneToMany(() => Noteshare, noteshare => noteshare.note)
    shares: Noteshare[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}