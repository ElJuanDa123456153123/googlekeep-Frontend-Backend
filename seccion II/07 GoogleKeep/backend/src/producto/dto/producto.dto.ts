import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsInt, Min, MaxLength, MinLength } from "class-validator";

export class ProductoDto {

    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    descripcion: string;

    @IsOptional()
    @IsNumber()
    @Min(0.01)
    precio: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsBoolean()
    activo: boolean;
}