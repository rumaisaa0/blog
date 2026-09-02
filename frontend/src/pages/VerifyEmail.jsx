import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function VerifyEmail() {
  const [status, setStatus] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search)
      .get("confirmation_token");

    if (!token) {
      setStatus("Invalid confirmation link.");
      return;
    }

    api.get("/users/confirmation", {
      params: {
        confirmation_token: token,
      },
    })
      .then(() => {
        setStatus("Email verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setStatus(
          error.response?.data?.errors?.join(", ") ||
          "Unable to verify your email."
        );
      });
  }, [navigate]);

  return (
    <div>
      <h2>{status}</h2>
    </div>
  );
}

export default VerifyEmail;