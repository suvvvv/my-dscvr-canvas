"use client"; 

import { useState } from 'react';
import { CanvasClient } from '@dscvr-one/canvas-client-sdk';
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter';
import styles from './rsvp.module.css';  
export default function RSVP() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [userMessage, setUserMessage] = useState<string | null>(null);

  // Function to connect the user's Solana wallet via DSCVR Canvas SDK and wallet adapter
  const connectWallet = async () => {
    try {
      const canvasClient = new CanvasClient();
      registerCanvasWallet(canvasClient);  // Register DSCVR canvas wallet

      const response = await canvasClient.ready();

      if (response && response.untrusted.user) {
        const user = response.untrusted.user;

        // Check if the user has a wallet connected
        if (user.address) {
          setWalletAddress(user.address);  // Set the wallet address if present
          setUserMessage(null);  // Clear any previous message
        } else {
          // If no wallet is connected, prompt the user to connect one
          setUserMessage("No wallet connected. Please connect your wallet to proceed.");
        }
      } else {
        setUserMessage("Unable to retrieve user information. Please try again.");
      }
    } catch (error) {
      console.error("Error connecting wallet: ", error);
      setUserMessage("Error connecting wallet. Please try again.");
    }
  };

  // Function to handle the RSVP action
  const handleRSVP = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsRSVPed(true);  // Mark as RSVP complete
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>RSVP for the Event</h1>
      {!walletAddress ? (
        <>
          <button className={styles.button} onClick={connectWallet}>Connect Wallet</button>
          {userMessage && <p className={styles.errorMessage}>{userMessage}</p>}
        </>
      ) : (
        <>
          <p className={styles.message}>Connected Wallet: {walletAddress}</p>
          <button className={styles.button} onClick={handleRSVP} disabled={isRSVPed}>
            {isRSVPed ? "RSVPed!" : "RSVP Now"}
          </button>
        </>
      )}
    </div>
  );
}
