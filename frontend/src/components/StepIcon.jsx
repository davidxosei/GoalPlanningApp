import { useState } from "react";

export default function StepIcon({step, steps, setSteps, index, isCreate, setModalDescription, setModalTitle, setModalVisible}) {
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
    const deleteStep = () => {
            console.log("Delete clicked");
            setSteps(steps.filter((s, i) => i !== index));

    };
    
    return (
      <div
      className="stepIconWrapper"
      
      style={{
        position: 'relative',
        cursor: 'pointer',
        transform: `translate(${horizontalOffset}px, ${verticalOffset}px)`
      }}
    >
      <div className="stepIcon" onClick={showStep}>
        <h2 className="stepTitle">{step.title}</h2>
      </div>
      {isCreate && (
        <p
          style={{ color: 'red', border:'solid'}}
          onClick={(e) => {
            e.stopPropagation();
            deleteStep();
          }}
        >
          Remove
        </p>
      )}
    </div>
    
        
    );
}