
//check for existing data at the localstorage

const getSavedTodos=()=>{
    const todosJSON = localStorage.getItem('todos')
    try{
        return todosJSON? JSON.parse(todosJSON) : []
    }catch (e){
        return []
    }

}

//save data tolocalstorage
const saveTodos=(todoList)=>{
    localStorage.setItem('todos', JSON.stringify(todoList))
}
 
//render app todos based on fiters

const renderTodos =(todos, filters)=> {
    const filteredTodos = todos.filter((todo)=>todo.text.toLowerCase().includes(filters.text.toLowerCase()) )

    todosIncomplete = filteredTodos.filter((todos)=>!todos.done)

    document.querySelector('#todos').innerHTML = ''

    const todosLeft=generateSummaryDOM()
    document.querySelector('#todos').appendChild(todosLeft)
    
    if (filters.hideDoneTasks) {
        todosIncomplete.forEach((todo)=> {
            const todoDOM=generateTodoDOM(todo)
            document.querySelector('#todos').appendChild(todoDOM)
        })
    }
    else {
        filteredTodos.forEach((todo)=> {
            const todoDOM=generateTodoDOM(todo)
            document.querySelector('#todos').appendChild(todoDOM)

        })
    }
}

    
//creates the todo dom 

const generateTodoDOM =(todo)=>{
    const todoEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const todoText = document.createElement("span")
    const removeButton = document.createElement("button")

    
    
    checkbox.setAttribute('type','checkbox')
    todoEl.appendChild(checkbox)
    checkbox.checked=todo.done
    todoText.textContent=todo.text
    todoEl.appendChild(todoText)

    removeButton.textContent='x'
    todoEl.appendChild(removeButton)
    
    removeButton.addEventListener('click',(e)=>{
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    
    checkbox.addEventListener('change',(e)=>{
        if(checkbox.checked)
            todo.done = true
        else
            todo.done = false
        saveTodos(todos)
        renderTodos(todos, filters)
       
    })
    return todoEl
}
   //remove todo
   const removeTodo=(id)=>{
     let todosIndex
     let flag=false
    for(let i=0;i<todos.length;i++){
        if(todos[i].id===id){
            todos.splice(i,1)
       }
    }
    
   }
//get the dom elements for list summary

const generateSummaryDOM = ()=>{
    const todosLeftElement = document.createElement('h2')
    todosLeftElement.textContent = `Tasks left :  ${todosIncomplete.length} `
    return todosLeftElement
    
}