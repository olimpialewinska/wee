

export function Login(){
    return(
        <>
            <Navbar />
            <Container>
                <Login>
                    <LoginHeaderIcon />
                    <LoginContent>
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Button>Log in</Button>
                    </LoginContent>
                    <LoginFooter>
                        <p>Don't have an acoount? </p> <a href="/register">Sign up!</a>
                    </LoginFooter>
                </Login>
            </Container>
        </>
    )
}