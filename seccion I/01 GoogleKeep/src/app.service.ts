import { Injectable } from '@nestjs/common';
import { PersonModel } from './person.model';

@Injectable()
export class AppService {
  database: PersonModel[] = [
    {id: 1, name: 'Pedro', age: 20},
    {id: 2, name: 'Maria', age: 25},
    {id: 3, name: 'Juan', age: 30}
  ];
  getHello(): string {
    return 'Hello World!';
  }

  getAll() {
    return this.database;
  }

  save(data: PersonModel) {
    if(data.id != undefined && data.id != 0) {
      
      const index = this.database.findIndex(person => person.id === data.id);
      this.database[index] = data;
    } else {
      const newId = Math.max(...this.database.map(p => p.id)) + 1;
      data.id = newId;
      this.database.push(data);
    }
  }
}
