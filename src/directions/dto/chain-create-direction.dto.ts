import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ChainCreateLocalityDto } from "src/localities/dto";

export class ChainCreateDirectionDto {
    @ApiProperty({example: 'Manzano 2'})
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({example: '860222'})
    @IsString()
    @IsNotEmpty()
    postal_code: string;

    @ApiPropertyOptional({example: 'A501'})
    @IsString()
    @IsOptional()
    external_number?: string;

    @ApiPropertyOptional({example: '201'})
    @IsString()
    @IsOptional()
    internal_number?: string;

    @ApiPropertyOptional({type: ChainCreateLocalityDto})
    @ValidateNested()
    @Type(() => ChainCreateLocalityDto)
    locality: ChainCreateLocalityDto;
}