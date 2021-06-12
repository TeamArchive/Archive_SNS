// @TODO : Modify

import { 
	Column,
	JoinColumn,
	JoinTable,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	OneToOne
} from "typeorm";
import { IsNotEmpty } from "class-validator";

import { User } from '../user/user.entity';
import { ChatGroup, Group } from '../group/group.entity';

/**
 * Chat Massage Entity
 */
@Entity({ name: "chat" })
export class Chat {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "writer", length: 36 })
	writer_pk: string;

	@ManyToOne( (type) => User, (user) => user.pk )
	@JoinColumn({ name: "writer" })
	writer: User;

	@Column({ name: "group", length: 36 })
	group_pk: string;

	@ManyToOne( (type) => ChatGroup, (chat_group) => chat_group.chat, 
				{ cascade: true, onDelete: "CASCADE" })
	@JoinColumn({ name: "group" })
	group: Group;

	@Column({ name: "content" })
	content: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}

// @TODO : Notify 분리

// @Entity({ name: "chat_notify" })
// export class ChatNotify {

// 	constructor(listener_pk: string, chat_pk: string) {
// 		this.listener_pk = listener_pk;
// 		this.chat_pk	 = chat_pk;
// 	}

// 	@PrimaryGeneratedColumn("uuid")
// 	pk: string;

// 	@Column({ name: "listener", length: 36 })
// 	listener_pk: string;

// 	@ManyToOne( (type) => Account, (Account) => Account.pk )
// 	@JoinColumn({ name: "listener" })
// 	listener: Account;

// 	@Column({ name: "chat", length: 36 })
// 	chat_pk: string;

// 	@ManyToOne( (type) => ChatMsg, (chat_msg) => chat_msg.pk )
// 	@JoinColumn({ name: "chat" })
// 	chat: ChatMsg;
// }