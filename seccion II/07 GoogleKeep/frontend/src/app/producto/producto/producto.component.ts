import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { BasicService } from "../../service/basic.service";
import { ProductoModel } from "../shared/producto.model";

@Component({
    selector: 'app-producto',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule
    ],
    providers: [BasicService],
    templateUrl: './producto.component.html',
})
export class ProductoComponent {
    http = inject(BasicService);
    visible = signal<boolean>(false);
    entity = signal<ProductoModel>(new ProductoModel());
    visibleEliminar = signal<boolean>(false);
    entityToDelete = signal<ProductoModel | null>(null);

    @Output() messageEvent = new EventEmitter<boolean>();

    load(producto?: ProductoModel) {
        if (producto) {
            this.entity.set({ ...producto });
        } else {
            this.entity.set(new ProductoModel());
        }
        this.visible.set(true);
    }

    saveMethod() {
        const dataToSend: any = {
            nombre: this.entity().nombre,
            descripcion: this.entity().descripcion,
            precio: Number(this.entity().precio),   // ← convierte a número
            stock: Number(this.entity().stock),     // ← convierte a número
        };

        // Solo incluir id si es edición
        if (this.entity().id) {
            dataToSend.id = this.entity().id;
        }

        // ← LOGS para ver qué se envía
        console.log('Datos a enviar:', JSON.stringify(dataToSend));

        this.http.basePost('productoController/createorupdate', dataToSend).subscribe(
            response => {
                console.warn('Save response', response);
                this.closeDialog();
                this.messageEvent.emit(true);
            },
            error => {
                console.error('Error:', error);
                console.error('Mensaje del servidor:', error.error); // ← mensaje exacto
            }
        );
    }

    loadEliminar(producto: ProductoModel) {
        this.entityToDelete.set(producto);
        this.visibleEliminar.set(true);
    }

    confirmarEliminar() {
        if (this.entityToDelete()) {
            this.http.baseDelete(`productoController/delete/${this.entityToDelete()!.id}`).subscribe(
                response => {
                    console.log('Producto eliminado', response);
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

    closeDialog() {
        this.visible.set(false);
    }
}