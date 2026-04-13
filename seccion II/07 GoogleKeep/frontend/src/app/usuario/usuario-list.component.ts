import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-usuario',
    imports: [
        CommonModule,
        DatePickerModule,
        FormsModule,
        TableModule
    ],
    templateUrl: './usuario-list.component.html',
})

export class UsuarioComponent {
    date: Date = new Date();
    dataUsuarios: any[] = [];
}


