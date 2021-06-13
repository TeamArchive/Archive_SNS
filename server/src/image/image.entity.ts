//@TODO : Modify
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	ChildEntity,
	TableInheritance
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Account } from "../account/account.entity"
import { Post } from "../post/post.entity"

/**
 * Entity which is for saving Image
 */
@Entity({ name: "image" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Image {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "uploader", length: 36, nullable: false })
	uploader_pk: string;

	@ManyToOne((type) => Account, (account) => account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "uploader" })
	uploader: Account;

	@IsNotEmpty()
	@Column({ name: "url" })
	url: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

}

/**
 * Image Entity For which will be use post image
 */
@ChildEntity()
export class PostImage extends Image {

	@IsNotEmpty()
	@Column({ name: "post", length: 36, nullable: false })
	post_pk: string;
	
	@ManyToOne((type) => Post, (Post) => Post.pk, 
		{
			cascade: true,
			onDelete: "CASCADE",
		}
	)
	@JoinColumn({ name: "post" })
	post: Post;
}

/**
 * Image Entity For which will be use profile image
 */
@ChildEntity()
export class ProfileImage extends Image {
	
	@Column({ name: "is_current_use", default: true })
	is_current_use: boolean;

}
