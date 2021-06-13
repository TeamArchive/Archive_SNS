import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageDTO } from "./../image/image.dto";
import { ProfileImage } from "./../image/image.entity";
import { ProfileImageRepo } from "./../image/image.repo";
import { AccountDTO } from "./account.dto";
import { Account } from "./account.entity";
import { AccountRepo } from "./account.repo";

@Injectable()
export class AccountService {
	
	constructor(
		@InjectRepository(Account) private AccountRepo: AccountRepo,
		private profile_img_repo: ProfileImageRepo
	) { }

	public async CreateAccount(
		account_dto: AccountDTO,
	): Promise<Account> 
	{
		console.log(account_dto);
		const account_entity = AccountDTO.toEntity(account_dto);
		
        if( account_dto.profile_img_url ) {
            const imageDTO = new ImageDTO();
            imageDTO.url = account_dto.profile_img_url;

			const profileImg_entity = await imageDTO.toEntity() as ProfileImage;

			account_entity.profile_image_pk = 
				(await this.profile_img_repo.UploadNewImage(profileImg_entity)).pk;
        }

		return await this.AccountRepo.save(account_entity);
	}

	public async UpdateAccount(
		account_pk: string,
		account_dto: AccountDTO,
		image_dto: ImageDTO | null
	): Promise<Account> 
	{
		const target = { 
			entity : await this.AccountRepo.findOne({ where: { pk: account_pk } })
		}

		if (target.entity?.pk === account_pk) {
			AccountDTO.updateEntity(target, account_dto);

			if(image_dto) {
				const profile_img_ent = image_dto.toEntity() as ProfileImage;
				target.entity.profile_image_pk = 
					(await this.profile_img_repo.UploadNewImage(profile_img_ent)).pk;
			}

			return await this.AccountRepo.save(target.entity);
		}
		
		return null;
	}

	public async GetAccountByPK(
		account_pk: string
	)
	{
		return await this.AccountRepo.findOne({
			select: [
				"name", "email", "profile_image", "status_msg",
			],
			where: { pk: account_pk },
		});
	}

	public async GetAccountByName(
		target_name: string
	) {
		const [account_list, n_account] = await this.AccountRepo.findAndCount({
			select: [
				"pk", "name", "email", "profile_image", "status_msg"
			],
			where: { name: target_name }
		});

		return { 
			account_list : account_list, 
			n : n_account 
		};
	}

	public async DeleteAccount(
		account
	): Promise<boolean>
	{
		const target = await this.AccountRepo.findOne({
			select: ["password"],
			where: { pk: account.pk },
		});

		if ( target ) {
			const is_pw_match = await target.checkPassword (account.password);

			if(is_pw_match) {
				await this.AccountRepo.delete({ pk: account.pk });
				return true;
			}
		}
		
		return false;
	}
}