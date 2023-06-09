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
      }
    | undefined;
}

export interface ModalProps {
  visible: boolean;
  hide: () => void;
}
