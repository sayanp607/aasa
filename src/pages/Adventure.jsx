import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Adventure() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "user" || role==="admin") {
      navigate("/adventurehome");
    } 
  }, [navigate]);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Adventures</h1>
      <h3 className="home-title">Please Login to book rides.</h3>
    </div>
  );
}
