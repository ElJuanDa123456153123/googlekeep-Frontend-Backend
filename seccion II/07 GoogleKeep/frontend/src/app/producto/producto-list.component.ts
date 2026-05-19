import { CommonModule } from "@angular/common";
import { Component, afterNextRender, inject, signal, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { BasicService } from "../service/basic.service";
import { ProductoComponent } from "./producto/producto.component";
import { ProductoModel } from "./shared/producto.model";

@Component({
    selector: 'app-producto-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        ProductoComponent
    ],
    providers: [ConfirmationService, BasicService],
    templateUrl: './producto-list.component.html',
})
export class ProductoListComponent {
    @ViewChild(ProductoComponent) productoComponent!: ProductoComponent;

    dataProductos = signal<ProductoModel[]>([]);
    service = inject(BasicService);
    private confirmationService = inject(ConfirmationService);

    constructor() {
        afterNextRender(() => {
            this.loadProductos();
        });
    }

    loadProductos() {
        this.service.baseGet('productoController/getall').subscribe(
            (response: ProductoModel[]) => {
                console.warn('Productos', response);
                this.dataProductos.set(response);
            },
            error => console.error(error)
        );
    }

    createProducto() {
        this.productoComponent.load();
    }

    updateProducto(data: ProductoModel) {
        this.productoComponent.load(data);
    }

    deleteProducto(data: ProductoModel) {
        this.productoComponent.loadEliminar(data);
    }
}