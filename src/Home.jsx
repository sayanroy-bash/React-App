import ReCAPTCHA from "react-google-recaptcha";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationContext } from "./ValidationContext";
import { useEffect } from "react";

function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { setValidated } = useContext(ValidationContext);

  const handleRecaptcha = (token) => {
    setIsVerified(!!token)
  };

  useEffect(()=>{
    if(isVerified){
      setValidated(true)
      navigate("/protected")
    }
  },[isVerified])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg flex flex-col items-center">
        <ReCAPTCHA
          sitekey="6Lfa9akqAAAAAHnnICrgnzY1TF2p5kEAH0cjrLJq" // Replace with your Google reCAPTCHA site key
          onChange={handleRecaptcha}
          className="mb-6"
        />
      </div>
    </div>
  );
}

export default Home;
