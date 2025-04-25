import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import {useState} from 'react';

export default function Home() {
    const username = "David";
    const [roadmaps, setRoadmaps] = useState([
        {
            key: 1,
          title: "This is a test 1", 
          steps: [
            {title: "Test 1 Step 1", description: "Test1 description for Step 1"}
          ]
        },
        {
            key: 2,
          title: "This is a test 2", 
          steps: [
            {title: "Test 2 Step 2", description: "Test2 description for Step 2"}
          ]
        }
      ]);
    const navigate = useNavigate();

    const previewClicked = (roadmap) => {
        console.log("clicked", roadmap);
        navigate("/display-roadmap", {state: roadmap})
    };
    
    return (
        <>
            <Nav />
            <div className= "body">
                <h1>
                    Hello, {username}!
                </h1>
                <h2>Your Roadmaps</h2>
                <div className = "roadmapContainer">
                    {roadmaps.map(
                        (roadmap) => {
                            return(
                                <div className = "roadmapPreview" onClick={() => previewClicked(roadmap)}>
                                    <h2 style = {{backgroundColor: "white"}}>{roadmap.title}</h2>
                                </div>
                            );
                            
                        }
                    )}
                </div>
            </div>
        </>
    );
}