import React from "react";

const Game = () => {
    const handleGame = () => {
        window.location.href = "/game/colorpridiction";
    }
  return (
    <div>
      <div
        className="container pt-5"
        style={{ background: "#000428", height: "100vh" }}
      >
        <div className="row">
        <h6 className="text-warning " style={{marginRight:'0px'}}>Latest Game</h6>
          <div
            className="col-10 col-sm-10 col-md-6 col-lg-6 balanceCard d-flex align-items-center flex-column" style={{width:'70%'}}
            onClick={handleGame}
          >
            <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/artificial-game-3460208-2892839.png?f=avif&w=256" height='100px' width='100px'/>
            <h6>Color Prediction</h6>
          </div>
          <h6 className="text-warning">UpComing Game</h6>
          <div
            className="col-10 col-sm-10 col-md-6 col-lg-6 balanceCard d-flex align-items-center flex-column" style={{width:'70%'}}
            
          >
            <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/big-six-wheel-2-1084832.png?f=avif&w=256" height='100px' width='100px'/>
            <h6 className="mt-2">Spin Wheel</h6>
          </div>
        </div>
        
      </div>
     
    </div>
  );
};

export default Game;
