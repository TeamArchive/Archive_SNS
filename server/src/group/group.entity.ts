// @TODO : Modify

import {
	Column,
	Entity, 
	ManyToMany, 
	OneToMany,
	PrimaryGeneratedColumn,
	TableInheritance,
	JoinTable,
	JoinColumn,
	ChildEntity,
	ManyToOne,
	OneToOne
} from "typeorm";
import { IsNotEmpty } from "class-validator";

import { Chat } from '@chat/chat.entity';
import { Account } from "@account/account.entity";

@Entity({ name : "group" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Group {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "title" })
	title: string;

	@OneToMany(
		type => GroupParticipant, 
		(group_participant) => group_participant.participant
	)
	participant: GroupParticipant[];

	@Column({ name: "highest_rank", default: 0 })
	highest_rank: number;

	@Column({ name: "lowest_rank", default: 0 })
	lowest_rank: number;
};

@ChildEntity()
export class ChatGroup extends Group {

	@OneToMany((type) => Chat, (chat: Chat) => chat.group)
	chat: Chat[];

};

@ChildEntity()
export class PostGroup extends Group {
	
	@Column({ name: "is_private" })
	is_private: boolean;

	// @OneToMany((type) => Post, (post) => post.group)
	// post: Post[];

};

@Entity({ name: "group_participant" })
export class GroupParticipant {

	@PrimaryGeneratedColumn("uuid")
	pk: string;
	
	@IsNotEmpty()
	@Column({ name: "participant", length: 36, nullable: false })
	participant_pk: string;

	@ManyToOne((type) => Account, (account:Account) => account.pk, { onDelete: "CASCADE" })
	@JoinColumn({ name: "participant" })
	participant: Account;
 
	@IsNotEmpty()
	@Column({ name: "group", length: 36, nullable: false })
	group_pk: string;

	@ManyToOne((type) => Group, (group) => group.pk, { onDelete: "CASCADE" })
	@JoinColumn({ name: "group" })
	group: Group;

	@Column({ 
		name: "rank", default: 0,
		comment: "high number high rank"
	})
	rank: number;

	@Column({ name: "is_creater", default: false })
	is_creater: boolean

};