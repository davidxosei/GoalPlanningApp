import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import {useState} from 'react';
import { useEffect } from 'react';

export default function Home() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const refreshTokenUrl = "http://localhost:8080/api/users/refresh";
    const refreshOptions = {
        method: "GET",
        headers: {"Authorization" : `Bearer ${localStorage.getItem("refreshToken")}`}
    };
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
        const fetchRoadmaps = async (retry) => {
            const apiUrl = "http://localhost:8080/api/roadmaps/load";
            const standardOptions = {
                method: "GET",
                headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`}
            };
            try {
                setLoading(true);
                const response = await fetch(apiUrl, standardOptions);

                if (response.ok) {
                    if(retry) {
                        console.log("retry was successful and were now using the new one")
                    }
                    const data = await response.json();
                    setRoadmaps(data);
                    
                }
                else if (response.status === 403 && !retry) {
                    console.log("access Token expired trying to get a new one with the refresh token");
                    const response = await fetch(refreshTokenUrl, refreshOptions);
                    
                    if(response.ok) {
                        console.log("We safely got a new acess Token");
                        const data = await response.json();
                        localStorage.setItem("accessToken", data.newAccessToken);
                        console.log(localStorage.getItem("accessToken"));
                        fetchRoadmaps(true);
                    } 
                    else {
                        console.log("Retrying was not okay")
                    }

                }
                else {
                    console.log("We reached this bc the response status was: ", response.status, " and it is ", retry, " that we already retried.");
                    console.log("Both access and refresh tokens are no longer valid, redirecting to login.");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("username");
                    navigate("/login");
                }
            } 
            catch (error) {
                console.error(error);
                
            }
            finally {
                setLoading(false);
            }

        }
        fetchRoadmaps(false);
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
                    {loading && <h3>Roadmaps loading...</h3>}
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