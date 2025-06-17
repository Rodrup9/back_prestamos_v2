import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class ChainCreateLocalityDto {
    @ApiPropertyOptional({example: 'Parrilla'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({example: '87a1c974-9e9d-4aad-9e06-6c101aa42082'})
    @IsUUID()
    @IsOptional()
    city: string;

    @ApiPropertyOptional({example: '21ab81c5-8463-4298-a925-4344ca63d03e'})
    @IsUUID()
    @IsOptional()
    locality: string;
}