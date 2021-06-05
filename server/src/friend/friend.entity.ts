// @TODO : Modify

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Account } from "src/account/account.entity";

// @TODO : Import Module

// @TODO : Account -> User

/**
 * Friend Entity
 */

@Entity({ name: "friend" })
export class Friend {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "accept", default: false })
	accept: boolean;

	// < Account >
	// --------------------------------------------------

	@IsNotEmpty()
	@Column({ name: "account", length: 36 })
	account_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "account" })
	account: Account;

	// < Friend >
	// --------------------------------------------------

	@IsNotEmpty()
	@Column({ name: "friend", length: 36 })
	friend_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "friend" })
	friend: Account;

}

// @TODO : Notify 분리

// @Entity({ name: "friend_notify" })
// export class FriendNotify {

// 	constructor(listener_pk: string, friendship: number) {
// 		this.listener_pk = listener_pk;
// 		this.friendship	 = friendship;
// 	}

// 	@PrimaryGeneratedColumn("uuid")
// 	pk: string;

// 	@Column({ name: "listener", length: 36 })
// 	listener_pk: string;

// 	@ManyToOne( (type) => Account, (Account) => Account.pk )
// 	@JoinColumn({ name: "listener" })
// 	listener: Account;

// 	@Column({ name: "friendship" })
// 	friendship: number;

// }

