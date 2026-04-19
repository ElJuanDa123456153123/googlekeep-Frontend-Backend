import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePickerModule } from "primeng/datepicker";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { BasicService } from "@/app/service/basic.service";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { UsuarioModel } from "../shared/usuario.model";

@Component({
    selector: 'app-usuario',
    standalone: true,
    imports: [
        CommonModule,
        DatePickerModule,
        FormsModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        // ToastModule
        DialogModule,
        InputTextModule
    ],
    providers: [
        BasicService
    ],
    templateUrl: './usuario.component.html',
})
export class UsuarioComponent {
    http = inject(BasicService);
    visible = signal<boolean>(false);
    entity = signal<UsuarioModel>(new UsuarioModel());
    visibleEliminar = signal<boolean>(false);
    entityToDelete = signal<UsuarioModel | null>(null);
    @Output() messageEvent = new EventEmitter<boolean>();

    load(usuario?: UsuarioModel) {
        if (usuario) {
            // Crear una COPIA del objeto para no modificar el original en la tabla
            this.entity.set({...usuario});
        } else {
            this.entity.set(new UsuarioModel());
        }
        this.onDialogVisibleChange(true);
    }

    saveMethod() {
        // Solo enviar las propiedades que acepta el DTO del backend
        const dataToSend = {
            id: this.entity().id,
            name: this.entity().name,
            email: this.entity().email,
            password: this.entity().password
        };

        // Si es edición y el password está vacío, NO enviarlo
        if (dataToSend.id && (!dataToSend.password || dataToSend.password.trim() === '')) {
            delete dataToSend.password;
        }

        console.warn('Data a enviar:', dataToSend);

        this.http.basePost('usuariocontroller/save', dataToSend).subscribe(
            response => {
                console.warn('Save response', response);
                this.closeDialog();
                this.messageEvent.emit(true);
            },
            error => {
                console.error('Error:', error);
            }
        )
    }

    loadEliminar(usuario: UsuarioModel) {
        this.entityToDelete.set(usuario);
        this.visibleEliminar.set(true);
    }

    confirmarEliminar() {
        if (this.entityToDelete()) {
            this.http.baseDelete(`usuariocontroller/delete/${this.entityToDelete()!.id}`).subscribe(
                response => {
                    console.log('Usuario eliminado', response);
                    this.closeDialogEliminar();
                    this.messageEvent.emit(true);
                },
                error => console.error('Error al eliminar', error)
            );
        }
    }

    closeDialogEliminar() {
        this.visibleEliminar.set(false);
        this.entityToDelete.set(null);
    }


    saveChanges() {
        // save entity or update entity
    }

    onDialogVisibleChange(value: boolean): void {
        this.visible.set(value);
    }

    closeDialog(): void {
        this.visible.set(false);
    }
}