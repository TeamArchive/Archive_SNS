import {
	EntityRepository, Repository
} from "typeorm";
import { CommentLike, PostLike } from './like.entity';

@EntityRepository(PostLike)
export class PostLikeRepo extends Repository<PostLike> { 

	public async CreateLike(
		giver_pk: string,
		target_pk: string
	) : Promise<PostLike> 
	{
		const new_like = new PostLike;
		new_like.giver_pk = giver_pk;
		new_like.post_pk = target_pk;
		
		return await this.save(new_like);
	}

	public async GetLike(
		giver_pk: string,
		target_pk: string,
	) : Promise<PostLike> 
	{
		return this.createQueryBuilder("PostLike")
			.where("post_pk = :target_pk", {target_pk})
			.andWhere("giver_pk = :giver_pk", {giver_pk})
			.getOne();
	}

	public async GetCount(target_pk: string) {
		return super.count({
			where: { post_pk: target_pk }
		});
	}

	public async GetWho(target_pk: string, limit: number) {
		return super.createQueryBuilder("PostLike")
			.where("post_pk = :target_pk", {target_pk})
			.orderBy("like.createdAt", "DESC")
			.take(limit)
			.getMany();
	}

}

@EntityRepository(CommentLike)
export class CommentLikeRepo extends Repository<CommentLike> { 

	public async CreateLike(
		giver_pk: string,
		target_pk: string
	) : Promise<CommentLike> 
	{
		const new_like = new CommentLike;
		new_like.giver_pk = giver_pk;
		new_like.comment_pk = target_pk;
		
		return await this.save(new_like);
	}

	public async GetLike(
		giver_pk: string,
		target_pk: string,
	) : Promise<CommentLike> 
	{
		return this.createQueryBuilder("PostLike")
			.where("comment_pk = :target_pk", {target_pk})
			.andWhere("giver_pk = :giver_pk", {giver_pk})
			.getOne();
	}

	public async GetCount(target_pk: string) {
		return super.count({
			where: { comment_pk: target_pk }
		});
	}

	public async GetWho(target_pk: string, limit: number) {
		return super.createQueryBuilder("PostLike")
			.select('giver')
			.where("comment_pk = :target_pk", {target_pk})
			.orderBy("like.createdAt", "DESC")
			.take(limit)
			.getMany();
	}

}