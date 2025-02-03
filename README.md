
# Vault3
```markdown

Welcome to Decentralized Image Upload and Sharing, a project designed to enable secure and decentralized
image storage using blockchain technology. With this platform, users can upload images and files to IPFS
(InterPlanetary File System) and manage access through Ethereum smart contracts.

## 🚀 Features

✅ Decentralized Storage: Images are stored on IPFS, ensuring immutability and reliability.  
✅ Smart Contract Integration: Solidity-based contracts manage ownership and access.  
✅ Access Control: Users can grant/revoke access to specific individuals via smart contracts.

## 🛠 Technology Stack

- **Solidity** → Smart contract development for ownership & access control.  
- **React** → User-friendly front-end for uploading and managing images.  
- **IPFS** → Decentralized storage protocol for secure image hosting.  

## 📥 Installation Guide

1️⃣ **Clone the repository:**

```sh
git clone <repository-url>
```

2️⃣ **Install dependencies for Hardhat:**

```sh
# Navigate to the root directory
cd vault3
# Install required packages
npm install
```

3️⃣ **Compile the smart contract:**

```sh
npx hardhat compile
```

4️⃣ **Deploy the smart contract:**

```sh
npx hardhat run scripts/deploy.js --network <network-name>
```

5️⃣ **Install dependencies for the React frontend:**

```sh
cd client
npm install
```

6️⃣ **Start the React application:**

```sh
npm start
```

## ⚙ Configuration

### 🔑 API Keys

Obtain Pinata API keys to interact with IPFS.

Update `FileUpload.js` with your API keys.

### 🦊 Metamask Setup

Ensure Metamask is installed and configured in your browser.

### 🏗 Contract Address

After deployment, update the contract address in `App.js` inside the React app.

## 📌 Usage Guide

- **Upload Image Before "Get Data"** → Ensure an image is uploaded on Pinata before clicking "Get Data", or an error will occur.
- **Accessing Other Users' Images** → Enter the user’s wallet address in the designated box. You’ll only gain access if they’ve granted permission via the smart contract.
- **Managing Access** → Users can revoke access at any time using the smart contract controls.

## 🛠 Troubleshooting

### ❌ "You don't have access" Error? 

Make sure:

- The image is uploaded before fetching data.
- The contract address is correctly set.
- You have the necessary access permissions.

## 👥 Contributing

We welcome contributions! 🚀 To contribute:

1. Fork the repository
2. Create a new branch (`feature/your-feature-name`)
3. Make your changes & ensure all tests pass
4. Submit a pull request with a detailed description

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📬 Contact

For any queries or suggestions, feel free to reach out:

- Email: kritikaaggarwal19@gmail.com, khushiloginto@gmail.com
- Twitter: [@Kr88722Aggarwal](https://x.com/Kr88722Aggarwal), [Khushi606272132](https://x.com/Khushi606272132)

🚀 Enjoy Decentralized Image Sharing! 🚀
```

