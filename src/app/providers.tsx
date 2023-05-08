"use client";

import React from "react";
import { WagmiConfig, createClient } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { NotificationModal } from "@crossbell/notification";
import {
  ConnectKitProvider,
  getDefaultClientConfig,
} from "@crossbell/connect-kit";

import { ipfsGateway, ipfsLinkToHttpLink } from "@/ipfs";

const wagmiClient = createClient(
  getDefaultClientConfig({ appName: "Crossbell App" })
);

export type ProvidersProps<T = unknown> = {
  children: React.ReactNode;
};

export function Providers<T = unknown>({ children }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <IpfsGatewayContext.Provider value={ipfsGateway}>
          <ConnectKitProvider
            ipfsLinkToHttpLink={ipfsLinkToHttpLink}
            // Used for the case when we want to keep the user logged in even if the user disconnects from the wallet.
            // ConnectKit will make sure to reconnect to the wallet if the user initiates a transaction.
            ignoreWalletDisconnectEvent={true}
          >
            <NotificationModal />
            {children}
          </ConnectKitProvider>
        </IpfsGatewayContext.Provider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
