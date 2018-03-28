import {Map} from 'immutable'

const MOVE = "MOVE";

export const move = (player, position) => ({type: MOVE, player, position})

export default function reducer(state = {board: new Map(),
turn: "X"}, action) {
  // TODO
  switch (action.player) {
    case "X":
      return {board: state.board.setIn(action.position, "X"), turn: "O"}
    case "O":
      return {board: state.board.setIn(action.position, "O"), turn: "X"}
    default:
      return state
  }
}

const streak = (board, firstCoord, ...coords) => {
  const first = board.getIn([firstCoord]);
  coords.forEach((...coords) => {
    if (first !== board.getIn(coord)) {
      return undefined;
    }
  });
  return first;
}

const winner = (board) => {
  //Check rows to see if winner, if so return winner
  let diagDown = streak(board, [0, 0], [1, 1], [2, 2]);
  if (diagDown) return diagDown;

  let diagUp = streak(board, [0, 2], [1, 1], [2, 0]);
  if (diagUp) return diagUp;

  let row1 = streak(board, [0, 0], [0, 1], [0, 2]);
  if (row1) return row1;

  let row2 = streak(board, [1, 0], [1, 1], [1, 2]);
  if (row2) return row2;

  let row3 = streak(board, [2, 0], [2, 1], [2, 2]);
  if (row3) return row3;

  let col1 = streak(board, [0, 0], [1, 0], [2, 0]);
  if (col1) return col1;

  let col2 = streak(board, [0, 1], [1, 1], [2, 1]);
  if (col2) return col2;

  let col3 = streak(board, [0, 2], [1, 2], [2, 2]);
  if (col3) return col3;

  //check and see if any unoccipied spaces, if so continue game, if not return draw

  for(let r = 0; r < 3; r++) {
    for(let c = 0; c < 3; c++) {
      if(!board.hasIn([r, c])) {
        return null;
      }
    }
  }
  return "Draw!";
}