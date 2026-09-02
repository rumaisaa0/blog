import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";

function App() {
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
