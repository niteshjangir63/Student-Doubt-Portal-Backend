import "./Unauthorized.css";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="unauthorized">
      <h1 className="unauthorized-code">403</h1>
      <h2 className="unauthorized-title">Access Denied</h2>
      <p className="unauthorized-text">
        You don’t have permission to access this page.
      </p>

      <div className="unauthorized-actions">
        <Link to="/" className="unauthorized-btn">
          Go Back
        </Link>
      </div>
    </div>
  );
}