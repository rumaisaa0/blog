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
      <div className="nav-links">
        <Link to="/">{t("common.home")}</Link>
        <span>|</span>
        <Link to="/blogs">{t("common.blogs")}</Link>
      </div>

      {user ? (
        <div className="nav-actions">
          {user?.role === "admin" && (
           <Link to="/admin/reports">Admin Reports</Link>
          )}
          <Link to="/profile">{user.username}</Link>
          {user.role === "admin" && " (admin)"}
          <button onClick={handleLogout}>{t("common.logout")}</button>
        </div>
      ) : (
        <div className="nav-actions">
          <button className="nav-login-btn" onClick={() => openModal("login")}>
           {t("common.login")}
          </button>
          <button className="nav-register-btn" onClick={() => openModal("register")}>
           {t("common.register")}
          </button>
        </div>
      )}
    </nav>
  );
}
