import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
  todocreate: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const todocreate = useStyles();

  // when the app loads, need to listen to the database 
  // and fetch new todos as they get added or removed
  useEffect(() => {
    //this will fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // don't refresh the page when submitting
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }) // store data to database
    setTodos([...todos, input]); // add the input value to the todos array
    setInput(''); // clear up the input field after submitting
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>🔥 Simple To-Do List App 🔥</h1>
        <h4>by <a href="https://github.com/ismlhbb">@ismlhbb</a></h4>
      </div>

      <div className="App-todocreate">
        <form className={todocreate.todocreate}>
          <FormControl>
            <InputLabel>Create a new TO-DO</InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} />
          </FormControl>
          <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>
            Add To-Do
          </Button>
        </form>
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
