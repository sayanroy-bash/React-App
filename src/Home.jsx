import ReCAPTCHA from "react-google-recaptcha";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationContext } from "./ValidationContext";

function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { setValidated } = useContext(ValidationContext);

  const handleRecaptcha = (token) => {
    setIsVerified(!!token);
  };

  const handleSubmit = () => {
    setValidated(true);
    navigate("/protected");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg flex flex-col items-center">
        <ReCAPTCHA
          sitekey="6Lfa9akqAAAAAHnnICrgnzY1TF2p5kEAH0cjrLJq" // Replace with your Google reCAPTCHA site key
          onChange={handleRecaptcha}
          className="mb-6"
        />
        <button
          onClick={handleSubmit}
          disabled={!isVerified}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
            isVerified
              ? "bg-green-500 hover:bg-green-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Fetch Products
        </button>
      </div>
    </div>
  );
}

export default Home;
