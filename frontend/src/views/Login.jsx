import {Link, useNavigate} from 'react-router-dom';
import {use, useState} from 'react';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            username: username,
            password: password
        }

        const apiUrl = "http://localhost:8080/api/users/login";
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            if (response.ok) {
                navigate("/home");
            }
            else {
                const errorMessage = await response.text();
                console.error("Backend error", errorMessage);
            }
        } catch (error) {
            console.error("Frontend error: ", error);
        }
        


    };

    return (
        <div className = "sign-in-container">
            <div id = "content">
                <h1 className = "sign-in-title">Log In</h1>
                <form onSubmit={handleSubmit}>
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