import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import spinner from "../assets/spinner2.gif";
import { Link } from "react-router-dom";

function Topup() {
  const [data, setData] = useState([]);
  const [topUpdata, settopUpData] = useState([]);
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
          `https://mlm-production.up.railway.app/api/topupHistory/${data.userId}`
        );
        const { topUpdata, currentPage, totalPages } = response.data;
        console.log(topUpdata);
        settopUpData(topUpdata);
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
          <h4 className="text-center text-warning p-4">
            Hello, {data.name}
          </h4>
          <h6 className="text-center text-light">TopUp History...</h6>
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
                        <th className="text-center">Name</th>
                        <th className="text-center">Amount</th>
                        <th className="text-center">UserId</th>
                        <th className="text-center">Transfer Id</th>
                        <th>Date</th>
                        {/* Add more table headers for additional fields */}
                      </tr>
                    </thead>
                    <tbody>
                      {topUpdata.map((item) => (
                        <tr key={item._id} className="text-light">
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                          <td>{item.userId}</td>
                          <td>{item.targetUserId}</td>
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
              className="m-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <h6>
              Page {currentPage} of {totalPages}
            </h6>
            <Button
              className="m-1"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next Page
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

export default Topup;
