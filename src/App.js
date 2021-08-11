import "./styles.css";

import { useState } from "react";
import "./styles.css";

const Board = [
  { row: 1, col: [1, 2, 3] },
  { row: 2, col: [4, 5, 6] },
  { row: 3, col: [7, 8, 9] }
];
const PLAYERS = {
  A: "X",
  B: "0"
};

export default function App() {
  const [activeUser, setActiveUser] = useState("A");
  const [appState, setAppState] = useState(new Array(9));

  const switchUser = () => {
    var nextUser = activeUser === "A" ? "B" : "A";
    setActiveUser(nextUser);
  };

  const validateGame = (col, move) => {
    switch (col) {
      case 1: {
        if (appState[2] === move && appState[3] === move) {
          return true;
        } else if (appState[5] === move && appState[9] === move) {
          return true;
        } else if (appState[4] === move && appState[7] === move) {
          return true;
        }
        return false;
      }
      case 2: {
        if (appState[1] === move && appState[3] === move) {
          return true;
        } else if (appState[5] === move && appState[8] === move) {
          return true;
        }
        return false;
      }
      case 3: {
        if (appState[1] === move && appState[2] === move) {
          return true;
        } else if (appState[5] === move && appState[7] === move) {
          return true;
        } else if (appState[6] === move && appState[9] === move) {
          return true;
        }
        return false;
      }
      case 4: {
        if (appState[1] === move && appState[7] === move) {
          return true;
        } else if (appState[5] === move && appState[6] === move) {
          return true;
        }
        return false;
      }
      case 5: {
        if (appState[1] === move && appState[9] === move) {
          return true;
        } else if (appState[4] === move && appState[6] === move) {
          return true;
        } else if (appState[2] === move && appState[8] === move) {
          return true;
        } else if (appState[3] === move && appState[7] === move) {
          return true;
        }
        return false;
      }
      case 6: {
        if (appState[3] === move && appState[9] === move) {
          return true;
        } else if (appState[4] === move && appState[5] === move) {
          return true;
        }
        return false;
      }
      case 7: {
        if (appState[1] === move && appState[4] === move) {
          return true;
        } else if (appState[3] === move && appState[5] === move) {
          return true;
        } else if (appState[8] === move && appState[9] === move) {
          return true;
        }
        return false;
      }
      case 8: {
        if (appState[2] === move && appState[5] === move) {
          return true;
        } else if (appState[7] === move && appState[9] === move) {
          return true;
        }
        return false;
      }
      case 9: {
        if (appState[1] === move && appState[5] === move) {
          return true;
        } else if (appState[3] === move && appState[6] === move) {
          return true;
        } else if (appState[7] === move && appState[8] === move) {
          return true;
        }
        return false;
      }
      default: {
        return false;
      }
    }
  };

  const validateMove = (col) => {
    if (appState[col]) {
      alert(new Error("Wrong Move"));
      return;
    } else {
      appState[col] = PLAYERS[activeUser];
    }
    setAppState(appState);
    const isFinish = validateGame(col, PLAYERS[activeUser]);
    if (isFinish) {
      alert(`Game over ${activeUser} won`);
    }
    switchUser();
  };

  return (
    <table className="App">
      {Board.map((rowData, i) => {
        return (
          <Row
            index={`row_${i}`}
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
        index={`col_${rowData.row}_${j}`}
        col={rowData.col[j]}
        value={appState[rowData.col[j]]}
        validateMove={validateMove}
      />
    );
  }
  return <tr index={rowData.row}>{colData}</tr>;
};

const Col = ({ col, value, validateMove }) => {
  return (
    <td col={col} onClick={() => validateMove(col)}>
      {value}
    </td>
  );
};
