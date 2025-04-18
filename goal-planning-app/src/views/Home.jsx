import Nav from '../components/Nav';
import {useState} from 'react';

export default function Home() {
    const username = "David";
    const [roadmaps, setRoadmaps] = useState([{title: "This is a test 1"}, {title: "This is a test 2"}, {title: "This is a test 3"}, {title: "This is a test 4"}, {title: "This is a test 5 and Im making this one longer to see if the length grows"}, {title: "This is a test 6"}]);
    return (
        <div>
            <Nav />
            <h1>
                Hello, {username}!
            </h1>
            <h2>Your Roadmaps</h2>
            <div className = "roadmapContainer">
                {roadmaps.map(
                    (roadmap) => {
                        return(
                            <div className = "roadmapPreview">
                                <h2 style = {{backgroundColor: "white"}}>{roadmap.title}</h2>
                            </div>
                        );
                        
                    }
                )}
            </div>
        </div>
    );
}