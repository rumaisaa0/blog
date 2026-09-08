import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, storeToken } from "../api";
import { setUser } from "../slice/Auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useModal } from "../ModalContext";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectToOrganization = (organization) => {
    if (!organization?.subdomain) {
      return false;
    }

    const currentHost = window.location.hostname;
    const currentPort = window.location.port ? `:${window.location.port}` : "";
    const targetHost = currentHost === organization.subdomain || currentHost === `${organization.subdomain}.localhost`
      ? currentHost
      : `${organization.subdomain}.localhost`;

    const targetUrl = `${window.location.protocol}//${targetHost}${currentPort}/blogs`;

    if (window.location.href.startsWith(targetUrl)) {
      return true;
    }

    window.location.href = targetUrl;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({ email, password });

      const authHeader = response.headers.authorization;
      const token = authHeader ? authHeader.replace("Bearer ", "") : null;

      if (!token) {
        toast.error(t("auth.noToken"));

        return;
      }

      storeToken(token);
      dispatch(setUser(response.data.user));
      toast.success(response.data.message);
      closeModal();

      const redirected = redirectToOrganization(response.data.organization);
      if (!redirected) {
        navigate("/blogs");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || t("auth.loginFailed"));
    }
  };

  return (
    <div>
      <h1>{t("common.login")}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("auth.email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>{t("auth.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">{t("common.login")}</button>
      </form>

      <p>
        {t("auth.noAccount")}
        <button className="link-btn" onClick={() => openModal("register")}>
          {t("common.register")}
        </button>
      </p>
    </div>
  );
}
