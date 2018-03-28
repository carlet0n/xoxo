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