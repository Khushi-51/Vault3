
import { useState } from "react"
import axios from "axios"
import "./FileUpload.css"

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("No file selected")
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      try {
        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Enter API Key`,
            pinata_secret_api_key: `Enter secret Api Key`,

            "Content-Type": "multipart/form-data",
          },
        })
        const FileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        await contract.add(account, FileHash)
        setUploading(false)
        showNotification("File uploaded successfully!")
        setFileName("No file selected")
        setFile(null)
      } catch (e) {
        setUploading(false)
        showNotification("Error uploading file", "error")
      }
    }
  }

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0]
    if (data) {
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(data)
      reader.onloadend = () => {
        setFile(data)
      }
      setFileName(data.name)
    }
    e.preventDefault()
  }

  return (
    <div className="file-upload-container">
      <div className="upload-card">
        <h2>Upload File</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-input-container">
            <label htmlFor="file-upload" className="file-input-label">
              <span className="file-icon">📁</span>
              <span>Choose File</span>
            </label>
            <input
              disabled={!account || uploading}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
            />
          </div>
          
          <div className="file-name-container">
            <p className="file-name">{fileName}</p>
          </div>
          
          <button 
            type="submit" 
            className={`upload-button ${uploading ? 'uploading' : ''}`}
            disabled={!file || uploading || !account}
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FileUpload
