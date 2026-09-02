import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../api";
import { setUser } from "../slice/Auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp(form);

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));

      toast.success(response.data.message);
      navigate("/blogs");
    } catch (err) {
      const errors = err.response?.data?.errors;
      toast.error(Array.isArray(errors) ? errors.join(", ") : t("auth.registrationFailed"));
    }
  };

  return (
    <div>
      <h1>{t("common.register")}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("auth.username")}</label>
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div>
          <label>{t("auth.email")}</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div>
          <label>{t("auth.password")}</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>

        <div>
          <label>{t("auth.confirmPassword")}</label>
          <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required />
        </div>

        <button type="submit">{t("common.register")}</button>
      </form>

      <p>
        {t("auth.alreadyAccount") }   <Link to="/login">  {t("common.login")}</Link>
      </p>
    </div>
  );
}


