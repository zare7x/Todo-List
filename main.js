window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const newTask = document.querySelector("#add-form")
  newTask.addEventListener("submit" , e => {
    e.preventDefault();
    
    const task = e.target.elements.task.value;
    tasktr = task.trimStart()
    tasks.push(tasktr)
    localStorage.setItem("tasks",JSON.stringify(tasks))

    e.target.reset()

    display()
  })
  display()
})

function display() {
  const list = document.querySelector("#list")
  list.innerHTML = ""
  tasks.forEach(task => {
    const item = document.createElement("div")
    item.classList.add("item")
    const content = document.createElement("div")
    content.classList.add("content")
    const checkbox = document.createElement("div")
    const edits = document.createElement("div")
    const edit = document.createElement("button")
    const save = document.createElement("button")
    save.classList.add("editactive")
    edits.classList.add("edits")
    edit.classList.add("edit")
    const deletee = document.createElement("button")
    deletee.classList.add("delete")
    content.innerHTML += `<input type="text" value="${task}" readonly>`
    edit.innerHTML = "Edit"
    deletee.innerHTML = "Delete"
    edits.appendChild(edit)
    edits.appendChild(deletee)

    item.appendChild(content)
    
    item.appendChild(edits)
    list.appendChild(item)

    
    
    edit.addEventListener("click" , e => {
      const input = content.querySelector("input[type='text']")
      input.style.color = "rgba(91, 0, 228, 0.762)"
      input.style.fontWeight = "700"
      item.style.backgroundColor = "white"
      deletee.classList.remove("delete")
      deletee.classList.add("deletenon")
      input.removeAttribute("readonly")
      edit.innerHTML = "Save"
      
      edit.classList.add("editactive")
      input.focus()
      input.setSelectionRange(input.value.length,input.value.length)
      input.addEventListener("blur" , e => {
        input.setAttribute("readonly" , true)
        if (e.target.value != "") {
        const taskIndex = tasks.indexOf(task);
        tasks[taskIndex] = e.target.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        display();
        })
      })

      deletee.addEventListener("click" , e => {
        
        item.classList.add("hidden")

        setTimeout(function(){
          
          tasks = tasks.filter(t => t != task)
          localStorage.setItem("tasks",JSON.stringify(tasks))
          display()}, 300);
          
    })
    item.addEventListener("click", e => {
      if (item.classList.contains("itemdone")) {
        item.classList.remove("itemdone")
        localStorage.setItem("item",unchecked)
        
      }
      else {
        item.classList.add("itemdone")
        localStorage.setItem("item",checked)
      }
      
    })
    
  })
  if (tasks.length != 0) {
    const nums = document.querySelector(".nums")
    nums.innerHTML = `${tasks.length}`
  }
  else {
    const nums = document.querySelector(".nums")
    nums.innerHTML = `0`
  }
  if (tasks.length != 0) {
    const clear = document.querySelector("#clear")
    clear.classList.remove("hidden")
    clear.innerText = "CLEAR"
    clear.classList.add("clear")
    if (tasks.length > 1) {
      clear.addEventListener("click", function() {
        tasks = []
        localStorage.setItem("tasks",JSON.stringify(tasks))
        display()
      })
      clear.classList.remove("cleardis")
      clear.classList.add("clear")
      clear.disabled = false
      
    }
    else {
      clear.classList.remove("clear")
      clear.classList.add("cleardis")
      clear.disabled = true
    }
    
  }
  else {
    const clear = document.querySelector("#clear")
    clear.classList.add("hidden")
    setTimeout(() => {
      clear.innerText = ""
      clear.classList.remove("clear")
    },300)
    
  }
}

