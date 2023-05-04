import { Navigate, useLoaderData, useLocation } from "react-router-dom";
// import { useWallet } from "@solana/wallet-adapter-react";

/* eslint-disable react/prop-types */
function RequiredAuth({ children }) {
  const user = useLoaderData();
  // const wallet = useWallet();
  const location = useLocation();

  if (!user.authorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user.authorized && !user.isGuild) {
    return <Navigate to="/guild" state={{ from: location }} replace />;
  }

  // if (user.authorized && user.isGuild && !wallet.connected) {
  //   return <Navigate to="/wallet" state={{ from: location }} replace />;
  // }

  return children;
}

export default RequiredAuth;
