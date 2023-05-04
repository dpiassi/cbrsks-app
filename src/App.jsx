import { RouterProvider } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import router from "./router";
// import { WalletProvider } from "./WalletProvider";
// import "@solana/wallet-adapter-react-ui/styles.css";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}
