import { IList } from "@/interfaces";
import { getData } from "@/utils/chatList/getChatList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { computed, makeObservable, observable } from "mobx";
import { Store, store } from ".";

export class ChatListStore {
  public chatList: IList[] = [];

  public search: string = "";

  constructor(private store: Store) {
    makeObservable(this, {
      chatList: observable,
      search: observable,
      filteredList: computed,
    });
  }

  public async getList() {
    this.chatList = await getData(
      this.store.currentUserStore.currentUserStore.id!
    );
  }

  public get filteredList() {
    return this.chatList.filter((item: IList) => {
      return (
        item.otherMember.name &&
        item.otherMember.name.toLowerCase().includes(this.search.toLowerCase())
      );
    });
  }
}
