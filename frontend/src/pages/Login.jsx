import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../api";
import { setUser } from "../slice/Auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      localStorage.setItem("token", token);
      dispatch(setUser(response.data.user));
      toast.success(response.data.message);
      navigate("/blogs");
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
        {t("auth.noAccount")}<Link to="/register">{t("common.register")}</Link>
      </p>
    </div>
  );
}
