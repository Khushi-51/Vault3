import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import FileUpload from "./components/FileUpload"
import Display from "./components/Display"
import Modal from "./components/Modal"
import "./App.css"

function App() {
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

        const contract = new ethers.Contract(contractAddress, Upload.abi, signer)
        setContract(contract)
        setProvider(provider)
        setLoading(false)
      } else {
        console.error("Metamask is not installed")
      }
    }
    provider && loadProvider()
  }, [])

  return (
    <>
      <div className="background"></div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="App">
        <div className="title-container">
          <h1>Vault3</h1>
        </div>
        {!modalOpen && (
          <button className="share" onClick={() => setModalOpen(true)}>
            Share
          </button>
        )}
        {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}
        <p>Account: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}</p>
        <div className="content">
          <FileUpload account={account} provider={provider} contract={contract} />
          <Display contract={contract} account={account} />
        </div>
      </div>
    </>
  )
}

export default App

