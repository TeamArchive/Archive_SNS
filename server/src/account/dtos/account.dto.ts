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

export class AccountVO {
	public readonly pk			: string | null;
	public readonly email		: string | null;
	public readonly name		: string | null;
	public readonly profile_image: Image | null;
	public readonly profile_img_url: string | null;
	public readonly status_msg	: string | null;
}

export class AccountDTO {
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
	public profile_image: Image | null;

	@ApiProperty()
	@IsOptional()
	@IsString()
	public status_msg: string | null;

	public static toEntity( accountDTO: AccountDTO ): Account {
		const { 
			email, 
			password, 
			name, 
			profile_image,
			status_msg
		} = accountDTO;

		const new_account = new Account;
		new_account.email = sanitizeHtml(email);
		new_account.name = sanitizeHtml(name);
		new_account.password = sanitizeHtml(password);
		new_account.profile_image = profile_image;
		new_account.status_msg = sanitizeHtml(status_msg);

		return new_account;
	}

	public static updateEntity( 
		target: { entity: Account },  
		accountDTO: AccountDTO
	) {
		const { 
			name,
			password, 
			profile_image, 
			status_msg
		} = accountDTO;

		if(name) 
			target.entity.name = sanitizeHtml(name);
		
		if(password) 
			target.entity.password = sanitizeHtml(password);
		
		if(profile_image)
			target.entity.profile_image = profile_image;

		if(status_msg)
			target.entity.status_msg = sanitizeHtml(status_msg);
	}

}