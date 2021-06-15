import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Account } from "src/account/account.entity";

@Entity({ name: "friend" })
export class Friend {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "accept", default: false })
	accept: boolean;

	@IsNotEmpty()
	@Column({ name: "account", length: 36 })
	account_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "account" })
	account: Account;

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