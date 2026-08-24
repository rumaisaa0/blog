import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;