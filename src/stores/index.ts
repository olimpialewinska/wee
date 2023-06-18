import { ChatListStore } from "./chatList";
import { CurrentChatStore } from "./currentChat";
import { OnlineUsers } from "./onlineUsers";
import { UserStore } from "./user";

export class Store {
  public currentUserStore = new UserStore();
  public chatListStore = new ChatListStore(this);
  public onlineUsersStore = new OnlineUsers();
  public currentChatStore = new CurrentChatStore();

  constructor() {
    this.init();
  }

  private async init() {
    await this.currentUserStore.init();
    await this.chatListStore.getList();
  }
}

export const store = new Store();
