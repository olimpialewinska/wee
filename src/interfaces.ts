export interface Data {
  id: number;
  name: string | null;
  lastMessage: {
    id: number;
    value: string | null;
    createdAt: string | null;
  } | null;
  otherUserId: string | null | undefined;
  image: string;
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
