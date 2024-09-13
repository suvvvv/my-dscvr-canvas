// pages/api/wallet.ts
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';

const SOLANA_CLUSTER = 'devnet'; // Change to 'mainnet-beta' for production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Missing wallet address' });
  }

  try {
    const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER)); // Connect to Solana cluster
    const publicKey = new PublicKey(walletAddress as string);

    // Fetch balance
    const balance = await connection.getBalance(publicKey);
    const balanceInSOL = balance / LAMPORTS_PER_SOL;

    // Fetch recent transactions (limit 10 for example)
    const transactionHistory = await connection.getConfirmedSignaturesForAddress2(publicKey, { limit: 10 });

    res.status(200).json({
      balance: balanceInSOL,
      transactions: transactionHistory.map((tx) => ({
        signature: tx.signature,
        slot: tx.slot,
        err: tx.err,
        blockTime: tx.blockTime,
      })),
    });
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    res.status(500).json({ error: 'Error fetching wallet data' });
  }
}
