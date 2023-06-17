import { RealtimePresenceState } from "@supabase/supabase-js";

export function checkPresence(
  userId: string | null,
  otherMemberId: string | null | undefined,
  onlineUsers: RealtimePresenceState | undefined
) {
  console.log("checkPresence", userId, otherMemberId, onlineUsers);
  if (otherMemberId === userId) {
    return true;
  }

  if (otherMemberId === null) {
    return false;
  }

  if (onlineUsers?.[`${otherMemberId}`]) {
    return true;
  }

  return false;
}
