function SingleTask({ info }) {

    const [task, session] = info;

    const handleCheckTask = () => {
        // window.alert("Task id is", task.id)
    };

    return (
        <>
            <div >
                <button id='check-task-button' onClick={handleCheckTask()}>
                    <i class="fa-regular fa-circle" ></i>
                </button>
                <span>
                    {task.task_name}
                </span>

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
            </div>



        </>
    )
}



export default SingleTask;
