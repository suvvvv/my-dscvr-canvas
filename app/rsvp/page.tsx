"use client";

import React, { useState, useEffect } from "react";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";
import { registerCanvasWallet } from "@dscvr-one/canvas-wallet-adapter";
import styles from './rsvp.module.css';

export default function RSVP() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isRSVPed, setIsRSVPed] = useState(false);

  // Initialize Canvas Client and perform handshake
  useEffect(() => {
    const connectToDSCVR = async () => {
      try {
        const canvasClient = new CanvasClient();
        registerCanvasWallet(canvasClient);  // Register DSCVR canvas wallet

        // Perform handshake with DSCVR to get user information
        const response = await canvasClient.ready();

        if (response && response.untrusted?.user) {
          const user = response.untrusted.user;
          setUserName(user.username);  // Get and display the user's name
        }
      } catch (error) {
        console.error("Error during handshake:", error);
      }
    };

    connectToDSCVR();
  }, []);

  // Handle RSVP button click
  const handleRSVP = () => {
    if (!userName) {
      alert("Please connect your wallet to RSVP.");
      return;
    }
    setIsRSVPed(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hi {userName ? userName : "User"}, please connect your wallet</h1>
      <p>To RSVP for this event, connect your wallet below.</p>

      {!isRSVPed ? (
        <button
          className={`${styles.button} text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-400`}
          onClick={handleRSVP}
        >
          {userName ? "RSVP Now" : "Connect Wallet to RSVP"}
        </button>
      ) : (
        <p>Thank you, {userName}! You have successfully RSVP&#39;d.</p>
      )}
    </div>
  );
}
