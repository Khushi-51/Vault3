import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    setLoading(true);
    setErrorMessage("");

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }

      const isEmpty = !dataArray || Object.keys(dataArray).length === 0;

      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        const files = str_array.map((item, i) => (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <div className="file-item">
              📄 File {i + 1}
            </div>
          </a>
        ));
        setData(files);
      } else {
        setErrorMessage("No files to display");
      }
    } catch (e) {
      setErrorMessage("You don't have access or an error occurred");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="address-input">
        <input type="text" placeholder="Enter Address" className="address"></input>
        <button className="get" onClick={getdata} disabled={loading}>
          {loading ? "Loading..." : "Get Files"}
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="file-list">{data}</div>
    </>
  );
};

export default Display;