import * as React from "react";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import CustomRoutes from "./pages/Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthenticatedContextProvider from "./Context/AuthenticatedContext";
import { Navbar } from "./components";
function App() {
  return (
    <>
      <AuthenticatedContextProvider>
        <CustomRoutes />
        <ToastContainer />
      </AuthenticatedContextProvider>
    </>
  );
}

export default App;
