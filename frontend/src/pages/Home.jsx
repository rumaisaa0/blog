import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
export default function Home() {
  const user = useSelector((state) => state.auth?.user ?? null);
  const { t } = useTranslation();
  return (
    <div>
      <h1>Blog App</h1>
      <p>Welcome to the Blog App.</p>

      <Link to="/blogs">View Blogs</Link>

      {!user && (
        <>
          {" | "}
          <Link to="/login">{t("common.login")}</Link>
          {" | "}
          <Link to="/register">{t("common.register")}</Link>
        </>
      )}
    </div>
  );
}
