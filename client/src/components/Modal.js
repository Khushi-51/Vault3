
import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    try {
      const address = document.querySelector(".address").value;
      if (!address || !contract) {
        alert("Please enter a valid address");
        return;
      }
      await contract.allow(address);
      setModalOpen(false);
    } catch (error) {
      console.error("Error sharing access:", error);
      alert("Error sharing access. Please try again.");
    }
  };

  useEffect(() => {
    const accessList = async () => {
      try {
        if (!contract) return;
        const addressList = await contract.shareAccess();
        let select = document.querySelector("#selectNumber");
        if (!select) return;

        // Clear existing options
        while (select.options.length > 1) {
          select.remove(1);
        }

        addressList.forEach((address) => {
          if (address.access) {
            const option = document.createElement("option");
            option.value = address.user;
            option.textContent = address.user;
            select.appendChild(option);
          }
        });
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };

    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button onClick={() => setModalOpen(false)} id="cancelBtn">
              Cancel
            </button>
            <button onClick={sharing}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
