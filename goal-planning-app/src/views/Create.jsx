import { useState } from "react";
import Nav from "../components/Nav";
import StepIcon from "../components/StepIcon";
import Roadmap from "../components/Roadmap";

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
                <textarea placeholder="Enter description" required value = {stepDescription} onChange={(e) => setStepDescription(e.target.value)}/>
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
    const [steps, setSteps] = useState([]);
    // steps.forEach((step) => {
    //     console.log(step.title, step.description);
    // });

    return (
        <div className="body">
            <Nav />
            <div className="createTop">
                <input className = "roadmapTitle" placeholder="Enter roadmap title..." required value = {roadmapTitle} onChange={(e) => setRoadmapTitle(e.target.value)} />
                <input className="addStepButton" type = "button" value = "Add Step" onClick = {openModal} />
            </div>

            <Roadmap steps = {steps} />
            
            {modalVisible && <Modal onClose = {closeModal} setSteps = {setSteps} />}
            
            {steps.length > 0 && <input className = "roadmapSubmit" type = "button" value = "Publish Roadmap" />}
        </div>
    );
}