import { auth } from "@/auth"
import { LoginForm } from "./login-form"

const PageAuthLogin = async () => {
    const session = await auth()

    console.log({session})
    return (
        <LoginForm />
    )
}

export default PageAuthLogin