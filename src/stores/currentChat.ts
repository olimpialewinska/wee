import { IList } from "@/interfaces";
import { makeObservable, observable } from "mobx";

export class CurrentChatStore {
  public currentChatStore: IList | null = null;
  public currentChatColor: string | null = null;
  public currentChatBgColor: string | null = null;

  constructor() {
    makeObservable(this, {
      currentChatStore: observable,
      currentChatColor: observable,
      currentChatBgColor: observable,
    });
  }

  public setCurrentChat(chat: IList | null) {
    this.currentChatStore = chat;
  }
}
