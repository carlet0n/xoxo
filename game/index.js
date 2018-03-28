import {Map} from 'immutable'

const MOVE = "MOVE";

export const move = (player, position) => ({type: MOVE, player, position})

const turnReducer = (turn = 'X', action) => {
  if (action.type === MOVE) {
    return turn === 'X' ? 'O' : 'X'
  }
  return turn;
}

const boardReducer = (board = Map(), action) => {
  if (action.type === MOVE) {
    return board.setIn(action.position, action.player)
  }
  return board;
}

export const streak = (board, firstCoord, ...coords) => {
  const first = board.getIn(firstCoord);
  for (let i = 0; i < 2; i++) {
    if (first !== board.getIn(coords[i])) {
      return undefined;
    }
  }
  return first;
}

export const winner = (board) => {
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

const bad = (state, action) => {
  if (action.player !== state.turn) return "It's not your turn!";
  if (!Array.isArray(action.coord)) return "That is an invalid input!";
  if (action.coord[0] < 0 || action.coord[0] > 2) return "That's not on the grid!!";
  if (action.coord[1] < 0 || action.cood[1] > 2) return "That's not on the grid!!";
  if (state.board.hasIn(action.coord)) return "That spot is already taken!";
  return null;
}

export default function reducer(state = {}, action) {
  //const error = bad(state, action)
  //console.log(Object.assign({}, state, error))
  //if (error) return Object.assign({}, state, {error})

  const newBoard = boardReducer(state.board, action);
  const isWinner = winner(newBoard)
  return {
    board: newBoard,
    turn: turnReducer(state.turn, action),
    winner: isWinner
  }
}
