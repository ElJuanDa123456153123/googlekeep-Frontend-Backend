import { NoteDto } from "src/note/dto/note.dto";
import { Note } from "src/note/model/note.model";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";
import { Usuario } from "src/usuario/model/usuario.model";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Noteshare {
    @PrimaryGeneratedColumn({name: 'noteshare_id'})
    id: number;

    @Column()
    role: number;

    @ManyToOne(() => Note, data => data.id)
    @JoinColumn({name: 'note'})
    note: Note;

    @ManyToOne(() => Usuario, data => data.id)
    @JoinColumn({name: 'usuario'})
    usuario: Usuario;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}