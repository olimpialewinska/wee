import { Button, Container, Input, Register, RegisterContent, RegisterHeaderIcon } from "./style";


export function RegisterView(){
    return(
        <Container>
            <Register>
                <RegisterHeaderIcon />
                <RegisterContent>
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Input type="password" placeholder="Password" />
                    <Button>Register</Button>
                </RegisterContent>
            </Register>
        </Container>
    )
}