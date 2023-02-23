export function ChatListItem() {
  return (
    <div className="chat-list-item">
      <div className="chat-list-item-avatar"></div>
      <div className="chat-list-item-info">
        <p className="chat-list-item-info-name">Name</p>
        <p className="chat-list-item-info-message">Message</p>
      </div>
      <div className="chat-list-item-time">Time</div>
    </div>
  );
}
