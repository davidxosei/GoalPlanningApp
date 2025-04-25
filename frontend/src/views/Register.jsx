import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            console.error("Passwords do not match.");
            setLoading(false);
            return;
        }

        const requestBody = {
            username: username,
            password: password,
        }

        const apiUrl = "http://localhost:8080/api/users/register"

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if(response.ok) {
                navigate("/home");
            }
            else {
                const errorMessage = await response.text();
                console.error("Backend error: ",errorMessage);
            }
            
        } catch (error) {
            console.error("Error during fetch", error);
            
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className='sign-in-container'>
            <div id = "content">
                <h1 className = "sign-in-title">Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor = "username">Username</label>
                    <input id = "username" type = "text" required value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                    
                    <label htmlFor = "password">Password</label>
                    <input id = "password" type = "password" required value = {password} onChange={(e) => setPassword(e.target.value)}/>

                    <label htmlFor ="confirm-password">Confirm Password</label>
                    <input id = "confirm-password" type = "password" required value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} />
                    
                    <input type = "submit" value = {loading ? "Loading..." : "Register Account"} disabled = {loading} />
                </form>
                <div className = "login-reroute">
                    <p>Already have an account?</p>
                    <Link to = "/">Log In</Link>
                </div>
            </div>
        </div>
    );
}