/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../types/supabase";
import Avatar from "@/components/Avatar";
import { Arrow, Button, Container, Content, Input, SignOut, WidgetForm, Wrapper, Form } from "./style";
import Link from "next/link";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Profile({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Link href="/Chats">
        <Arrow />
      </Link>
      <Wrapper>
        <Content>
          <WidgetForm>
            <Avatar
              uid={user?.id}
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ username, website, avatar_url: url });
              }}
            />
            <Form>
            <label htmlFor="email">Email</label>
            <Input id="email" type="text" value={user?.email} disabled />
         
      
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          
        
            <label htmlFor="website">Website</label>
            <Input
              id="website"
              type="website"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
            />

            </Form>
            
         

         
            <Button
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </Button>
       

          
            <SignOut
              className="button block"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "Chats";
              }}
            >
              Sign Out
            </SignOut>
          </WidgetForm>
          <div>
        
            
        
        </div>
        </Content>

        
      </Wrapper>
    </Container>
  );
}
