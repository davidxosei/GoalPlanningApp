import '../styles/Login.css'

export default function Login() {
    return (
        <div id = "container">
            <div id = "content">
                <h1 id = "title">Log In</h1>
                <form>
                    <label htmlFor = "username">Username</label>
                    <input type = "text" id = "username" />
                    <label htmlFor = "password">Password</label>
                    <input type = "password" id = "password"/>
                    <input type = "submit" value = "Login" />
                </form>
                <p>Create account</p>
                <p>Continue as guest</p>
            </div>
        </div>
        
    )
}