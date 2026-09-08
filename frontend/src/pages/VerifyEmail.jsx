import { useEffect, useState } from "react";
import { useModal } from "../ModalContext";
import api from "../api";

const verificationRequests = new Set();

function VerifyEmail() {
  const [status, setStatus] = useState("Verifying your email...");
  const { openModal } = useModal();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search)
      .get("confirmation_token");

    if (!token) {
      setStatus("Invalid confirmation link.");
      return;
    }

    if (verificationRequests.has(token)) {
      return;
    }

    verificationRequests.add(token);

    api.get("/users/confirmation", {
      params: { confirmation_token: token },
    })
      .then(() => {
        setStatus("Email verified successfully!");

        setTimeout(() => { openModal("login");   }, 2000);
      })
      .catch((error) => {
        setStatus(
          error.response?.data?.errors?.join(", ") ||
          "Unable to verify your email."  );
      });
  }, [openModal]);

  return (
    <div>
      <h2>{status}</h2>
    </div>);
}

export default VerifyEmail;