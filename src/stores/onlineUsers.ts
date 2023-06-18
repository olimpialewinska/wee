import { RealtimePresence, RealtimePresenceState } from "@supabase/supabase-js";
import { makeObservable, observable } from "mobx";
import { store } from "@/stores";

export class OnlineUsers {
  public onlineUsers: RealtimePresenceState<{}> = {};

  constructor() {
    makeObservable(this, {
      onlineUsers: observable,
    });
  }

  public checkOnline(otherMemberId: string | null | undefined) {
    const { onlineUsers } = store.onlineUsersStore;
    const { currentUserStore } = store.currentUserStore;

    const userId = currentUserStore.id;

    if (otherMemberId === userId) {
      return true;
    }

    if (otherMemberId === null) {
      return false;
    }

    if (onlineUsers?.[`${otherMemberId}`]) {
      return true;
    }
  }
}
