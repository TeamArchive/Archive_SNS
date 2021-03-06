import {
	Entity,

	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,

	OneToOne,
	OneToMany,
	JoinColumn,
	ManyToOne,

} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { PostImage } from "@image/image.entity";
import { Account } from "@account/account.entity";
import { PostGroup } from "@group/group.entity";

@Entity({ name: "post" })
export class Post {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "title" })
	title: string;

	@IsNotEmpty()
	@Column({ name: "text_content", default: "" })
	text_content: string;

	@IsNotEmpty()
	@Column({ name: "writer", length: 36, nullable: false })
	writer_pk: string;

	@ManyToOne((type) => Account, (account) => account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "writer" })
	writer: Account;

	@OneToMany((type) => PostImage, (PostImage) => PostImage.post)
	image: PostImage[];

	@Column({ default: 0 })
	n_like: number;

	@Column({ default: 0 })
	view: number;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@Column({
		default: 0,
		comment: "popularly score"
	})
	q_score: number;

	@Column({ name: "group", length: 36, nullable: true })
	group_pk: string;

	@ManyToOne(
		(type) => PostGroup,
		(post_group: PostGroup) => post_group.post,
		{ cascade: true, onDelete: "CASCADE" }
	)
	@JoinColumn({ name: "group" })
	group: PostGroup;

}

