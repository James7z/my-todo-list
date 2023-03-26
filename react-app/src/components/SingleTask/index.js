import './SingleTask.css';

function SingleTask({ info }) {

    const [task, session] = info;

    const handleCheckTask = () => {
        // window.alert("Task id is", task.id)
    };

    return (
        <>

            <div className='single-task-container' >
                <span className='single-task-content-container'>
                    <button id='check-task-button' onClick={handleCheckTask()}>
                        <i class="fa-regular fa-circle fa-xl" ></i>
                    </button>
                    <span className='single-task-name-due-date-container'>
                        <div>
                            {task.task_name}
                        </div>
                        <div className='single-task-date-comment-container'>
                            <span>
                                Due date: {task.due_date}
                            </span>
                            <span>
                                <i class="fa-regular fa-comment"></i>
                            </span>

                        </div>

                    </span>
                </span>
                <span className='task-buttons-container'>
                    <span>
                        <button>
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                    </span>
                    <span>
                        <button>
                            <i class="fa-regular fa-comment"></i>
                        </button>
                    </span>
                    <span>
                        <button>
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </span>
                </span>

            </div>

        </>
    )
}



export default SingleTask;
