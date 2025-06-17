import { PartialType } from "@nestjs/swagger";
import { ChainCreateDirectionDto } from "./chain-create-direction.dto";

export class ChainUpdateDirectionDto extends PartialType(ChainCreateDirectionDto) {
    
} 