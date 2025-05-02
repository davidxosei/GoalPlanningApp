import StepIcon from "./StepIcon";
import { useState } from "react";

export default function Roadmap({steps, setSteps, isCreate}) {
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <div className="roadmap" >
            {steps.map((step, index) => {
                return <StepIcon 
                step = {step}
                steps = {steps}
                setSteps = {setSteps} 
                index = {index} 
                isCreate = {isCreate}
                setModalDescription = {setModalDescription} 
                setModalTitle = {setModalTitle}
                setModalVisible = {setModalVisible}
                />
            })}
        {modalVisible && (
            <div className="modal">
                <div className="modalTop">
                    <h2>{modalTitle}</h2>
                    <button onClick={() => setModalVisible(false)}>X</button>
                </div>
                <p>{modalDescription}</p>
                
            </div>
        )}
        </div>
    );
}