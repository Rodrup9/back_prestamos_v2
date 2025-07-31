import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment_method.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
