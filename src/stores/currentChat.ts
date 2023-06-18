import { IList } from "@/interfaces";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { makeObservable, observable } from "mobx";

export class CurrentChatStore {
  public currentChatStore: IList | null = null;

  constructor() {
    makeObservable(this, {
      currentChatStore: observable,
    });
  }

  public setCurrentChat(chat: IList | null) {
    this.currentChatStore = chat;
  }
}
