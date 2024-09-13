import { NextApiRequest, NextApiResponse } from "next";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { destination, amount } = req.body;

  if (!destination || !amount) {
    res.status(400).json({ error: "Missing destination or amount" });
    return;
  }

  try {
    const sender = Keypair.generate();  // Example sender, replace with actual wallet
    const destinationKey = new PublicKey(destination);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: destinationKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await connection.sendTransaction(transaction, [sender]);
    await connection.confirmTransaction(signature);
    res.status(200).json({ success: true, signature });
  } catch (error) {
    res.status(500).json({ error: "Transaction failed" });
  }
}
