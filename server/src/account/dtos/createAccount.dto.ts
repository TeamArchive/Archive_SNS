import { 
    IsNotEmpty, Length, IsEmail, IsString, IsOptional 
} from "class-validator";
import { Image } from "../../image/image.entity";
import sanitizeHtml from 'sanitize-html';
import { Account } from "../account.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Length constants
 */
const MIN_PW_LEN = 1;
const MAX_PW_LEN = 64;

const MIN_EMAIL_LEN = 1;
const MAX_EMAIL_LEN = 64;

const MIN_NAME_LEN = 1;
const MAX_NAME_LEN = 64;

export class CreateAccountDTO {
	@ApiProperty()
	@Length(MIN_EMAIL_LEN, MAX_EMAIL_LEN)
	// @IsEmail()
	public email: string;

	@ApiProperty()
	@Length(MIN_PW_LEN, MAX_PW_LEN)
	@IsString()
	public password: string;

	@ApiProperty()
	@Length(MIN_NAME_LEN, MAX_NAME_LEN)
	@IsOptional()
	@IsString()
	public name: string | null;

	@ApiProperty()
	@IsOptional()
	@IsString()
	public status_msg: string | null;

	public static toEntity( accountDTO: CreateAccountDTO ): Account {
		const { 
			email, 
			password, 
			name, 
			status_msg
		} = accountDTO;

		const new_account = new Account;
		new_account.email = sanitizeHtml(email);
		new_account.name = sanitizeHtml(name);
		new_account.password = sanitizeHtml(password);
		new_account.status_msg = sanitizeHtml(status_msg);

		return new_account;
	}

}