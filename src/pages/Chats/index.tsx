
import Chat from "../../components/Chat";
import { ChatListItem } from "../../components/ChatListItem";

export default function Chats() {
  return (
    <>
      <div className="container">
        <div className="chats">
          <div className="chat-header">
            <h2 className="chat-header-info">Chats</h2>
            <div className="chat-header-icons-container">
              <div className="chat-header-icon chat-header-newchat"></div>
              <div className="chat-header-icon chat-header-avatar"></div>
            </div>
          </div>
          <div className="chat-search-container">
            <div className="chat-search">
              <div className="chat-list-search"></div>
              <input
                type="text"
                className="chat-search-input"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="chat-list">
            {new Array(100).fill(0).map((chatListItem, i) => (
              <ChatListItem
                key={i}
                name={"aa"}
                time={"12:03"}
                message={"jxsnsdn"}
              />
            ))}
          </div>
        </div>
        <Chat />
      </div>
    </>
  );
}
