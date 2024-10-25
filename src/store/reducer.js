import { v4 as uuidv4 } from 'uuid'
import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../actions/actions'


const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: uuidv4(), text: action.payload.text }]
        case UPDATE_TODO:
            return state.map((task) => task.id === action.payload.id ? { id : task.id, text: action.payload.text } : task)
        case DELETE_TODO :
            return state.filter(task => task.id !== action.payload.id)
         default:
            return state       
    }
}

export default reducer
