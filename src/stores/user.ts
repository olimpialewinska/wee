import { IList, IUser } from "@/interfaces";
import { getData, getImage, getName } from "@/utils/chatList/getChatList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { makeObservable, observable } from "mobx";

export class UserStore {
  public currentUserStore: IUser = {
    id: "",
    name: "",
    image: "",
  };

  constructor() {
    makeObservable(this, {
      currentUserStore: observable,
    });
  }

  public async init() {
    const supabase = createClientComponentClient();
    const { data } = await supabase.auth.getUser();
    const image = await getImage(data.user!.id);

    this.currentUserStore = {
      id: data.user!.id,
      name: await getName(data.user!.id),
      image: image?.data.publicUrl || null,
    };
  }
}
