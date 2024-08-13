import Router from "@/pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import "@/assets/styles/main.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
};

export default App;
