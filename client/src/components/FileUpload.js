import { useState } from "react"
import axios from "axios"

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("No image selected")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      try {
        const formData = new FormData()
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Enter Your Key`,
            pinata_secret_api_key: `Enter Your Secret Key`,
            "Content-Type": "multipart/form-data",
          },
        })
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`
        await contract.add(account, ImgHash)
        alert("Successfully Image Uploaded")
        setFileName("No image selected")
        setFile(null)
      } catch (e) {
        alert("Unable to upload image to Pinata")
      }
    }
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(e.target.files[0])
    }
    setFileName(e.target.files[0].name)
    e.preventDefault()
  }

  return (
    <div className="file-upload">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
        <p className="file-name">{fileName}</p>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  )
}

export default FileUpload

