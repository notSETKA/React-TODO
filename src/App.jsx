import React, { useState } from 'react';
import './App.css';

const maxTasks = 6;

function Task({ taskText, isDarkMode, deleteTask, toggleTask, completed }) {
    return (
        <div className={`task ${isDarkMode ? '#C8CBE7' : ''}`}>
            <img 
                src={completed ? './img/Group 4 (1).svg' : './img/unchecked.svg'} 
                alt="Task" 
                onClick={toggleTask} 
            />
            <span className={completed ? 'completed-text' : ''}>{taskText}</span>
            {completed && (
                <button 
                    className="btn" 
                    onClick={deleteTask} 
                    style={{ backgroundColor: isDarkMode ? '#25273D' : '#FFFFFF', color: isDarkMode ? '#C8CBE7' : '#25273D' }}>
                    X
                </button>
            )}
        </div>
    );
}


function App() {
    const [taskInput, setTaskInput] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [taskCount, setTaskCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const updateTasksLeft = () => {
        const tasksLeft = maxTasks - taskCount;
        return `${tasksLeft} item${tasksLeft !== 1 ? 's' : ''} left`;
    };

    const addTask = () => {
        const taskText = taskInput.trim();

        if (taskText === '') {
            alert('Please enter a valid task.');
            return;
        }

        if (taskCount >= maxTasks) {
            alert('Maximum tasks achieved.');
            return;
        }

        const newTaskList = [...taskList, { text: taskText, completed: false }];
        setTaskList(newTaskList);
        setTaskInput('');
        setTaskCount(taskCount + 1);
    };

    const deleteTask = (index) => {
        const newTaskList = [...taskList];
        newTaskList.splice(index, 1);
        setTaskList(newTaskList);
        setTaskCount(taskCount - 1);
    };

    const toggleTask = (index) => {
        const newTaskList = [...taskList];
        newTaskList[index].completed = !newTaskList[index].completed;
        setTaskList(newTaskList);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);

        
        const container = document.querySelector('.container');
        container.classList.toggle('dark-cont');

        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => task.classList.toggle('dark-task'));

        const taskTexts = document.querySelectorAll('.task span');
        taskTexts.forEach(text => {
            text.style.color = isDarkMode ? '#494C6B' : '#C8CBE7';
        });

        const taskInput = document.getElementById('taskInput');
        taskInput.style.backgroundColor = isDarkMode ? '#FFF' : '#25273D';

        const deleteButtons = document.querySelectorAll('.btn');
        deleteButtons.forEach(button => {
            button.style.backgroundColor = isDarkMode ? '#FFFFFF' : '#25273D';
            button.style.color = isDarkMode ? '#25273D' : '#C8CBE7';
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className={`container ${isDarkMode ? 'dark-cont' : ''}`}>
            <div className="img"></div>
            <div className="heading">
                <h1 className="h1">TODO</h1>
                <div className="logo-div">
                    <button className={`dark ${isDarkMode ? 'dark-btn' : ''}`} id="darkModeBtn" onClick={toggleDarkMode}><img src="./img/Combined Shape.svg" alt="" className="logo" /></button>
                </div>
            </div>
            <div className="todo-inpt">
                <input type="text" className={`input ${isDarkMode ? 'dark-input' : ''}`} id="taskInput" placeholder="Create a new todo…" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onKeyPress={handleKeyPress} />
            </div>
            <div className={`todo-list ${isDarkMode ? 'dark-list' : ''}`}>
                {taskList.map((task, index) => (
                    <Task
                        key={index}
                        taskText={task.text}
                        isDarkMode={isDarkMode}
                        deleteTask={() => deleteTask(index)}
                        toggleTask={() => toggleTask(index)}
                        completed={task.completed}
                    />
                ))}
            </div>
            <p className={`drag ${isDarkMode ? 'dark-drag' : ''}`}>Drag and drop to reorder list</p>
        </div>
    );
}



export default App;
