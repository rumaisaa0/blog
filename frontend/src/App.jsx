import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { getProfile, getStoredToken } from "./api";
import { setUser, clearUser, setLoading } from "./slice/Auth";
import Modal from "./components/Modal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import { useModal } from "./ModalContext";

function App() {
  const dispatch = useDispatch();
  const { modal, closeModal } = useModal();

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = getStoredToken();
      if (!token) return;

      dispatch(setLoading(true));

      try {
        const response = await getProfile();
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(clearUser());
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      } finally {
        dispatch(setLoading(false));
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  return (
    <>
      <NavBar />

      <main>
        <AppRoutes />
      </main>

      {modal && modal.name === "login" && (
        <Modal onClose={closeModal}>
          <Login />
        </Modal>
      )}

      {modal && modal.name === "register" && (
        <Modal onClose={closeModal}>
          <Register />
        </Modal>
      )}

      {modal && modal.name === "createBlog" && (
        <Modal onClose={closeModal}>
          <CreateBlog onCreated={modal.onCreated} />
        </Modal>
      )}

      {modal && modal.name === "editBlog" && (
        <Modal onClose={closeModal}>
          <EditBlog blogId={modal.blogId} onUpdated={modal.onUpdated} />
        </Modal>
      )}
    </>
  );
}

export default App;
