import {
	EntityRepository, Repository
} from "typeorm";
import { PostImage, ProfileImage } from './image.entity';

@EntityRepository(PostImage)
export class PostImageRepo extends Repository<PostImage> {}

@EntityRepository(ProfileImage)
export class ProfileImageRepo extends Repository<ProfileImage> {

	public async SwitchCurrentUse(uploader_pk: string) {
		
		this.createQueryBuilder().update("image")
			.set({ is_current_use: false })
			.where("uploader_pk.uploader_pk = :uploader_pk", { uploader_pk })
			.andWhere("is_current_use = true")
			.execute();

		
	}

	public async UploadNewImage(entity: ProfileImage) {

		await this.SwitchCurrentUse(entity.uploader_pk);
		return this.save(entity);

	}

}