import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageDTO } from "./../image/image.dto";
import { ProfileImage } from "./../image/image.entity";
import { ProfileImageRepo } from "./../image/image.repo";
import { AccountDTO } from "./dtos/account.dto";
import { Account } from "./account.entity";
import { AccountRepo } from "./account.repo";
import { UpdateAccountDTO } from "./dtos/updateAccount.dto";
import { CreateAccountDTO } from "./dtos/createAccount.dto";

@Injectable()
export class AccountService {
	
	constructor(
		private account_repo: AccountRepo,
		private profile_img_repo: ProfileImageRepo
	) {}

	/**
	 * 계정을 생성한다.
	 * @param account_dto 
	 * @param uploadedFile 
	 * @returns 
	 */
	public async CreateAccount(
		account_dto: CreateAccountDTO,
		uploadedFiles: string[]
	): Promise<Account> 
	{
		const account_entity = CreateAccountDTO.toEntity(account_dto);

        if( uploadedFiles ) {
            const imageDTO = new ImageDTO();
            imageDTO.url = uploadedFiles[0];

			const profileImg_entity = await imageDTO.toEntity() as ProfileImage;
			profileImg_entity.uploader_pk = null;

			const uploadImage_result = await this.profile_img_repo.save(
				profileImg_entity
			);

			account_entity.profile_image_pk = uploadImage_result.pk;
		}
		const account_image_result = await this.account_repo.save(account_entity);
		console.log("Create Account Image Result : ", account_image_result);
		return account_image_result;
	}

	/**
	 * 계정을 수정한다.
	 * @param account_pk 
	 * @param account_dto 
	 * @param uploadedFile 
	 * @returns 
	 */
	public async UpdateAccount(
		account_pk: string,
		account_dto: UpdateAccountDTO,
		uploadedFiles: string[]
	): Promise<Account> 
	{
		const target = { 
			entity : await this.account_repo.findOne({ where: { pk: account_pk } })
		}

		if (target.entity?.pk === account_pk) {
			UpdateAccountDTO.updateEntity(target, account_dto);
			console.log("updateAccount-result : ", target);

			if(uploadedFiles) {
				const imageDTO = new ImageDTO();
				imageDTO.url = uploadedFiles[0];

				const profileImg_entity = await imageDTO.toEntity() as ProfileImage;
				
				target.entity.profile_image_pk = 
					(await this.profile_img_repo.UploadNewImage(profileImg_entity)).pk;
			}

			const result = await this.account_repo.save(target.entity);
			console.log('updateAccount(image)-result : ', result);
			return result;
		}
		
		return null;
	}

	public async GetAccountByPK(
		account_pk: string
	){
		return await this.account_repo.findOne({
			select: [
				"name", "email", "profile_image", "status_msg",
			],
			where: { pk: account_pk },
		});
	}

	public async GetAccountByName(
		target_name: string
	) {
		const [account_list, n_account] = await this.account_repo.findAndCount({
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

	public async DeleteAccount( account )
	{
		return await this.account_repo.delete({ pk: account.pk });
	}

	public async findByIds ( ids: any[] ) {
		return await this.account_repo.findByIds(ids)
	}

	public async findOne ( where: any ) {
		return await this.account_repo.findOne(where);
	}

	public async save( ent: Account ) {
		return await this.account_repo.save(ent);
	}

}