import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationContext } from "./ValidationContext";

function ProtectedRoute({ children }) {
  const { validated } = useContext(ValidationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!validated) {
      navigate("/");
    }
  }, [validated, navigate]);

  if (!validated) {
    return <><p>Loading...</p></>
  }

  return <>{children}</>;
}

export default ProtectedRoute;
