import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { getProfile, getStoredToken } from "./api";
import { setUser, clearUser, setLoading } from "./slice/Auth";

function App() {
  const dispatch = useDispatch();

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
    </>
  );
}

export default App;
