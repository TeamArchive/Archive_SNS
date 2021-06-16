import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Comment, ParentComment, ChildComment } from '@comment/comment.entity';

export const enum PostOrder {
	latest = "post.createAt",
}

// < Common Repository > 
// --------------------------------------------------

class CommonCommentRepo<T> extends Repository<T> {}

// < Repositories > 
// --------------------------------------------------

@EntityRepository(Comment)
export class CommentRepo extends CommonCommentRepo<Comment> { }


@EntityRepository(ParentComment)
export class ParentCommentRepo extends CommonCommentRepo<ParentComment> { 
	
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

@EntityRepository(ChildComment)
export class ChildCommentRepo extends CommonCommentRepo<ChildComment> { 

	public async GetComment ( 
		target_comment_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) {
		return this.createQueryBuilder("comment")
			// .select( ParentComment )
			.leftJoinAndSelect("comment.writer", "writer")
			.where("comment.root_pk = :target_comment_pk", { target_comment_pk })
			.orderBy(order_by, "DESC")
			.skip(offset)
			.take(limit)
			.getMany();
	}

}
