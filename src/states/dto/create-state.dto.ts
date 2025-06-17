import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStateDto {
    @ApiProperty({example: 'Tabasco'})
    @IsString()
    @IsNotEmpty()
    name: string;

}
