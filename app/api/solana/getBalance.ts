import { NextApiRequest, NextApiResponse } from "next";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';


const connection = new Connection(clusterApiUrl("devnet"));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    res.status(400).json({ error: "Missing wallet address" });
    return;
  }

  try {
    const publicKey = new PublicKey(walletAddress as string);
    const balance = await connection.getBalance(publicKey);
    res.status(200).json({ balance: balance / LAMPORTS_PER_SOL });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch balance" });
  }
}
