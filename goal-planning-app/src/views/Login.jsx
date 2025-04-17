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
                    <input type = "text" id = "username" value = {username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor = "password">Password</label>
                    <input type = "password" id = "password" value = {password} onChange={(e) => setPassword(e.target.value)}/>

                    <input type = "submit" value = "Login" />
                </form>
                <Link to = "/register">Create account</Link>
                <p>Continue as guest</p>
            </div>
        </div>
        
    )
}