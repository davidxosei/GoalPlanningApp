import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Authorize({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return children;
}
