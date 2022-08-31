import { AppProps } from "next/app";

import "/styles/index.css";
import ContractContextProvider from "../context/ContractContext/ContractContextProvider";
import ContractEventsProvider from "../context/ContractEventsContext/ContractEventsProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContractContextProvider>
        <Component {...pageProps} />
    </ContractContextProvider>
  );
}

export default MyApp;
