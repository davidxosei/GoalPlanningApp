import { useLocation } from "react-router-dom";
import Roadmap from "../components/Roadmap";

export default function DisplayRoadmap() {
    const location = useLocation();
    const roadmap = location.state || {};

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
        <div>
            <h1>{roadmap.title}</h1>
            <Roadmap steps = {roadmap.steps}/>
        </div>
    );
}