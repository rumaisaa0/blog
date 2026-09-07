import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOut } from "../api";
import { clearUser } from "../slice/Auth";
import { useTranslation } from "react-i18next";
import { useModal } from "../ModalContext";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user ?? null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openModal } = useModal();

  async function handleLogout() {
    try {
      const response = await signOut();

      if (response?.data?.message) {
        toast.success(response.data.message);
      }

      localStorage.removeItem("token");
      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      localStorage.removeItem("token");
      dispatch(clearUser());
      toast.error(err.response?.data?.error || t("auth.logoutFail"));
      navigate("/");
    }
  }

  return (
    <nav>
      <Link to="/">{t("common.home")}</Link>
      {" | "}
      <Link to="/blogs">{t("common.blogs")}</Link>

      {user ? (
        <>
          {" | "}
           {user?.role === "admin" && (
            <Link to="/admin/reports">Admin Reports</Link>)}
           {" | "}
          <Link to="/profile">{user.username}</Link>

          {user.role === "admin" && " (admin)"}
          {" | "}

          <button onClick={handleLogout}>{t("common.logout")}</button>
        </>
      ) : (
        <>
          {" | "}
          <button className="left-btn" onClick={() => openModal("login")}>
            {t("common.login")}
          </button>
          {" | "}
          <button onClick={() => openModal("register")}>
            {t("common.register")}
          </button>
        </>
      )}
    </nav>
  );
}
