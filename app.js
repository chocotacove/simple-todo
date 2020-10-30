const todoInput = document.querySelector('#input');
const submitButton = document.querySelector('#btn');
const list = document.querySelector('#list');
const option = document.querySelector('.filter')

document.addEventListener('DOMContentLoaded', getLocalStorage)
submitButton.addEventListener('click', addToDo)
list.addEventListener('click', todoCheck)
option.addEventListener('click', filterList)

function addToDo(event) {
  event.preventDefault();
  if (todoInput.value === '') {
    return false;
  }
  saveLocally(todoInput.value);
  const newDiv = document.createElement('div');
  newDiv.classList.add('todo');
  const newLi = document.createElement('li');
  newLi.innerText = todoInput.value;
  newLi.classList.add('todo-item');
  newDiv.appendChild(newLi);
  const tickButton = document.createElement('button');
  tickButton.innerHTML = '<i class="fas fa-check-circle"></i>'
  tickButton.classList.add('todo-complete')
  newDiv.appendChild(tickButton)
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>'
  deleteButton.classList.add('todo-delete')
  newDiv.appendChild(deleteButton)

  list.appendChild(newDiv);
  todoInput.value = '';
}

function todoCheck(event) {
  if (event.target.classList[0] === 'todo-delete') {
    event.target.parentElement.remove();
    removeItem(event.target.parentElement);
  }
  if (event.target.classList[0] === 'todo-complete') {
    event.target.parentElement.classList.toggle('complete')
  }
}

function filterList(event) {
  const todoList = list.childNodes;
  todoList.forEach(item => {
    switch (event.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "done":
        if (item.classList.contains('complete')) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-done":
        if (!item.classList.contains('complete')) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  })
}

function checkStorage() {
  let itemsList;
  if (localStorage.getItem('itemsList') === null) {
    itemsList = [];
  } else {
    itemsList = JSON.parse(localStorage.getItem('itemsList'));
  }
  return itemsList;
}
function saveLocally(item) {
  let itemsList = checkStorage();
  itemsList.push(item)
  localStorage.setItem('itemsList', JSON.stringify(itemsList));
}

function getLocalStorage() {
  let itemsList = checkStorage();
  itemsList.forEach(item => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');
    const newLi = document.createElement('li');
    newLi.innerText = item;
    newLi.classList.add('todo-item');
    newDiv.appendChild(newLi);
    const tickButton = document.createElement('button');
    tickButton.innerHTML = '<i class="fas fa-check-circle"></i>'
    tickButton.classList.add('todo-complete')
    newDiv.appendChild(tickButton)
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>'
    deleteButton.classList.add('todo-delete')
    newDiv.appendChild(deleteButton)

    list.appendChild(newDiv);

  })
}

function removeItem(item) {
  let itemsList = checkStorage();
  let remove = item.children[0].innerText;
  console.log(itemsList.indexOf(remove))
  itemsList.splice(itemsList.indexOf(remove), 1);
  localStorage.setItem('itemsList', JSON.stringify(itemsList))
}
