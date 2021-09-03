import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/post/post.entity";
import { PostRepo } from "../post/post.repo";

import { CommentLike, PostLike } from './like.entity';
import { CommentLikeRepo, PostLikeRepo } from "./like.repo";

abstract class CommonLikeService<
	RepoType extends (PostLikeRepo | CommentLikeRepo),
	EntType extends (PostLike | CommentLike)
> {
	protected like_repo;
	protected target_repo;

	constructor(
		like_repo: RepoType, 
		target_repo: any
	) {
		this.like_repo = like_repo;
		this.target_repo = target_repo;
	}

	public async IsLike(
		giver_pk : string,
		target_pk : string
	) : Promise<boolean> {
		const old_like = await this.like_repo.GetLike(giver_pk, target_pk);
		return old_like ? true : false;
	}

	public async CountLike(
		target_pk : string
	) : Promise<number> {
		return this.like_repo.GetCount(target_pk);
	}

	public async WhoLike(
		target_pk : string,
		limit : number
	) : Promise<number> {
		return this.like_repo.GetWho(target_pk, limit);
	}

	public async ToggleLike(
		giver_pk : string,
		target_pk : string
	) {
		// Get Target Post
		const target = await this.target_repo.findOne(target_pk);

		if(!target)
			return undefined;

		// Find like row which satisfying condition
		const old_like = await this.like_repo.GetLike(giver_pk, target_pk);

		// ( OFF ) If exist row => Delete it 
		if(old_like) 
			await this.like_repo.delete({ pk: old_like.pk});		

		// ( ON ) If not exist => Make new one
		else 
			await this.like_repo.CreateLike(giver_pk, target_pk);

		// Save n_like at Target
		target.n_like = await this.like_repo.GetCount(target_pk);

		return await this.target_repo.save(target)
	}
}

@Injectable()
export class PostLikeService extends CommonLikeService<PostLikeRepo, PostLike>{

	constructor(
		like_repo : PostLikeRepo,
		private post_repo : PostRepo
	) {
		super( like_repo, post_repo );
	}
	
}

@Injectable()
export class CommentLikeService extends CommonLikeService<CommentLikeRepo, CommentLike>{

	constructor(
		like_repo : CommentLikeRepo,
		private post_repo : PostRepo
	) {
		super( like_repo, post_repo );
	}
	
}