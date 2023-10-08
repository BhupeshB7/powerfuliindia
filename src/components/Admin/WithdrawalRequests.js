import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function  WithdrawalRequests() {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [withdrawalQuerySearch, setWithdrawalQuerySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transaction, setTransaction] = useState("");
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState('');
  const [income, setIncome] = useState('');
  const [selfIncome, setSelfIncome] = useState('');
  const [teamIncome, setTeamIncome] = useState('');
  const [withdrawal, setWithdrawal] = useState('');
  const [rewards, setRewards] = useState('');
  const handleWalletSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mlm-production.up.railway.app/api/users/userWalletUpdating/",
        {
          userId,
          balance,
          income,
          selfIncome,
          teamIncome,
          withdrawal,
          rewards,
        }
      );
      // console.log(response.data); // User wallet updated successfully
      alert("Wallet updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch data from your backend API with pagination and search
    fetch(
      `https://mlm-production.up.railway.app/api/withdraw/withdrawals?search=${withdrawalQuerySearch}&page=${currentPage}`
      // http://localhost:5000/api/withdraw/withdrawals
    )
      .then((response) => response.json())
      .then((data) => {
        setWithdrawalRequests(data.withdrawalRequests);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error(error));
  }, [currentPage, withdrawalQuerySearch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `https://mlm-production.up.railway.app/api/withdraw/withdrawals/${id}`,
        { status: "approved", transaction }
      );
      setWithdrawalRequests(
        withdrawalRequests.map((request) =>
          request._id === id ? response.data : request
        )
      );
      setTransaction("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleWithdrawalDelete = async (request) => {
    try {
      await axios.delete(
        `https://mlm-production.up.railway.app/api/withdraw/withdrawalWallet/${request._id}`
      );
      alert("Deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the user.");
    }
  };
  return (
    <div>
       <Container>
        <div className="form_container">
          <form>
            <h6 className="mt-3 text-primary">Update Wallet</h6>
            <div className="formInput">
              <label> User Id must required! for update wallet.</label>
              {/* <label> User ID:</label> */}
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
              />
              {/* <label> Balance: </label> */}
              <input
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="Balance"
              />

              {/* <label> Income: </label> */}
              <input
                type="text"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="income"
              />

              {/* <label>Self Income: </label> */}
              <input
                type="text"
                value={selfIncome}
                onChange={(e) => setSelfIncome(e.target.value)}
                placeholder="Self income"
              />

              {/* <label> Team Income: </label> */}
              <input
                type="text"
                value={teamIncome}
                onChange={(e) => setTeamIncome(e.target.value)}
                placeholder="Team Income"
              />

              {/* <label>Withdrawal: </label> */}
              <input
                type="text"
                value={withdrawal}
                onChange={(e) => setWithdrawal(e.target.value)}
                placeholder="Withdrawal"
              />

              {/* <label>Rewards:</label> */}
              <input
                type="text"
                value={rewards}
                onChange={(e) => setRewards(e.target.value)}
                placeholder="Rewards"
              />

              <button
                type="submit"
                className="mb-3 btn btn-danger"
                onClick={handleWalletSubmit}
              >
                Update User Wallet
              </button>
            </div>
          </form>
        </div>
      </Container>
      <h6 className="text-center text-secondary">Withdrawal Requests</h6>
      <input
        type="text"
        placeholder="Search users..."
        value={withdrawalQuerySearch}
        onChange={(e) => setWithdrawalQuerySearch(e.target.value)}
      />
      {/* <button
        className="btn btn-primary"
        onClick={() => handlePageChange(1)} // Reset to page 1 when searching
        style={{ marginLeft: "10px" }}
      >
        Search
      </button> */}

      <div className="table-responsive">
        <table className="table table-bordered table-warning">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Account Holder Name</th>
              <th>Account No</th>
              <th>IFSC CODE</th>
              <th>Google Pay</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>TransactionId</th>
              <th>Action</th>
              <th>Delete</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalRequests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request.userId}</td>
                <td>{request.amount}</td>
                <td>{request.accountHolderName}</td>
                <td>{request.accountNo}</td>
                <td>{request.ifscCode}</td>
                <td>{request.GPay}</td>
                <td>{request.status}</td>
                <td>{request.transactionNumber}</td>
                <td>
                  <input
                    type="text"
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                  />
                </td>
                <td>
                  {request.status === "pending" && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleWithdrawalDelete(request)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleString()
                    : "unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="btn btn-outline-primary ms-1"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary ms-3"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WithdrawalRequests;
