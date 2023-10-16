import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const TransferForm = ({ sourceUserId }) => {
  const [targetUserId, setTargetUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend API
      const response = await axios.post(
        "https://mlm-production.up.railway.app/api/transferTopupWallet",
        {
          sourceUserId,
          targetUserId,
          amount: parseFloat(amount),
        }
      );

      // Display a success message
      setMessage(response.data.message);
      setError("");
      // Reset the form
      setTargetUserId("");
      setAmount("");
      setMessage("");
      // Reload the page
      // window.location.reload();
    } catch (error) {
      // Display an error message if the transfer fails
      setMessage("");
      setError(error.response.data.error);
      // Reset the form
      setTargetUserId("");
      setAmount("");
      setMessage("");
    }
  };

  return (
    <div>
      <h6 className="text-center text-warning mt-3">
        Transfer Topup Wallet Amount
      </h6>
      <div className="transferWallet">
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleTransfer}>
          <div>
            <label>Source User ID:</label>
            <input type="text" value={sourceUserId} readOnly />
          </div>
          <div>
            <label>Target User ID:</label>
            <input
              type="text"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Transfer Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button variant="info" className="mt-2" type="submit">
            Transfer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
