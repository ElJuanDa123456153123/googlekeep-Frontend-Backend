import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonModel } from './person.model';

@Controller('personcontroller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('getall')
  getAll() {
    return this.appService.getAll();
  }

  // *************************************
  // Implementar los metodos CRUD en 
  // base a la lista 
  // que retorna el servicio
  // *************************************
  //Crear
  //Leer
  //Actualizar
  //Eliminar




  @Get('getperson')
  getPerson() {
    var data = new PersonModel();
    data.id = 1;
    data.name = 'Pedro';
    data.age = 20;
    return data;
  }

  // @Post('saveperson')
  // savePerson(@Body() data: any) {
  //   return 'Se guardo correctamente!!!';
  // }

  // @Post('updateperson/:id')
  // updatePerson(@Param('id') id: number, @Body() data: any) {
  //   return 'Se actualizo correctamente!!!';
  // }

  @Post('saveorupdateperson')
  saveOrUpdatePerson(@Body() data: any) {
    if(data.id != 0) {
      //actualizar
    }
    else {
      //guardar
    }
    return 'Se guardo correctamente!!!';
  }

  //Crear un metodo que retorne la edad de Pedro
  @Get('getage')
  getAge() {
    return 20;
  }
}
