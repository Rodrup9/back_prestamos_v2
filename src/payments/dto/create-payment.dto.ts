import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreatePaymentDto {

    @ApiProperty({example: 2500})
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({example: '2025-03-5 03:02:10.00'})
    @IsDateString()
    payment_date: Date;

    @ApiProperty({example: '87a1c974-9e9d-4aad-9e06-6c101aa42082'})
    @IsUUID()
    loan: string;

    @ApiProperty({example: '87a1c974-9e9d-4aad-9e06-6c101aa42082'})
    @IsUUID()
    payment_method: string;
}
