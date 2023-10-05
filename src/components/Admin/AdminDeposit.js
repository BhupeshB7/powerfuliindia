import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDeposit() {
  const [depositUsers, setDepositUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Assuming you have a search input
  const [isTokenValid, setIsTokenValid] = useState(true);
  const getTokenExpireTime = () => {
    const tokenExpire = localStorage.getItem("tokenExpire");
    return tokenExpire ? parseInt(tokenExpire) : null;
  };
  
  const isTokenExpired = () => {
    const expireTime = getTokenExpireTime();
    return expireTime ? expireTime < Date.now() : true;
  };
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []); 
  useEffect(() => {
    fetchUsers(currentPage); // Fetch users for the initial page
  }, [currentPage, searchQuery]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/deposit/depositusers?page=${page}&search=${searchQuery}`
      );

      setDepositUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleApproved = async (userID) => {
    try {
      await axios.patch(
        `https://mlm-production.up.railway.app/api/deposit/activate/${userID}`
      );
      // const updatedUser = response.data;

      // const updatedUsers = users.map((user) =>
      //   user._id === updatedUser._id ? { ...user, is_active: updatedUser.is_active, activationTime: updatedUser.activationTime } : user
      // );
      // setDepositUsers(response.data);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteDeposit = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this deposit?"
    );
    if (shouldDelete) {
      deleteDeposit(id);
    }
  };

  const deleteDeposit = async (id) => {
    try {
      const response = await axios.delete(
        `https://mlm-production.up.railway.app/api/deposit/delete/${id}`
      );
      // console.log('Deposit deleted');
      alert(response.data);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
   
  
    {isTokenValid?(
  <div>
  <h4 className="text-warning mt-2"> Pending Deposit Fund</h4>
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={handleSearchChange}
  />
  <div className="table-responsive">
    {/* Render the table with depositUsers data */}
    <table className="table table-dark table-bordered table-striped">
      <thead>
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>TransactionId</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through depositUsers and display them */}
        {/* {depositUsers.map((user) => (
          <tr key={user._id}>
            <td>{user.userID}</td>
            <td>{user.name}</td>
            <td>{user.transactionId}</td>
            <td>{user.depositAmount}</td>
            <td>{user.isApproved ? 'Approved':'Pending'}</td>
            <td>{istTime}</td>
            <td>
              <button
                className="btn btn-success sm m-1"
                // onClick={() => handleApproved(user.userID)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger sm m-1"
                // onClick={() => handleDeleteDeposit(user._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))} */}
        {depositUsers.map((user) => {
          // Assuming user.createdAt is a UTC timestamp
          const utcTimestamp = new Date(user.createdAt);

          // Convert UTC to IST
          const istTimestamp = new Date(
            utcTimestamp.getTime() + 5.5 * 60 * 60 * 1000
          ); // 5.5 hours offset for IST

          return (
            <tr key={user._id}>
              <td>{user.userID}</td>
              <td>{user.name}</td>
              <td>{user.transactionId}</td>
              <td>{user.depositAmount}</td>
              <td>{user.isApproved ? "Approved" : "Pending"}</td>
              <td>
                {istTimestamp.toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </td>{" "}
              {/* Display in IST */}
              <td>
                <button
                  className="btn btn-success sm m-1"
                  onClick={() => handleApproved(user._id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger sm m-1"
                  onClick={() => handleDeleteDeposit(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* Add pagination controls */}
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`pagination-button ${
          currentPage === index + 1 ? "active" : ""
        }`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
</div>
    ):(
      <>
      
      </>
    )}
</>
  );
}

export default AdminDeposit;
