import { EntityRepository, Repository } from "typeorm";
import { Post } from './post.entity';
import { PostListDTO } from "./dtos/postList.dto";
import { OwnListDTO } from "./dtos/postOwnList.dto";

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
	public async GetPost( postlistDTO: PostListDTO ) {		
		let order_by_query = ""; 
		switch(postlistDTO.order_by) {
			case 1:
			default:
				order_by_query = "post.createAt";
		}

		return this.createQueryBuilder("post")
			.select(ShortInfoSelect)
			.leftJoinAndSelect("post.writer", "writer")
			.leftJoinAndSelect("post.image", "image")
			.orderBy("post.createdAt", "DESC")
			.skip(0)
			.take(10)
			.getMany();
	}
	
	/**
	 *  Get list that short post information which written by user
	 * 
	 * @param offset 
	 * @param limit 
	 * @param order_by
	 */
	public async GetOwnPost( writer_pk: string, ownListDTO: OwnListDTO ) {
		
		return this.createQueryBuilder("post")
			.select(ShortInfoSelect)
			.where("post.writer_pk = :writer_pk", { writer_pk })
			.orderBy("post.createdAt", "DESC")
			.skip(ownListDTO.offset)
			.take(ownListDTO.limit)
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