import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useModal } from "../ModalContext";

export default function Home() {
  const user = useSelector((state) => state.auth?.user ?? null);
  const { t } = useTranslation();
  const { openModal } = useModal();

  return (
    <div>
      <h1>Blog App</h1>
      <p>Welcome to the Blog App.</p>

      <Link to="/blogs">View Blogs</Link>

      {/* {!user && (
        <>
          {" | "}
          <button onClick={() => openModal("login")}>{t("common.login")}</button>
          {" | "}
          <button onClick={() => openModal("register")}>{t("common.register")}</button>
        </>
      )} */}
    </div>
  );
}
