// first of all we made the actions 
export const ADD_TODO = "ADD_TODO"
export const UPDATE_TODO = "UPDATE_TODO"
export const DELETE_TODO = "DELETE_TODO"

// what the action really do ?
export const add_todo = (text) =>({
    type:ADD_TODO,
    payload:{text}
})
export const update_todo = (id,text) =>({
    type:UPDATE_TODO,
    payload:{id,text}
})
export const delete_todo = (id) =>({
    type:DELETE_TODO,
    payload:{id}
})

