import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../api";
import { setUser } from "../slice/Auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export default function Profile() {
  const user = useSelector((state) => state.auth?.user ?? null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(form);
      dispatch(setUser(response.data.user));
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.errors?.join(", ") || t("auth.updateFailed"));
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p>Role: {user.role}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("auth.username")}</label>
          <input name="username" value={form.username} onChange={handleChange} />
        </div>

        <div>
          <label>{t("auth.email")}</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
