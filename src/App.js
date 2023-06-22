import "./styles.css";

import { useState } from "react";
import "./styles.css";

const Board = [
  { row: 0, col: [0, 1, 2] },
  { row: 1, col: [0, 1, 2] },
  { row: 2, col: [0, 1, 2] }
];
const PLAYERS = {
  A: "X",
  B: "0"
};

export default function App() {
  const [activeUser, setActiveUser] = useState("A");
  const [gameState, setGameState] = useState(0);
  const [appState, setAppState] = useState([...Array(3)].map((x) => Array(3)));

  const switchUser = () => {
    var nextUser = activeUser === "A" ? "B" : "A";
    setActiveUser(nextUser);
  };
  const validateGame = (row, col) => {
    var isRowDone = true,
      isColDone = true,
      isDaigDone = true,
      isRevDaigDone = true;
    var move = PLAYERS[activeUser];
    for (var i = 0; i < 3; i++) {
      if (appState[row][i] !== move) {
        isRowDone = false;
      }
      console.log("appState[i][col]", appState[i][col]);
      if (appState[i][col] !== move) {
        isColDone = false;
      }
      if (appState[i][i] !== move) {
        isDaigDone = false;
      }
      if (appState[i][Board.length - 1 - i] !== move) {
        isRevDaigDone = false;
      }
    }
    console.log(isColDone, isRowDone);
    if (isRowDone || isColDone || isDaigDone || isRevDaigDone) {
      return true;
    }
    return false;
  };

  // simple way to check game
  const validateGame1 = (row, col) => {
    var move = PLAYERS[activeUser];
    var value = `${row}${col}`;
    switch (value) {
      case "00": {
        if (appState[0][1] === move && appState[0][2] === move) {
          return true;
        } else if (appState[1][1] === move && appState[2][2] === move) {
          return true;
        } else if (appState[1][0] === move && appState[2][0] === move) {
          return true;
        }
        return false;
      }
      case "01": {
        if (appState[0][1] === move && appState[0][2] === move) {
          return true;
        } else if (appState[1][2] === move && appState[2][1] === move) {
          return true;
        }
        return false;
      }
      case "02": {
        if (appState[0][1] === move && appState[0][2] === move) {
          return true;
        } else if (appState[1][1] === move && appState[2][0] === move) {
          return true;
        } else if (appState[1][2] === move && appState[2][2] === move) {
          return true;
        }
        return false;
      }
      case "10": {
        if (appState[0][1] === move && appState[2][0] === move) {
          return true;
        } else if (appState[1][1] === move && appState[1][2] === move) {
          return true;
        }
        return false;
      }
      case "11": {
        if (appState[0][1] === move && appState[2][2] === move) {
          return true;
        } else if (appState[1][0] === move && appState[1][2] === move) {
          return true;
        } else if (appState[0][1] === move && appState[2][1] === move) {
          return true;
        } else if (appState[0][2] === move && appState[2][0] === move) {
          return true;
        }
        return false;
      }
      case "12": {
        if (appState[0][2] === move && appState[2][2] === move) {
          return true;
        } else if (appState[0][1] === move && appState[1][1] === move) {
          return true;
        }
        return false;
      }
      case "20": {
        if (appState[0][0] === move && appState[1][0] === move) {
          return true;
        } else if (appState[0][2] === move && appState[1][1] === move) {
          return true;
        } else if (appState[2][1] === move && appState[2][2] === move) {
          return true;
        }
        return false;
      }
      case "21": {
        if (appState[0][1] === move && appState[1][1] === move) {
          return true;
        } else if (appState[2][0] === move && appState[2][2] === move) {
          return true;
        }
        return false;
      }
      case "22": {
        if (appState[0][0] === move && appState[1][1] === move) {
          return true;
        } else if (appState[0][2] === move && appState[1][2] === move) {
          return true;
        } else if (appState[2][0] === move && appState[2][1] === move) {
          return true;
        }
        return false;
      }
      default: {
        return false;
      }
    }
  };

  const validateMove = (row, col) => {
    if (gameState) {
      alert("Game Over");
      return;
    }
    if (appState[row][col]) {
      alert(new Error("Wrong Move"));
      return;
    } else {
      appState[row][col] = PLAYERS[activeUser];
    }
    setAppState(appState);
    const isFinish = validateGame(row, col);
    if (isFinish) {
      setGameState(1);
      setTimeout(() => {
        alert(`Game over ${activeUser} won`);
      }, 100);
    }
    switchUser();
  };
  return (
    <table className="App">
      {Board.map((rowData, i) => {
        return (
          <Row
            index={`row_${i + 1}`}
            rowData={rowData}
            validateMove={validateMove}
            appState={appState}
          />
        );
      })}
    </table>
  );
}

const Row = ({ rowData, validateMove, appState }) => {
  var colData = [];
  for (var j = 0; j < rowData.col.length; j++) {
    colData.push(
      <Col
        row={rowData.row}
        index={`col_${rowData.row}_${j + 1}`}
        col={rowData.col[j]}
        value={appState[rowData.row][rowData.col[j]]}
        validateMove={validateMove}
      />
    );
  }
  return <tr index={rowData.row}>{colData}</tr>;
};

const Col = ({ row, col, value, validateMove }) => {
  return (
    <td col={col} row={row} onClick={() => validateMove(row, col)}>
      {value}
    </td>
  );
};
