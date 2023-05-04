import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Game from "../pages/Game";
import RequiredAuth from "../layouts/RequiredAuth";
import loaderRequireAuth from "../layouts/RequiredAuth/loaderRequiredAuth";
import Admin from "../pages/Admin/Admin";
import Dashboard from "../pages/Admin";
import loaderRequireAuthAdmin from "../layouts/RequiredAuth/loaderRequiredAuthAdmin";
import EnterGuild from "../pages/EnterGuild";
import RequiredAuthWithoutIsGuild from "../layouts/RequiredAuth/RequiredAuthWithoutIsGuild";
// import ConnectWallet from "../pages/ConnectWallet";
// import RequiredAuthWithoutWallet from "../layouts/RequiredAuth/RequiredAuthWithoutWallet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/guild",
    loader: loaderRequireAuth,
    element: (
      <RequiredAuthWithoutIsGuild>
        <EnterGuild />
      </RequiredAuthWithoutIsGuild>
    ),
  },
  // {
  //   path: "wallet",
  //   loader: loaderRequireAuth,
  //   element: (
  //     <RequiredAuthWithoutWallet>
  //       <ConnectWallet />
  //     </RequiredAuthWithoutWallet>
  //   ),
  // },
  {
    path: "game",
    loader: loaderRequireAuth,
    element: (
      <RequiredAuth>
        <Game />
      </RequiredAuth>
    ),
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "admin/dashboard",
    loader: loaderRequireAuthAdmin,
    element: <Dashboard />,
  },
]);

export default router;
