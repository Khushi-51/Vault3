import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer,
        );
        setContract(contract);
        setProvider(provider);
        setLoading(false);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  const disconnectWallet = () => {
    setAccount("");
    // Optionally reset contract and provider if needed
    setContract(null);
    setProvider(null);
  };

  return (
    <>
      <div className="background"></div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="navbar-title">Vault3</span>
          </div>
          <div className="navbar-items">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#upload">Upload</a>
          </div>
          <div className="navbar-account">
            {account ? (
              <div>
                <div 
                  className="account-display"
                  data-full-address={account}
                  onClick={() => {
                    navigator.clipboard.writeText(account);
                    const el = document.createElement('div');
                    el.className = 'copy-notification';
                    el.textContent = 'Address copied!';
                    document.body.appendChild(el);
                    setTimeout(() => el.remove(), 2000);
                  }}
                >
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  <span className="copy-icon">📋</span>
                <button className="connect-wallet-button" onClick={disconnectWallet}>
                  Disconnect
                </button>
                </div>
              </div>
            ) : (
              <button className="connect-wallet-button" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </nav>

        <section id="about">
        <section className="hero">
          <h1>Secure File Storage on Blockchain</h1>
          <p className="hero-subtitle">
            Store and share your files securely using blockchain technology
          </p>
          <p>
            Vault3 is a decentralized file storage solution built on blockchain technology. 
            It offers secure and reliable storage for your files, ensuring their integrity and availability. 
            With Vault3, you can store and share your files without relying on centralized servers.
          </p>
          <br/>
          <a href="#upload">
          <button className="cta-button">Get Started</button>
          </a>
        </section>
        </section>
        <section id="upload">
        <div className="main-content">
          {modalOpen && (
            <Modal setModalOpen={setModalOpen} contract={contract} />
          )}
          <div className="content">
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            />
            {!modalOpen && (
  <button className="cta-button" onClick={() => setModalOpen(true)}>
    Share File
  </button>
)}
            <Display contract={contract} account={account} />
          </div>
        </div>
        </section>
        <section id="features">
  <h2>Features</h2>
  <div className="features-grid">
    <div className="feature">
      <div className="feature-icon">🔒</div
      ><h3>Secure Storage</h3>
      <p>
        Vault3 uses blockchain technology to provide secure and tamper-proof storage for your files.
      </p>
    </div>
    <div className="feature">
      <div className="feature-icon">🔄</div
      ><h3>Decentralized</h3>
      <p>
        Vault3 is a decentralized file storage solution, eliminating the need for centralized servers.
      </p>
    </div>
    <div className="feature">
      <div className="feature-icon">🔗</div>
      <h3>Blockchain Technology</h3>
      <p>
        Vault3 leverages blockchain technology to ensure the integrity and availability of your files.
      </p>
    </div>
  </div>
</section>
        <section id="contact">
        <h2>Contact Us</h2>
        <p>
            Have questions or feedback? Reach out to us!
        </p>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>
          <button type="submit">Send</button>
        </form>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Vault3</h3>
              <p>Decentralized file storage solution</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <p>Email: contact@vault3.com</p>
              <p>Twitter: @vault3</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Vault3. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;