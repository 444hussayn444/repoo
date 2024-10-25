import React from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { add_todo, delete_todo, update_todo } from '../actions/actions'
const Todo = () => {
    //redux setup
    const todos = useSelector(state => state)
    const dispatch = useDispatch()
    // state management setup
    const [input, setInput] = useState("")
    const [editing, setEditing] = useState("")
    const [editedId, setEditedID] = useState(null)
    // setup localstorage
    useEffect(()=>{
        const StoredTasks = JSON.parse(localStorage.getItem("task")) || []
        if(StoredTasks.length > 0){
            StoredTasks.map(task =>{
                return dispatch(add_todo(task.text))
            })
        }
    },[dispatch])

    useEffect(()=>{
       localStorage.setItem("task" , JSON.stringify(todos))
    },[todos])

    // setup functionalty
    const addTask = () => {
        if (input.trim()) {
            dispatch(add_todo(input))
            setInput("")
        }
    }
    // setup for updating the tasks based on thier id value 
    const startEditing = (id, text) => {
        setEditedID(id)
        setEditing(text)
    }
    const updateTask = () => {
        if (editing.trim()) {
            dispatch(update_todo(editedId, editing))
            setEditedID(null)
            setEditing("")
        }
    }
    //setup for deleting
    const deleteTask = (id) => {
         dispatch(delete_todo(id))
    }
    //setup clock
    useEffect(()=>{
      function getTime(){
        const date = new Date()
        let houre = date.getHours() 
        const  minutes = date.getMinutes() 
        const secondes = date.getSeconds() 
        houre = houre % 12
        houre = houre >= 0 ? houre : 12 
        let time = document.querySelector(".date")
         time.innerHTML = `${houre.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${secondes.toString().padStart(2,'0')}`  
      }  
      getTime()
      setInterval(()=>getTime(),1000)
    },[])

    return (
        <div className='container'>
            <div className='date' >

            </div>
            <div className='todo-container'>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='input' type='text' placeholder='Enter Thing To Do' />
                <button className='btnadd' onClick={addTask}>Add</button>
            </div>
            <div className='tasks-container'>
                {todos.map(task => {
                    return <div>
                        {
                            editedId === task.id ?
                                (<div style={{display:"flex"}}>
                                    <input placeholder={task.text} value={editing} onChange={(e) => setEditing(e.target.value)} type='text' className='task' />
                                    <button className='updatebtn' onClick={updateTask}>Update</button>
                                </div>) :
                                (<h2 className='task' key={task.id} id={task.id}>
                                    💠 {task.text}
                                    <span className='mother'>
                                        <span className='spanup'><i class='bx bx-pencil update' onClick={() => startEditing(task.id, task.text)}></i></span>
                                        <span className='spandel'><i class='bx bx-x-circle delete' onClick={()=>deleteTask(task.id)}></i></span>
                                    </span>
                                </h2>)
                        }
                    </div>
                }
                )}
            </div>
        </div>
    )
}

export default Todo