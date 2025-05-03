import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";

export default function Home() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRoadmapDelete, setShowRoadmapDelete] = useState(false);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const refreshAccessToken = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/refresh`, {
      method: "GET",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("accessToken", data.newAccessToken);
      return data.newAccessToken;
    }
    return null;
  };

  const fetchWithRetry = async (url, options, retryFunc) => {
    const res = await fetch(url, options);
    if (res.status === 403) {
      const newToken = await refreshAccessToken();
      if (!newToken) {
        localStorage.clear();
        navigate("/login");
        return null;
      }
      options.headers.Authorization = `Bearer ${newToken}`;
      return retryFunc();
    }
    return res;
  };

  useEffect(() => {
    if (!username) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/username`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.ok && res.json())
        .then((data) => {
          if (data?.username) {
            localStorage.setItem("username", data.username);
            setUsername(data.username);
          }
        })
        .catch(console.error);
    }
  }, [username]);

  useEffect(() => {
    const loadRoadmaps = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const fetchRoadmaps = () => fetch(`${import.meta.env.VITE_API_BASE_URL}/api/roadmaps/load`, options);
      const res = await fetchWithRetry(`${import.meta.env.VITE_API_BASE_URL}/api/roadmaps/load`, options, fetchRoadmaps);

      if (res && res.ok) {
        const data = await res.json();
        setRoadmaps(data);
      }
      setLoading(false);
    };

    loadRoadmaps();
  }, []);

  const handleRoadmapDelete = async (roadmapId) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: roadmapId }),
    };

    const deleteRequest = () =>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/roadmaps/delete/roadmap`, options);

    const res = await fetchWithRetry(`${import.meta.env.VITE_API_BASE_URL}/api/roadmaps/delete/roadmap`, options, deleteRequest);

    if (res && res.ok) {
      setRoadmaps((prev) => prev.filter((rm) => rm.id !== roadmapId));
    }
  };

  const previewClicked = (roadmap) => {
    navigate("/display-roadmap", { state: roadmap });
  };

  return (
    <>
      <Nav />
      <div className="body">
        <div className="bodyHeader">
          <h1>Hello, {username}!</h1>
          <input
            className="manageRoadmaps"
            type="button"
            onClick={() => setShowRoadmapDelete((prev) => !prev)}
            value={showRoadmapDelete ? "Cancel" : "Manage Roadmaps"}
          />
        </div>

        <h2>Your Roadmaps</h2>
        <div className="roadmapContainer">
          {loading && <h3>Roadmaps loading...</h3>}
          {roadmaps.map((roadmap) => (
            <div key={roadmap.id} style={{ display: "flex", alignItems: "center" }}>
              <div className="roadmapPreview" onClick={() => previewClicked(roadmap)}>
                <h2 style={{ backgroundColor: "white" }}>{roadmap.title}</h2>
              </div>
              {showRoadmapDelete && (
                <input
                  type="button"
                  value="DELETE"
                  onClick={() => handleRoadmapDelete(roadmap.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
