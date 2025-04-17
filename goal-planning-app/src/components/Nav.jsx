import {Link} from 'react-router-dom';


export default function Nav() {
    return (
        <div id = "nav">
            <div className = "viewcreate">
                <Link to = "/home">Your Roadmaps</Link>
                <Link to = "/create">Create Roadmap</Link>
            </div>
            <button>Log Out</button>
        </div>
    );
}