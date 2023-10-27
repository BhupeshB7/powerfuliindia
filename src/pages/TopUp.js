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
  //for navigate user
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
      console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);
  useEffect(() => {
    // Fetch data based on userID
    axios.get(`https://mlm-production.up.railway.app/api/topupHistory/${data.userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [data.userId]);

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items for the current page
  // const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = Array.isArray(userData) ? userData.slice(indexOfFirstItem, indexOfLastItem) : [];


  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="100px"
          width="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }
  
  return (
    <div>
      {token ? (
    <div className='topUPBg'>
      <h4 className='text-center text-success p-4'>TopUp History: {data.userId}</h4>
      <div className='table-responsive'>
        <Container>
        <Table striped bordered hover  style={{
           border:'2px solid black'
        }}>
        <thead>
          <tr style={{
           color:'#000428'
        }}>
            <th className='text-center'>Name</th>
            <th className='text-center '>Amount</th>
            <th className='text-center '>UserId</th>
            <th className='text-center '>Transfer Id</th>
            <th >Date</th>
            {/* Add more table headers for additional fields */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item._id} className='text-dark'>
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
  <h6 className="text-center text-secondary">Re login to continue...</h6>
  <Link to="/login"  style={{textDecoration:'underline'}}><p className="text-center text-primary">Login</p></Link>
  </>
)}
</div>
  );
}

export default Topup;
