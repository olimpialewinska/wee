import { Profile } from "@/components/Desktop/Profile";
import { User } from "@/interfaces";



export default function ProfilePage(props : User) {
  const user: User = {
    name: "Olimpia Lewińska",
    email: "olim1003@gmail.com",
    phone: "123456789",
    bio: "Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl",
    img: "/person.svg",
    password: "jjdwnxnc",
  };

  return (
  <Profile name={""} email={""} phone={""} bio={""} password={""} img={""}/>
  );
}
