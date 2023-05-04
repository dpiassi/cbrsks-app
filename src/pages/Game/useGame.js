import { useCallback, useEffect, useState } from "react";
import { useUnityContext } from "react-unity-webgl";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import quest from "../../services/quest.service";
import airdrop from "../../services/airdrop.service";

const { VITE_URL_ASSETS_GAME } = import.meta.env;

const useGame = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [questCompleted, setQuestCompleted] = useState(false);
  const {
    isLoaded,
    unityProvider,
    requestFullscreen,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: `${VITE_URL_ASSETS_GAME}/cys.loader.js`,
    dataUrl: `${VITE_URL_ASSETS_GAME}/cys.data.br`,
    frameworkUrl: `${VITE_URL_ASSETS_GAME}/cys.framework.js.br`,
    codeUrl: `${VITE_URL_ASSETS_GAME}/cys.wasm.br`,
    streamingAssetsUrl: `${VITE_URL_ASSETS_GAME}/../StreamingAssets`,
  });

  const handleRequestAirdrop = useCallback(
    async (coins) => {
      try {
        if (!wallet.publicKey) throw new Error("Wallet not connected.");

        const rawTx = await airdrop.requestAirdrop(
          wallet.publicKey,
          // account for decimals, so we get the correct amount of tokens
          // 1e2 = 100 (2 decimals)
          coins * 1e2
        );
        if (!rawTx) throw new Error("Airdrop request failed.");

        const tx = VersionedTransaction.deserialize(
          Buffer.from(rawTx, "base64")
        );
        await wallet.sendTransaction(tx, connection);

        sendMessage("Grizzlython", "ResetUnclaimedCoinsCount", "");
      } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error(err);
      }
    },
    [wallet, connection, sendMessage]
  );

  const handleEnd = useCallback(() => {
    try {
      const time = setTimeout(async () => {
        const completed = await quest.getPoints();
        setQuestCompleted(completed);
      }, 3000);

      return () => {
        clearTimeout(time);
      };
    } catch (error) {
      setQuestCompleted(false);
    }
    return null;
  }, []);

  const goFullscreen = () => {
    requestFullscreen(true);
  };

  useEffect(() => {
    addEventListener("OnMatchSoloEnded", handleEnd);
    return () => {
      removeEventListener("OnMatchSoloEnded");
    };
  }, [addEventListener, removeEventListener, handleEnd]);

  useEffect(() => {
    addEventListener("OnClaimTokensButtonClicked", handleRequestAirdrop);
    return () => {
      removeEventListener("OnClaimTokensButtonClicked", handleRequestAirdrop);
    };
  }, [addEventListener, removeEventListener, handleRequestAirdrop]);

  return {
    unityProvider,
    goFullscreen,
    isLoaded,
    loadingProgression,
    questCompleted,
  };
};

export default useGame;
