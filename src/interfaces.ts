export interface IList {
  convId: number;
  isGroup: boolean | null;
  otherMember: {
    userId: string | null;
    name: string | null;
    image: string | null;
  };
  lastMessage:
    | {
        convId: number | null;
        created_at: string | null;
        id: number;
        senderId: string | null;
        value: string | null;
        type: string | null;
      }
    | undefined;
}

export interface ModalProps {
  visible: boolean;
  hide: () => void;
}

export interface IUser {
  id: string | null;
  name: string | null;
  image: string | null;
}

export interface IConv {
  id: number;
  members:
    | {
        userId: string | null;
      }[]
    | null;
  count: number | null;
}

export interface IMessage {
  convId: number | null;
  created_at: string | null;
  id: number;
  senderId: string | null;
  value: string | null;
  type: string | null;
}
