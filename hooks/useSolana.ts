import { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

const network = clusterApiUrl("devnet");  // You can change this to "mainnet-beta" if needed
const connection = new Connection(network);

const useSolana = (walletAddress: string | null) => {
  // Get the wallet balance
  const getBalance = async () => {
    if (!walletAddress) return null;

    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;  // Convert to SOL
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  };

  // Send SOL to another address
  const sendSolana = async (destination: string, amount: number) => {
    if (!walletAddress) return;

    try {
      const sender = Keypair.generate();  // In reality, the sender's keypair should come from a wallet
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
      console.log(`Transaction successful: ${signature}`);
    } catch (error) {
      console.error("Error sending SOL:", error);
    }
  };

  return { getBalance, sendSolana };
};

export default useSolana;
