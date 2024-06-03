import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [showFinished, setshowFinished] = useState(true);

    useEffect(() => {
      let todoString = localStorage.getItem("todos")
      if(todoString){
        let todos = JSON.parse(localStorage.getItem("todos")) 
        setTodos(todos)
      }
    }, [])

    const saveToLS = (params) => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }

    const handleAdd = () => {
      setTodos([...todos,{id:uuidv4() ,todo,isCompleted: false}])
      setTodo("")
      saveToLS()
    }

    const  handleEdit = (e,id) => {
      let t = todos.filter(i => {
        return i.id === id
      });

      setTodo(t[0].todo)
      let newTodos = todos.filter( item =>  {
        return item.id !== id} );

      setTodos(newTodos)
      saveToLS()
    }

    const handleDelete = (e,id) => {
      let newTodos = todos.filter( item =>  {
        return item.id !== id;
      });

      setTodos(newTodos)
      saveToLS()
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const toggleFinished = (e) => {
        setshowFinished(!showFinished)
    }
    
    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item =>{
          return item.id === id;
        })

        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        saveToLS()
    }


  return (
    <>
      <Navbar/>

      <div className="mx-3 md:container md:mx-auto  rounded-xl  my-5 p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage Your ToDo at one Place</h1>

        <div className="addtodo my-5 gap-4">
          <h2 className='font-bold text-2xl my-2 '>ADD a To-Do</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder="Enter a To-Do" className='w-3/4 rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 mx-2 rounded-full font-bold text-white text-sm disabled:bg-violet-500'>Save</button>
        </div>

        <div className='flex gap-3 my-5'>
            <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
            <label htmlFor='show'>Show Finished</label>
        </div>  

        <div className='h-[2px] bg-black  w-[90%]  my-3'></div>

        <h2 className='font-bold text-2xl'>Your To-DoS</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>  }
          {todos.map(item => {

            return(showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex mx-5 my-5 justify-between"}>
              <div className='flex w-[50%] gap-5'>
                <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 mx-2 rounded-md font-bold text-white text-sm'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 mx-2 rounded-md font-bold text-white text-sm'><MdDelete /></button>
              </div>

            </div> 
          })}
        </div>

      </div>

    </>
  )
}

export default App
