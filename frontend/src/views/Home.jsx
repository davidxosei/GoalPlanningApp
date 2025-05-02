import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import {useState} from 'react';
import { useEffect } from 'react';

export default function Home() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    const [roadmaps, setRoadmaps] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            if (!username) {
                const apiUrl = "http://localhost:8080/api/users/username";
                try {
                    const response = await fetch(apiUrl, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                        },
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem("username", data.username);
                        setUsername(data.username);
                    }
                } catch (exception) {
                    console.error(exception);
                }
            }
        };
    
        fetchUsername();
    }, [username]);
    
    useEffect(() => {
        const fetchRoadmaps = async () => {
            const apiUrl = "http://localhost:8080/api/roadmaps/load";
            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoadmaps(data);
                }
            } 
            catch (error) {
                console.error(error);
            }

        }
        fetchRoadmaps();
    }, []);

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