import { PartialType } from "@nestjs/swagger";
import { ChainCreateLocalityDto } from "./chain-create-locality.dto";

export class ChainUpdateLocalityDto extends PartialType(ChainCreateLocalityDto) {
    
}