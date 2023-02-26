
import { StyledNavbar, Brand, Buttons, Button } from "./style"

export function Navbar(){
    return(
        <StyledNavbar>
            <Brand href="/"></Brand>
            <Buttons>
                <Button href="/login">Log in</Button>
                <Button href="/register">Register</Button>
            </Buttons>
        </StyledNavbar>
    )
}