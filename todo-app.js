const todos=getSavedTodos()
 
filters={
    text:"",
    hideDoneTasks:null
   
}



renderTodos(todos,filters)

document.getElementById("Filtering").addEventListener('input',(e)=>{
    filters.text=e.target.value
    renderTodos(todos,filters)
})

document.querySelector("form").addEventListener('submit',(e)=>{
    e.preventDefault()

    todos.push({text:e.target.elements.Task.value,
                done:false,
                id:uuidv4()
    })
    saveTodos(todos)
    renderTodos(todos,filters)
    e.target.elements.Task.value=""

})

document.getElementById('hideCompleted').addEventListener('change',(e)=>{
   let hideCompletedTask=e.target.checked 
   filters.hideDoneTasks=hideCompletedTask
   renderTodos(todos,filters)
})

