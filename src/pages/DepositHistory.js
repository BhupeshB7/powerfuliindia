import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import spinner from "../assets/spinner2.gif";
import { Link } from "react-router-dom";

function DepsoitHistory() {
  const [data, setData] = useState([]);
  const [depositData, setdepositData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      // console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/topupHistory/${userId}`
          `https://mlm-production.up.railway.app/api/deposit/depositHistory/${data.userId}`
        );
        const { depositData, currentPage, totalPages } = response.data;
        // console.log(depositData);
        setdepositData(depositData);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data.userId, currentPage]);
  if (isLoading) {
    return (
      <div className="text-center" style={{ marginTop: "70px" }}>
        <img src={spinner} alt="spinner" height="100px" width="100px" />
      </div>
    );
  }

  return (
    <div>
      {token ? (
        <div className="topUPBg">
          <h4 className="text-center text-warning pt-4">Hello, {data.name}</h4>
          <h6 className="text-center text-light">Deposit History...</h6>
          <div className="table-responsive">
            <Container>
              <div className="table-responsive">
                <Container>
                  <Table
                    striped
                    bordered
                    hover
                    style={{ border: "2px solid white" }}
                  >
                    <thead>
                      <tr style={{ color: "yellow" }}>
                        <th className="text-center">#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">UserId</th>
                        <th className="text-center">Amount</th>
                        <th className="text-center">Transaction Id</th>
                        <th className="text-center">Status</th>
                        <th>Date</th>
                        {/* Add more table headers for additional fields */}
                      </tr>
                    </thead>
                    <tbody>
                      {depositData.map((item, index) => (
                        <tr key={item._id} className="text-light">
                          <td>{index +1}</td>
                          <td>{item.name}</td>
                          <td>{item.userID}</td>
                          <td>{item.amount}</td>
                          <td>{item.transactionId}</td>
                          <td>{item.isApproved?'Approved':'Pending'}</td>
                          {/* <td>{item.createdAt}</td> */}
                          <td>
                            {new Date(item.createdAt).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </td>
                          {/* Add more table cells for additional fields */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </div>
            </Container>
          </div>

          <div>
            <Button
              variant="warning"
              className="m-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <label className="text-light">
              Page {currentPage} of {totalPages}
            </label>
            <Button
              variant="warning"
              className="m-1"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h6 className="text-center text-secondary">
            Re-login to continue...
          </h6>
          <Link to="/login" style={{ textDecoration: "underline" }}>
            <p className="text-center text-primary">Login</p>
          </Link>
        </>
      )}
    </div>
  );
}

export default DepsoitHistory;
