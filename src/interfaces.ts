export interface Data {
  color: any;
  bgColor: any;
  isGroup: boolean;
  id: number;
  name: string | null;
  lastMessage: {
    id: number;
    value: string | null;
    createdAt: string | null;
  } | null;
  otherUserId: string | null | undefined;
  otherUserImage: string | null | undefined;
  otherUserName: string | null | undefined;
}
[];

export interface MessageInterface {
  id: number;
  conversation_id : number | null;
  value: string | null;
  sender: string | null;
  receiver: string | null;
  created_at: string | null;
}

export interface Profile{
  id: string;
  username: string | null;
  avatar_url: string | null;
  name: string | null;
  lastName: string | null
}
