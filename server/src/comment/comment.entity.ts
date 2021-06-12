import { Account } from 'src/account/account.entity';
import { Post } from 'src/post/post.entity';
import { 
	Entity, 
	ChildEntity,
	TableInheritance,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

// @TODO : Import Modules 

// @TODO : Account -> User 

@Entity({ name: "comment" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Comment {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "file_name" })
	content: string;

	@Column({ default: 0 })
	n_like: number;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@Column({ name: "writer", length: 36 })
	writer_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "writer" })
	writer: Account;
}

@ChildEntity()
export class PostComment extends Comment {

	@Column({ name: "post", length: 36 })
	post_pk: string;

	@ManyToOne((type) => Post, (Post) => Post.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "post" })
	post: Post;
}

@ChildEntity()
export class PostReComment extends Comment {

	// < Parent >
	//	: The comment or re-comment which linking directly with this re-comment

	@Column({ name: "parent", length: 36 })
	parent_pk: string;

	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "parent" })
	parent: Comment;

	// < Root > 
	//	: starting comment (source comemnt) of re-comment

	@Column({ name: "root_pk", length: 36 })
	root_pk: string;

	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "root" })
	root: Comment;

}

// @TODO : Notify 분리

// @Entity({ name: "comment_notify" })
// export class CommentNotify {

// 	constructor(listener_pk: string, comment_pk: string) {
// 		this.listener_pk = listener_pk;
// 		this.comment_pk	 = comment_pk;
// 	}

// 	@PrimaryGeneratedColumn("uuid")
// 	pk: string;

// 	@Column({ name: "listener", length: 36 })
// 	listener_pk: string;

// 	@ManyToOne( (type) => Account, (Account) => Account.pk )
// 	@JoinColumn({ name: "listener" })
// 	listener: Account;

// 	@Column({ name: "comment", length: 36 })
// 	comment_pk: string;

// 	@ManyToOne( (type) => Comment, (_comment) => _comment.pk )
// 	@JoinColumn({ name: "comment" })
// 	comment: Comment;
// }