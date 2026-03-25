import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class ProductoDto {
    @IsOptional()
    id?: number;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    nombre: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(255)
    descripcion: string;
    
    @IsNumber()
    @Min(0.01)
    precio: number;
    
    @IsInt()
    @Min(0)
    stock: number;
    
    @IsBoolean()
    activo: boolean;
}