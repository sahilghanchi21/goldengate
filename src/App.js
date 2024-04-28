import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <CustomRoutes />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
