import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className='sign-in-container'>
            <div id = "content">
                <h1 className = "sign-in-title">Register</h1>
                <form>
                    <label htmlFor = "username">Username</label>
                    <input id = "username" type = "text" required value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                    
                    <label htmlFor = "password">Password</label>
                    <input id = "password" type = "password" required value = {password} onChange={(e) => setPassword(e.target.value)}/>
                    
                    <input type = "submit" value = "Register Account" />
                </form>
                <div className = "login-reroute">
                    <p>Already have an account?</p>
                    <Link to = "/">Log In</Link>
                </div>
            </div>
        </div>
    );
}