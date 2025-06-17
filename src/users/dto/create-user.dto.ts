import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'John Doe'})
    @IsString()
    name: string;

    @ApiProperty({example: 'cMas_IHS12%d'})
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({example: 'john.doe@example.com'})
    @IsEmail()
    email: string;
}
