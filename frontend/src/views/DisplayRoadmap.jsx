import { useLocation } from "react-router-dom";
import { useState } from "react";
import Roadmap from "../components/Roadmap";
import Nav from "../components/Nav";

export default function DisplayRoadmap() {
    const location = useLocation();
    const roadmap = location.state || {};
    const [showStepDelete, setShowStepDelete] = useState(false);
    const [steps, setSteps] = useState(roadmap.steps);

    if(!roadmap) {
        return (
            <div>
                <h1>
                    Roadmap Loading...
                </h1>
            </div>
        );
    }


    return(
        <>
            <Nav />
            <div className="body">
                
                <div className="bodyHeader">
                <h1>{roadmap.title}</h1>
                <input className="manageSteps" type = 'button' value = {showStepDelete ? 'Cancel' : 'Manage steps'} onClick = {() => setShowStepDelete(prev => !prev)}/>
                </div>
                

                <Roadmap steps = {steps} setSteps={setSteps} showStepDelete = {showStepDelete}/>
            </div>
        </>
        
    );
}