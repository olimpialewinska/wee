import {Chat} from "@/components/Desktop/Chat";
import { ChatListItem } from "@/components/ChatListItem";
import { Avatar, ChatHeader, ChatList, ChatHeaderIconsContainer, ChatHeaderInfo, ChatListSearch, Chats, ChatSearch, ChatSearchContainer, ChatSearchInput, Container, NewChat } from "./style";

export function ChatListView(){
    return(
        <Container>
            <Chats>
                <ChatHeader>
                    <ChatHeaderInfo>Chats</ChatHeaderInfo>
                    <ChatHeaderIconsContainer>
                        <NewChat/>
                        <Avatar/>
                    </ChatHeaderIconsContainer>
                </ChatHeader>
                <ChatSearchContainer>
                    <ChatSearch>
                        <ChatListSearch/>
                        <ChatSearchInput placeholder="Search"/>
                    </ChatSearch>
                </ChatSearchContainer>
                <ChatList>
                    {new Array(100).fill(0).map((chatListItem, i) => (
                        <ChatListItem

                            key={i}
                            name={"aa"}
                            time={"12:03"}
                            message={"jxsnsdn"}
                        />
                    ))}
                </ChatList>
            </Chats>
            <Chat />
        </Container>
    )
}