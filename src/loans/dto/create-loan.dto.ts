import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreateLoanDto {

    @ApiProperty({example: 40000})
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({example: '2025-03-02'})
    @IsDateString()
    start_date: Date;

    @ApiProperty({description: 'En meses', example: 3})
    @IsNumber()
    @IsPositive()
    payment_interval: number;

    @ApiProperty({example: 500})
    @IsNumber()
    @IsPositive()
    minimum_payment: number;
    
    @ApiProperty({example: '2022-03-07'})
    @IsDateString()
    end_date: Date;
    
    @ApiProperty({description: 'Porcentaje', example: 35})
    @IsNumber()
    @IsPositive()
    interest_rate: number;

    @ApiProperty({example: '87a1c974-9e9d-4aad-9e06-6c101aa42082'})
    @IsUUID()
    lender: string;

    @ApiProperty({example: '87a1c974-9e9d-4aad-9e06-6c101aa42082'})
    @IsUUID()
    client: string;

    // @OneToOne(() => Contract, con => con.loan)
    // @JoinApiProperty()
    // contract: Contract;
}
