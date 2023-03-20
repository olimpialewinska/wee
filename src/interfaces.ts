
export interface User{
    name: string;
    email: string;
    phone: string;
    bio: string;
    password: string;
    img: string;
}

export default interface Data{
  isSelf: boolean;
    id: number;
      name: string | null;
      lastMessage: {
          id: number;
          value: string | null | undefined;
          createdAt: string | null;
      } | null;
      otherUserId: string | null | undefined;
      image: string;
  }

export default interface MessageInterface {
    id: number;
    value: string | null;
    sender: string | null;
    receiver: string | null;
    created_at: string | null;
    status: boolean | null;
    time: string | null;
  };