import { Note } from "src/note/model/note.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    filename: string;
    @Column({ nullable: true })
    filetype: string;
    @Column({ nullable: true })
    filesize: number;
    @Column({ type: 'bytea', nullable: true })
    filedata: Buffer;

    @ManyToOne(() => Note, note => note.id)
    @JoinColumn({ name: 'note_id' })
    note: Note;
}