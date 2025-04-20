import {Link} from 'react-router-dom';
import {use, useState} from 'react';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className = "sign-in-container">
            <div id = "content">
                <h1 className = "sign-in-title">Log In</h1>
                <form>
                    <label htmlFor = "username">Username</label>
                    <input type = "text" id = "username" required value = {username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor = "password">Password</label>
                    <input type = "password" id = "password" required value = {password} onChange={(e) => setPassword(e.target.value)}/>

                    <input type = "submit" value = "Login" />
                </form>
                <div id = "loginlinks">
                    <Link to = "/register">Create account</Link>
                    <Link to = "/home">Continue as guest</Link>
                </div>
            </div>
        </div>
        
    )
}