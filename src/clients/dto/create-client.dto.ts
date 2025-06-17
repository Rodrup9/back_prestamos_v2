import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { ChainCreateDirectionDto } from "src/directions/dto";

export class CreateClientDto {
    @ApiProperty({example: 'Ezra'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'Miller'})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({example: 'Watts'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    maternal_last_name?: string;

    @ApiProperty({example: 'HEGG560427MVZRRL05'})
    @IsString()
    @IsNotEmpty()    
    curp: string;

    @ApiProperty({example: '2025-03-12'})
    @IsDateString()
    birth_date: Date;

    @ApiProperty({type: ChainCreateDirectionDto})
    @ValidateNested()
    @Type(() => ChainCreateDirectionDto)
    direction: ChainCreateDirectionDto;

    @ApiProperty({example: '21ab81c5-8463-4298-a925-4344ca63d03e'})
    @IsUUID()
    lender: string;
}
