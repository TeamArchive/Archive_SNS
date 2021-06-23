import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Comment, Recomment } from '@comment/comment.entity';

export const enum PostOrder {
	latest = "post.createAt",
}

// < Common Repository > 
// --------------------------------------------------

abstract class CommentRepoImpl<T> extends Repository<T> {}

// < Repositories > 
// --------------------------------------------------

@EntityRepository(Comment)
export class CommentRepo extends CommentRepoImpl<Comment> { 
	
	public async GetComment ( 
		post_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) {
		return this.createQueryBuilder("comment")
			.leftJoinAndSelect("comment.writer", "writer")
			.where("comment.post_pk = :post_pk", { post_pk: post_pk })
			.orderBy(order_by, "DESC")
			.skip(offset)
			.take(limit)
			.getMany();
	}

}

@EntityRepository(Recomment)
export class RecommentRepo extends CommentRepoImpl<Recomment> { 

	public async getList ( 
		comment_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) {
		return this.createQueryBuilder("comment")
			// .select( ParentComment )
			.leftJoinAndSelect("comment.writer", "writer")
			.where("comment.parent_pk = :target_comment_pk", { comment_pk })
			.orderBy(order_by, "DESC")
			.skip(offset)
			.take(limit)
			.getMany();
	}

}
