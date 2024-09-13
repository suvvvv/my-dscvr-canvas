"use client";

import React, { useState, useEffect } from "react";
import { CanvasClient } from '@dscvr-one/canvas-client-sdk';
import { registerCanvasWallet } from "@dscvr-one/canvas-wallet-adapter";
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCheckCircle, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import styles from './rsvp.module.css';

export default function RSVP() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number | null>(null); 
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [userMessage, setUserMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Basic useEffect test: Hook is being triggered.");
  }, []);

  // Initialize DSCVR Canvas and register the wallet adapter
  useEffect(() => {
    console.log("useEffect triggered: Starting DSCVR Client initialization...");

    const connectToDSCVR = async () => {
      try {
        const canvasClient = new CanvasClient();
        console.log("CanvasClient initialized:", canvasClient);

        registerCanvasWallet(canvasClient);
        console.log("Wallet adapter registered.");

        const response = await canvasClient.ready();
        console.log("CanvasClient is ready. Handshake complete. Response:", response);

        if (response && response.untrusted?.user) {
          const user = response.untrusted.user;
          console.log("User object from DSCVR:", user);

          setUserName(user.username);
          setUserId(user.id);
          setUserAvatar(user.avatar || null);
          console.log("User info set:", { username: user.username, id: user.id, avatar: user.avatar });
        } else {
          console.log("No user info found in the DSCVR handshake response.");
          setUserMessage("Unable to retrieve user information.");
        }
      } catch (error) {
        console.error("Error during DSCVR handshake:", error);
        setUserMessage("Error connecting to DSCVR. Please try again.");
      }
    };

    connectToDSCVR();
  }, []);

  // Handle fetching wallet balance
  const fetchWalletBalance = async () => {
    if (!walletAddress) {
      alert("Please enter your Solana wallet address.");
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet")); 
      const publicKey = new PublicKey(walletAddress);
      const balance = await connection.getBalance(publicKey);
      const balanceInSOL = balance / LAMPORTS_PER_SOL;

      console.log(`Wallet balance: ${balanceInSOL} SOL`);
      setWalletBalance(balanceInSOL);
      setUserMessage(`Wallet balance: ${balanceInSOL} SOL`);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      setUserMessage("Error fetching wallet balance.");
    }
  };


  const handleRSVP = async () => {
    console.log("RSVP button clicked. Checking wallet connection...");

    if (!walletAddress) {
      console.log("No wallet address entered. Prompting the user to enter a wallet.");
      alert("Please enter your Solana wallet address.");
      return;
    }

    console.log("Wallet address entered:", walletAddress);

    setTimeout(() => {
      setIsRSVPed(true);
      console.log("RSVP successful");
      setUserMessage(`Thank you, ${userName}! You have successfully RSVP'd with wallet: ${walletAddress}`);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hi {userName ? userName : "User"}, RSVP to our event</h1>
      {userAvatar && <img src={userAvatar} alt="User Avatar" className={styles.avatar} />}
      {isRSVPed ? (
        <div>
          <p className={styles.successMessage}>
            <FontAwesomeIcon icon={faCheckCircle} className={styles.successIcon} /> {userMessage}
          </p>
          {walletBalance !== null && (
            <p className={styles.balance}>
              <FontAwesomeIcon icon={faPiggyBank} className={styles.balanceIcon} /> Wallet Balance: {walletBalance} SOL
            </p>
          )}
        </div>
      ) : (
        <div>
          <p className={styles.subtitle}>Please enter your Solana wallet address below to RSVP:</p>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faWallet} className={styles.walletIcon} />
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your Solana wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <button
            className={`${styles.button} text-white font-bold py-2 px-4 rounded`}
            onClick={handleRSVP}
          >
            {userName ? "RSVP Now" : "Connect Wallet to RSVP"}
          </button>
          <button
            className={`${styles.button} text-white font-bold py-2 px-4 rounded bg-green-500 mt-4`}
            onClick={fetchWalletBalance}
          >
            <FontAwesomeIcon icon={faPiggyBank} /> View Wallet Balance
          </button>
        </div>
      )}
    </div>
  );
}
