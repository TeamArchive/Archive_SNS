import { EntityRepository, Repository } from "typeorm";
import { Chat } from './chat.entity';

@EntityRepository(Chat)
export class ChatRepo extends Repository<Chat> {
	
}

