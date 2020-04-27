import {
  combineReducers
} from 'redux'
import {
  GET_DATA,
  GET_DETAIL,
  GET_TYPES,
  GET_DATA_BY_TYPE
} from '../enums/mutations'



function types(state = [], action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_TYPES:
      state = payload
      return state;
    default:
      return state
  }
}
function list(state = { results: [] }, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_DATA:
      let { results, next } = payload;
      if (state.next) {
        results = state.results.concat(results);
      }
      return { results, next };
    case GET_DATA_BY_TYPE:
      state = payload
      return state;

    default:
      return state
  }
}
function detail(state = {
  name: "",
  abilities: [],
  moves: [],
  types: []
}, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_DETAIL:
      let {
        id,
        name,
        abilities,
        moves,
        types
      } = payload;

      abilities = abilities.filter(x => !x.is_hidden).map(x => x.ability.name);
      moves = moves.map(x => x.move.name);
      types = types.map(x => x.type.name);

      state = {
        id,
        name,
        abilities,
        moves,
        types
      }
      return state;
    default:
      return state
  }
}
const rootReducer = combineReducers({
  types,
  list,
  detail
})
export default rootReducer
