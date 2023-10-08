import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const GameHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4); // Number of items per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch game history data from the server
    fetch(`https://mlm-production.up.railway.app/api/withdraw/history?page=${currentPage}&perPage=${perPage}`)
      .then((response) => response.json())
      .then((data) => {
        setGameHistory(data.gameHistory);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error(`Error fetching game history: ${error}`));
  }, [currentPage, perPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h4>Withdrawal History</h4>
        {/* Display game history data */}
          <div className="table-responsive">
          <table className="table table-bordered table-warning">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>UserId</th>
                <th>Amount</th>
                <th>UPI</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.userId}</td>
                  <td>{item.amount}</td>
                  <td>{item.UPI}</td>
                  <td> <Button variant="warning" className="ms-1">{item.approved}</Button></td>
                  {/* Add more table data cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      <div className="pagination">
        {/* Render pagination controls */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button variant='outline-secondary'
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`ms-2 currentPage === index + 1 ? 'active' : ''`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;
