import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Post } from './post.entity';
import { PostRepo } from './post.repo';
import { PostDTO } from './dtos/post.dto';
import { PostListDTO } from "./dtos/postList.dto";
import { OwnListDTO } from "./dtos/postOwnList.dto";

import { Image } from '@image/image.entity';
import { PostImage } from '@image/image.entity';
import { PostImageRepo } from '@image/image.repo';
import { ImageDTO } from '@image/image.dto';

import { PostGroupService } from "@group/group.service";
import { GroupParticipantDTO } from "@group/group.dto";

@Injectable()
export class PostService {

	constructor(
		private postRepo: PostRepo,
		private postImageRepo: PostImageRepo,
		private groupService: PostGroupService
	) { }

	public async CreatePost(
		writer_pk: string,
		post_dto: PostDTO,
		img_dto: ImageDTO[]
	): Promise<Post | Number> {

		if (post_dto.group_pk) {

			const participant = await this.groupService.isParticipant(
				{
					participant_pk: writer_pk,
					group_pk: post_dto.group_pk
				} as GroupParticipantDTO
			)

			if (!participant)
				return 403;
		}

		const post_ent = PostDTO.toEntity(post_dto);
		post_ent.writer_pk = writer_pk;

		const result = await this.postRepo.save(post_ent);

		img_dto.map(async elem => {
			const new_img = elem.toEntity() as PostImage;
			new_img.uploader_pk = writer_pk;
			new_img.post = result;

			await this.postImageRepo.save(new_img);
		});

		return result;
	}

	public async UpdatePost(
		writer_pk: string,
		post_pk: string,
		post_dto: PostDTO | null,
		new_img_dto: ImageDTO[] | null,
		del_img_list: string[] | null,
	): Promise<Post | null> {

		const target = {
			entity: await this.postRepo.findOne({ where: { pk: post_pk } })
		}

		if (target.entity?.writer_pk === writer_pk) {

			PostDTO.updateEntity(target, post_dto);

			await this.postRepo.save(target.entity);

			await this.postImageRepo.delete(del_img_list);

			new_img_dto?.forEach(async elem => {
				const img_ent = elem.toEntity() as PostImage;
				img_ent.uploader_pk = writer_pk;

				img_ent.post = target.entity;

				await this.postImageRepo.save(img_ent);
			});

			return target.entity;
		}

		return null;
	}

	public async DeletePost(
		writer_pk: string,
		post_pk: string
	): Promise<boolean> {
		const target = await this.postRepo.findOne({ where: { pk: post_pk } });

		if (target.writer_pk === writer_pk) {
			await this.postRepo.delete({ pk: target.pk });
			return true;
		}

		return false;
	}

	public async GetSinglePost(
		post_pk: string
	): Promise<Post> {
		return await this.postRepo.findOne({ where: { pk: post_pk } });
	}

	public async GetPostList(
		postlistDTO: PostListDTO,
	): Promise<Post[]> {
		return await this.postRepo.GetPost(
			postlistDTO
		);
	}

	public async GetGroupList(
		group_pk: string,
		ownListDTO: OwnListDTO
	): Promise<Post[]> {

		return await this.postRepo.GetGroupPost(
			group_pk,
			ownListDTO
		);
	}

	public async GetOwnPost(
		writer_pk: string,
		ownListDTO: OwnListDTO
	): Promise<Post[]> {
		return await this.postRepo.GetOwnPost(
			writer_pk,
			ownListDTO
		);
	}

}