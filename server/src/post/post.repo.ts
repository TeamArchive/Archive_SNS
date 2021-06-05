import { EntityRepository, Repository } from "typeorm";
import { Post } from './post.entity';

// @TODO : 
// const OrderCodes = require('../../../shared/PostOrderCodes.json').post;

const ShortInfoSelect = [
	"post.pk",
	"post.title",
	"post.text_content",
	"post.createdAt",
];

@EntityRepository(Post)
export class PostRepo extends Repository<Post> { 
	
	/**
	 *  Get list that short post information
	 * 
	 * @param offset 
	 * @param limit 
	 * @param order_by : order result by ~/shared/OrderCodes.json
	 */
	public async GetPost( offset: number, limit: number, order_by: number ) {

		let order_by_query = "";
		switch(order_by) {
			case 1:
			default:
				order_by_query = "post.createAt";
		}

		return this.createQueryBuilder("post")
			.select(ShortInfoSelect)
			.leftJoinAndSelect("post.writer", "writer")
			.leftJoinAndSelect("post.image", "image")
			.orderBy(order_by_query, "DESC")
			.skip(offset)
			.take(limit)
			.getMany();
	}
	
	/**
	 *  Get list that short post information which written by user
	 * 
	 * @param offset 
	 * @param limit 
	 * @param order_by
	 */
	public async GetOwnPost( writer_pk: string, offset: number, limit: number ) {
		
		return this.createQueryBuilder("post")
			.select(ShortInfoSelect)
			.where("post.writer_pk = :writer_pk", { writer_pk })
			.orderBy("post.createdAt", "DESC")
			.skip(offset)
			.take(limit)
			.getMany();

	}

	/**
	 * Get all infomation of post which got same PK
	 * 
	 * @param post_pk : Post PK
	 */
	public async GetSinglePost(post_pk: string) {
		return this.createQueryBuilder("post")
			.leftJoinAndSelect("post.user", "user")
			.where("post.pk = :post_pk", {post_pk})
			.getOne();
	}

}