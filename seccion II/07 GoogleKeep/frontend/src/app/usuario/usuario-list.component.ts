import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { UsuarioModel } from './shared/usuario.model';

@Component({
    selector: 'app-usuario-list',
    imports: [
        CommonModule,
        DatePickerModule,
        FormsModule,
        TableModule
    ],
    templateUrl: './usuario-list.component.html',
})

export class UsuarioListComponent {
    date: Date = new Date();
    dataUsuarios: UsuarioModel[] = [];

    ngOnInit(): void {}
}


