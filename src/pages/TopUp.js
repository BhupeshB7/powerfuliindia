import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Container } from 'react-bootstrap';
import spinner from "../assets/spinner2.gif";
import { Link } from 'react-router-dom';

function Topup() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
      console.log(result); // Check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  // Fetch top-up history based on userID
  useEffect(() => {
    if (data.userId) {
      axios.get(`https://mlm-production.up.railway.app/api/topupHistory/${data.userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [data.userId]);

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items for the current page
  const currentItems = Array.isArray(userData) ? userData.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <div className='topUPBg'>
          <h4 className='text-center text-success p-4'>TopUp History: {data.userId}</h4>
          <div className='table-responsive'>
            <Container>
              <Table striped bordered hover style={{ border: '2px solid black' }}>
                {/* Rest of your table rendering code */}
              </Table>
            </Container>
          </div>

          <Pagination>
            {Array.from({ length: Math.ceil(userData.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      ) : (
        <>
          <h6 className="text-center text-secondary">Re-login to continue...</h6>
          <Link to="/login" style={{ textDecoration: 'underline' }}>
            <p className="text-center text-primary">Login</p>
          </Link>
        </>
      )}
    </div>
  );
}

export default Topup;
