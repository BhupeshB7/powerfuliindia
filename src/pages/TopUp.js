import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Container, Button } from "react-bootstrap";
import spinner from "../assets/spinner2.gif";
import { Link } from "react-router-dom";

function Topup() {
  const [topUpdata, settopUpData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
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
      // console.log(result); // Check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  axios
        .get(
          `https://mlm-production.up.railway.app/api/topupHistory/${data.userId}`
        )
        const { topUpdata, currentPage, totalPages } = response.data;

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
          <h4 className="text-center text-success p-4">
            TopUp History: {data.userId}
          </h4>
          <div className="table-responsive">
            <Container>
              <div className="table-responsive">
                <Container>
                  <Table
                    striped
                    bordered
                    hover
                    style={{ border: "2px solid black" }}
                  >
                    <thead>
                      <tr style={{ color: "#000428" }}>
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
                        <tr key={item._id} className="text-dark">
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                          <td>{item.userId}</td>
                          <td>{item.targetUserId}</td>
                          <td>{item.createdAt}</td>
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
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous Page
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
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
