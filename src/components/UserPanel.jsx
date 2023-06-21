import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const navigate = useNavigate();
  return (
    <div className="user-panel">
      <h1>User panel</h1>
      <div
        className="p-2"
        style={{ border: "1px solid white", cursor: "pointer" }}
        onClick={() => navigate("/dashboard/profile")}
      >
        profile
      </div>
      <div
        className="p-2"
        style={{ border: "1px solid white", cursor: "pointer" }}
        onClick={() => navigate("/dashboard/myquestions")}
      >
        to questions
      </div>
    </div>
  );
}
