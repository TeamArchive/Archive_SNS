import { 
    IsNotEmpty, Length, IsEmail, IsString, IsOptional 
} from "class-validator";
import { Image } from "../image/image.entity";
import sanitizeHtml from 'sanitize-html';
import { Account } from "./account.entity";

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
	public readonly status_msg	: string | null;
}

export class AccountDTO {

	@Length(MIN_EMAIL_LEN, MAX_EMAIL_LEN)
	// @IsEmail()
	public email: string;

	@Length(MIN_PW_LEN, MAX_PW_LEN)
	@IsString()
	public password: string;

	@Length(MIN_NAME_LEN, MAX_NAME_LEN)
	@IsOptional()
	@IsString()
	public name: string | null;
	
	public profile_image: Image | null;

	@IsOptional()
	@IsString()
	public status_msg: string | null;

	public toEntity(): Account {
		const { 
			email, 
			password, 
			name, 
			profile_image, 
			status_msg
		} = this;

		const new_account = new Account();
		new_account.name = sanitizeHtml(name);
		new_account.email = sanitizeHtml(email);
		new_account.password = sanitizeHtml(password);
		new_account.profile_image = profile_image;
		new_account.status_msg = sanitizeHtml(status_msg);

		return new_account;
	}

	public updateEntity( target: { entity: Account } ) {
		const { 
			password,
			name, 
			profile_image, 
			status_msg
		} = this;

		if(password) 
			target.entity.password = sanitizeHtml(password);
		
		if(name) 
			target.entity.name = sanitizeHtml(name);
		
		if(profile_image)
			target.entity.profile_image = profile_image;

		if(status_msg)
			target.entity.status_msg = sanitizeHtml(target.entity.status_msg);
	}

	public fromJson(json) {
		const { 
			email, 
			password, 
			name, 
			profile_image, 
			status_msg
		} = json

		this.name = sanitizeHtml(name);
		this.email = sanitizeHtml(email);
		this.password = sanitizeHtml(password);
		this.profile_image = profile_image;
		this.status_msg = sanitizeHtml(status_msg);
	}
}

export class AccountBuilder {	

	private dto: AccountDTO;

	constructor() { 
		this.dto = new AccountDTO(); 
	}
	
	Email(x: string) {
		this.dto.email = x;
		return this;
	}

	Password(x: string) {
		this.dto.password = x;
		return this;
	}

	Name(x: string) {
		this.dto.name = x;
		return this;
	}

	ProfileImage(x: Image) {
		this.dto.profile_image = x;
		return this;
	}

	StatusMsg(x: string) {
		this.dto.status_msg = x;
		return this;
	}
	
	build() { 
		return this.dto; 
	}

}
