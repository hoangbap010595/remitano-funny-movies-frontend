import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./common/private-route";
// import RestrictedRoute from "./common/restricted-route";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Share from "./components/Share";

function App() {
  return (
    <BrowserRouter basename="/funny-videos">
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<Share />} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
