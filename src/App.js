import React, { useState, useEffect } from 'react';
import './App.css';

// importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  // RUN ONCE
  useEffect(()=> {
    getLocalTodos();
  }, []);

  //Use effect
  useEffect(() => {
    console.log("Hey");
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);
  // functions
  const filterHandler = () => {
    switch (status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
      <div className="App">
        <header>
          <h1>Oscar's Todo List</h1>
        </header>
        <Form
            todos={todos}
            setTodos={setTodos}
            inputText={inputText}
            setInputText={setInputText}
            setStatus={setStatus}
        />
        <TodoList
            filteredTodos={filteredTodos}
            setTodos={setTodos}
            todos={todos}
        />
      </div>
  );
}

export default App;
