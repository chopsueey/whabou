import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const navigate = useNavigate();
  return (
    <div className="user-panel flex lg:flex-col border-l-2">
      <div
        className="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard/myquestions")}
      >
        feed
      </div>
      <div
        className="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard/myquestions")}
      >
        trend
      </div>
      <div
        className="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard/myquestions")}
      >
        recommended
      </div>
      
      <div
        className="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard/myquestions")}
      >
        ask a question
      </div>
      <div
        className="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard/profile")}
      >
        profile
      </div>
    </div>
  );
}
