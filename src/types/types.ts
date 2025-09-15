export interface TelegramUpdate {
	update_id: number;
	message?: Message;
	edited_message?: Message;
	my_chat_member?: ChatMemberUpdated;
	chat_member?: ChatMemberUpdated;
}

export interface Message {
	message_id: number;
	from?: User;
	sender_chat?: Chat;
	chat: Chat;
	date: number;
	text?: string;
	new_chat_members?: User[];
	left_chat_member?: User;
}

export interface User {
	id: number;
	is_bot: boolean;
	first_name: string;
	username?: string;
	language_code?: string;
}

export interface Chat {
	id: number;
	type: "private" | "group" | "supergroup" | "channel";
	title?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
}

export interface ChatMemberUpdated {
	chat: Chat;
	from: User;
	date: number;
	old_chat_member: ChatMember;
	new_chat_member: ChatMember;
}

export interface ChatMember {
	user: User;
	status:
		| "creator"
		| "administrator"
		| "member"
		| "restricted"
		| "left"
		| "kicked";
}
