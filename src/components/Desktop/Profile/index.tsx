import { User } from "@/interfaces";
import { Card, Container, Link, ProfileImg } from "./style";

export function Profile(props: User) {
  return (
    <Container>
      <Link href="/Chats"/>
      <Card>
        <ProfileImg style={{ 
            backgroundImage: `url(${props.img})`}}
            />
        </Card>
        </Container>
  );
}
