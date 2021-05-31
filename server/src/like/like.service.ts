import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/post/post.entity";

import { CommentLike, PostLike } from './like.entity';
import { CommentLikeRepo, PostLikeRepo } from "./like.repo";

class CommonLikeService<
	RepoType extends (PostLikeRepo | CommentLikeRepo),
	EntType extends (PostLike | CommentLike)
> {
	protected like_repo;
	protected target_repo;

	constructor(like_repo: RepoType, target_repo: any) {
		this.like_repo = like_repo;
		this.target_repo = target_repo;
	}

	/**
	 * Check is exist like row which satisfying condition
	 * 
	 * @param giver_pk : giver pk
	 * @param target_pk : target pk
	 */
	public async IsLike(
		giver_pk : string,
		target_pk : string
	) : Promise<boolean> {
		const old_like = this.like_repo.GetLike(giver_pk, target_pk);
		return old_like ? true : false;
	}

	/**
	 * count like number
	 * 
	 * @param target_pk : target PK
	 */
	public async CountLike(
		target_pk : string
	) : Promise<number> {
		return this.like_repo.GetCount(target_pk);
	}

	/**
	 * the list of people who like the target(post, comment ...) things
	 * 
	 * @param target_pk : target PK
	 * @param limit : list limit number
	 */
	public async WhoLike(
		target_pk : string,
		limit : number
	) : Promise<number> {
		return this.like_repo.GetWho(target_pk, limit);
	}

	/**
	 * Like Toggle
	 * 
	 * if giver gave the like before, service will delete which like row
	 * if not, it will create like row
	 * 
	 * @param giver_pk : giver pk
	 * @param post_pk : post pk
	 */
	public async ToggleLike(
		giver_pk : string,
		target_pk : string
	) {
		// Get Target Post
		const target = await this.target_repo.findOne(target_pk);

		if(!target)
			return undefined;

		// Find like row which satisfying condition
		const old_like = this.like_repo.GetLike(giver_pk, target_pk);

		// ( OFF ) If exist row => Delete it 
		if(old_like) 
			this.like_repo.delete({ pk: old_like.pk});

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
		@InjectRepository(PostLike) like_repo : PostLikeRepo,
		@InjectRepository(Post) post_repo : PostRepo
	) {
		super( like_repo, post_repo );
	}
	
}

@Injectable()
export class CommentLikeService extends CommonLikeService<CommentLikeRepo, CommentLike>{

	constructor(
		@InjectRepository(CommentLike) like_repo : CommentLikeRepo,
		@InjectRepository(Post) post_repo : PostRepo
	) {
		super( like_repo, post_repo );
	}
	
}