import {Link, useNavigate} from 'react-router-dom';


export default function Nav() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate("/");
    }
    return (
        <div id = "nav">
            <div className = "viewcreate">
                <Link to = "/home">Your Roadmaps</Link>
                <Link to = "/create">Create Roadmap</Link>
            </div>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    );
}