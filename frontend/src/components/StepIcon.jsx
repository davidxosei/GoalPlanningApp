import { useNavigate } from "react-router-dom";

export default function StepIcon({step, steps, setSteps, index, isCreate, setModalDescription, setModalTitle, setModalVisible, showStepDelete}) {
    const waveLength = 6;
    const horizontalAmplitude = 100;
    const verticalAmplitude = 20;

    const horizontalOffset = Math.sin((index / waveLength) * 2 * Math.PI) * horizontalAmplitude;
    const verticalOffset = Math.cos((index / waveLength) * 2 * Math.PI) * verticalAmplitude;

    const navigate = useNavigate();

    const showStep = () => {
        setModalDescription(step.description);
        setModalTitle(step.title);
        setModalVisible(true);
    };
    const deleteStep = () => {
            console.log("Delete clicked");
            setSteps(steps.filter((s, i) => i !== index));

    };

    const handleStepDelete = async (stepId, retry) => {
      const apiUrl = "http://localhost:8080/api/roadmaps/delete/step";
      const data = {id: stepId};
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSteps((prev) => prev.filter((step) => step.id !== stepId));
        const message = await response.json();
        console.log(message);
      }
      else if (response.status === 403 && !retry) {
        const apiUrl = "http://localhost:8080/api/users/refresh";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("refreshToken")}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.newAccessToken);
          handleStepDelete(stepId, true);
        }
      }
      else {
        const data = await response.text();
        console.log(data.message);
        localStorage.clear();
        navigate("/login");
      }
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
      {
        !isCreate && showStepDelete && (<input type = 'button' value = 'Delete' onClick={() => handleStepDelete(step.id, false)}/>)
      }
    </div>
    
        
    );
}