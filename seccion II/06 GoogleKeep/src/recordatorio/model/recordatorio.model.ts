import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Note } from "src/note/model/note.model";

@Entity()
export class Recordatorio {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'note_id'})
    note_id: number;

    @Column({name: 'activo', default: true})
    activo: boolean;

    @ManyToOne(() => Note)
    @JoinColumn({name: 'note_id'})
    note: Note;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date;
}
