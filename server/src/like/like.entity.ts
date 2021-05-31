// @TODO : Modify

import { 
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	CreateDateColumn,
	ManyToOne
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Comment } from '../comment/comment.entity';
import { Post } from '../post/post.entity';

// @TODO : Import Module
// @TODO : Account -> User
// @TODO : Like 통합

abstract class Like {
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "giver_pk", length: 36 })
	giver_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "giver" })
	giver: Account;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}

@Entity({ name: "post_like" })
export class PostLike extends Like {
	@Column({ name: "post_pk", length: 36 })
	post_pk: string;

	@ManyToOne((type) => Post, (Post) => Post.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "post" })
	post: Post;
}

@Entity({ name: "comment_like" })
export class CommentLike extends Like {
	@Column({ name: "comment_pk", length: 36 })
	comment_pk: string;

	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "comment" })
	comment: Comment;
}