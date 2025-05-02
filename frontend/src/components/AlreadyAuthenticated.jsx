import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AlreadyAuthenticated({ children }) {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (token) return null;

  return children;
}
