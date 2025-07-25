import { useState } from "react";
import Nav from "../components/Nav";
import StepIcon from "../components/StepIcon";
import Roadmap from "../components/Roadmap";
import { useNavigate } from "react-router-dom";

function Modal({onClose, setSteps}) {
    const[stepTitle, setStepTitle] = useState("");
    const[stepDescription, setStepDescription] = useState("");
    
    const handleStepSubmit = (e) => {
        e.preventDefault();
        const step = {title: stepTitle, description: stepDescription};
        setSteps((prev) => [...prev, step]);
        setStepTitle("");
        setStepDescription("");
        onClose();
        
    }

    

    return (
        <div className="modal">
            <div className="addStepTop">
                <h1>Add step</h1>
                <input style = {{backgroundColor: "white"}}type = "button" value="X" onClick = {onClose} />
            </div>
            <form onSubmit={handleStepSubmit}>
                <input style = {{marginBottom: "0px"}} placeholder="Enter step title" required maxLength={45} value = {stepTitle} onChange={(e) => setStepTitle(e.target.value)}/>
                <p>{stepTitle.length}/45 chars</p>
                <textarea placeholder="Enter description" required value = {stepDescription} maxLength = {2000} onChange={(e) => setStepDescription(e.target.value)}/>
                <input style = {{marginTop: "40px"}} type = "submit" value = "Add new step" />
            </form>
        </div>
    );
}

export default function Create() {
    const [roadmapTitle, setRoadmapTitle] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => setModalVisible(false);
    const openModal = () => setModalVisible(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [steps, setSteps] = useState([]);
    const navigate = useNavigate();
    const handleRoadmapSubmit = async (retry) => {
        if(roadmapTitle.length < 1) {
            setErrorMessage("Roadmap title required");
            return;
        }

        try {
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/roadmaps/create`;
            const data = {
                title: roadmapTitle,
                steps: steps
            };
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                if(retry) {
                    console.log("This was a retry and it worked.");
                }
                console.log("Roadmap submitted successfully");
                navigate("/");
            }

            else if (response.status === 403 && !retry) {
                console.log("Access token expired trying to get a new one...");
                const refreshUrl = `${import.meta.env.VITE_API_BASE_URL}/api/users/refresh`;
                const response = await fetch(refreshUrl, {
                    method: "GET",
                    headers: {"Authorization" : `Bearer ${localStorage.getItem("refreshToken")}`}

                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("accessToken", data.newAccessToken);
                    handleRoadmapSubmit(true);
                }
            }
            else {
                console.log("Access and refresh token expired. Redirecting to login.");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Error connecting to server, please try again later.");
        }
    };
    return (
        <div className="body">
            <Nav />
            <div className="createTop">
                <input className = "roadmapTitle" placeholder="Enter roadmap title..." required value = {roadmapTitle} onChange={(e) => setRoadmapTitle(e.target.value)} />
                <button className="addStepButton" onClick = {openModal}>Add Step</button>
            </div>
            {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            <Roadmap steps = {steps} setSteps = {setSteps} isCreate = {true}/>
            
            {modalVisible && <Modal onClose = {closeModal} setSteps = {setSteps} />}
            
            {steps.length > 0 && <input className = "roadmapSubmit" type = "button" value = "Publish Roadmap" onClick={() => handleRoadmapSubmit(false)}/>}
        </div>
    );
}