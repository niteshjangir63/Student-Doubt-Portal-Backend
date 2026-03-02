import "./Page404.css";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="notfound">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-text">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link to="/" className="notfound-btn">
        Go Back
      </Link>
    </div>
  );
}