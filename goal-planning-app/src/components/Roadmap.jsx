import StepIcon from "./StepIcon";
import { useState } from "react";

export default function Roadmap({steps}) {
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <div className="roadmap">
            {steps.map((step, index) => {
                return <StepIcon 
                step = {step} 
                index = {index} 
                setModalDescription = {setModalDescription} 
                setModalTitle = {setModalTitle}
                setModalVisible = {setModalVisible}
                />
            })}
        {modalVisible && (<div className="modal">
            <h2>{modalTitle}</h2>
            <button onClick={() => setModalVisible(false)}>X</button>
            <p>{modalDescription}</p>
        </div>)}
        </div>
    );
}