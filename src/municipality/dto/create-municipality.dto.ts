import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMunicipalityDto {
    @ApiProperty({example: 'Centro'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: '87a1c974-9e9d-4aad-9e06-6c101aa42082'})
    @IsUUID()
    state: string;
}
