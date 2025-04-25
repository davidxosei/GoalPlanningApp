import {Link, useNavigate} from 'react-router-dom';
import {use, useState} from 'react';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                const data = await response.json();
                
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                console.log("Received access token", localStorage.getItem("token"));
                console.log("Received refresh token", localStorage.getItem("refreshToken"));
                navigate("/");
            }
            else {
                const errorMessage = await response.text();
                console.error("Backend error", errorMessage);
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Frontend error: ", error);
            setError("There was an error submitting your request, please try again later.")
        }
        finally {
            setLoading(false);
        }
        


    };

    return (
        <div className = "sign-in-container">
            <div id = "content">
                <h1 className = "sign-in-title">Log In</h1>
                {error && <div className='errorMessage'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor = "username">Username</label>
                    <input type = "text" id = "username" required value = {username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor = "password">Password</label>
                    <input type = "password" id = "password" required value = {password} onChange={(e) => setPassword(e.target.value)}/>

                    <input type = "submit" value = {loading ? "Loading..." : "Login"} disabled = {loading}/>
                </form>
                <div id = "loginlinks">
                    <Link to = "/register">Create account</Link>
                    <Link to = "/">Continue as guest</Link>
                </div>
            </div>
        </div>
        
    )
}