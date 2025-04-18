import { useState } from "react";

export default function StepIcon({step, index, setModalDescription, setModalTitle, setModalVisible}) {
    const waveLength = 6;
    const horizontalAmplitude = 100;
    const verticalAmplitude = 20;

    const horizontalOffset = Math.sin((index / waveLength) * 2 * Math.PI) * horizontalAmplitude;
    const verticalOffset = Math.cos((index / waveLength) * 2 * Math.PI) * verticalAmplitude;

    const showStep = () => {
        setModalDescription(step.description);
        setModalTitle(step.title);
        setModalVisible(true);
    };
    
    return (
        <div className = "stepTitle" onClick = {showStep}>
            <h2 style = {{transform: `translateX(${horizontalOffset}px) translateY(${verticalOffset}px)`}}className="stepIcon">{step.title}</h2>
        </div>
    );
}