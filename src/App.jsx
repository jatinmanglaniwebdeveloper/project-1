// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import UserDashboard from "./pages/UserDashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/"               element={<UserDashboard />} />
//         <Route path="/auth/login"     element={<Login />} />
//         <Route path="/auth/register"  element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserDashboard
              isLoggedIn={isLoggedIn}
              user={user}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/auth/login"
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}