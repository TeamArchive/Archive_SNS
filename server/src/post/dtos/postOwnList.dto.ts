import { 
    IsNotEmpty, Length, IsEmail, IsString, IsOptional 
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const MIN_OFFSET_LEN = 1;
const MAX_OFFSET_LEN = 64;

const MIN_LIMIT_LEN = 1;
const MAX_LIMIT_LEN = 64;

export class OwnListDTO {

	@ApiProperty()
	@Length(MIN_OFFSET_LEN, MAX_OFFSET_LEN)
	public offset: number;

	@ApiProperty()
	@Length(MIN_LIMIT_LEN, MAX_LIMIT_LEN)
	public limit: number;

}