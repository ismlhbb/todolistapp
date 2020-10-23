// "Todo" functional component
import React, { useState } from 'react';
import './Todo.css';
import { IconButton, Button, List, ListItem, ListItemText, Typography, Modal, FormControl, InputLabel, Input } from '@material-ui/core';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 250,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    todolist: {
        margin: theme.spacing(1),
        width: '33ch',
        maxWidth: '33ch',

    },
    inline: {
        display: 'inline',
    },
    modal: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));


function Todo(props) {
    const [modalStyle] = React.useState(getModalStyle);
    const todolist = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        // update the todo with the new input data
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        setOpen(false);
    }

    return (

        <div>
            <Modal
                open={open}
                onClose={e => setOpen(false)}>
                <div style={modalStyle} className={todolist.paper}>
                    <div className="App-modal">
                        <form className={todolist.modal}>
                            <h3>Edit your todo</h3>
                            <FormControl>
                                <InputLabel>{props.todo.todo}</InputLabel>
                                <Input value={input} onChange={event => setInput(event.target.value)} />
                            </FormControl>
                            <Button size="small" variant="contained" color="primary" onClick={updateTodo}>Update</Button>
                        </form>
                    </div>
                </div>
            </Modal>

            <List className={todolist.todolist}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary={props.todo.todo} secondary={
                        <React.Fragment>
                            <Typography component="span" variant="body2" className={todolist.inline} color="textPrimary">
                                Daily Routine
                            </Typography>
                        </React.Fragment>
                    } />

                    <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>

                    <IconButton edge="end" aria-label="delete" onClick={event => {
                        db.collection('todos').doc(props.todo.id).delete();
                    }}>
                        <DoneIcon />
                    </IconButton>

                </ListItem>
            </List>
        </div >
    )
}

export default Todo;
