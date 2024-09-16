import * as whistleblowerRepository from './whistleblower.repository.js';

// Register a new whistleblower
const registerWhistleblower = async (whistleblowerData) => {
  const existingWhistleblower = await whistleblowerRepository.getWhistleblowerByWalletAddress(whistleblowerData.wallet_address);
  if (existingWhistleblower) throw new Error('Whistleblower already exists');
  return await whistleblowerRepository.createWhistleblower(whistleblowerData);
};

// Get all whistleblowers
const getAllWhistleblowers = async () => {
  return await whistleblowerRepository.getAllWhistleblowers();
};

// Get a whistleblower by wallet address
const getWhistleblowerByWalletAddress = async (walletAddress) => {
  const whistleblower = await whistleblowerRepository.getWhistleblowerByWalletAddress(walletAddress);
  if (!whistleblower) throw new Error('Whistleblower not found');
  return whistleblower;
};

export { registerWhistleblower, getAllWhistleblowers, getWhistleblowerByWalletAddress };
