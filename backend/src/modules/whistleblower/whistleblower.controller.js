import * as whistleblowerService from './whistleblower.service.js';

// Register a new whistleblower
const registerWhistleblower = async (req, res) => {
  try {
    const whistleblowerData = req.body;
    const newWhistleblower = await whistleblowerService.registerWhistleblower(whistleblowerData);
    res.status(201).json({ message: 'Whistleblower registered successfully', id: newWhistleblower });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all whistleblowers
const getAllWhistleblowers = async (req, res) => {
  try {
    const whistleblowers = await whistleblowerService.getAllWhistleblowers();
    res.status(200).json(whistleblowers);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching whistleblowers' });
  }
};

// Get a whistleblower by wallet address
const getWhistleblowerByWalletAddress = async (req, res) => {
  try {
    const { wallet_address } = req.params;
    const whistleblower = await whistleblowerService.getWhistleblowerByWalletAddress(wallet_address);
    res.status(200).json(whistleblower);
  } catch (error) {
    res.status(404).json({ message: 'Whistleblower not found' });
  }
};

export { registerWhistleblower, getAllWhistleblowers, getWhistleblowerByWalletAddress };
