import { Message } from "./Message";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chat-header-main">
        <div className="chat-header-icon-main"></div>
        <div className="chat-header-info-main">
          <div className="chat-header-info-name-main">Name</div>
          <div className="chat-header-info-status-main">Status</div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="chat-header-icon chat-header-icon-search"></div>
        <div className="chat-header-icon chat-header-icon-menu"></div>
      </div>
      <div className="chat-content">
        <Message isSelf message={"asdfadsfsasf"} time={""} />
        <Message message={"asdfafsasdf"} time={""} isSelf={false} />
        <Message isSelf message={"asgfdxvxxzcc"} time={""} />
        <Message message={"dgsdfrerraw"} time={""} isSelf={false} />
      </div>

      <div className="chat-input">
        <div className="chat-input-icon chat-input-icon-emoji"></div>
        <div className="chat-header-icon chat-input-icon-attachment"></div>

        <div className="message-container">
          <input className="message-input" placeholder="Type a message"></input>
          <div className="chat-header-icon chat-header-icon-icon"></div>
        </div>

        <div className="chat-header-icon chat-header-icon-sent"></div>
      </div>
    </div>
  );
}
