const form = document.getElementById("form");
const container = document.getElementById("container");
const paginationContainer = document.getElementById("pagination");


// Obtener las tareas almacenadas en el localStorage al cargar la página
let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
let currentPage = 1;
const tasksPerPage = 5;

// Función para mostrar las tareas en el HTML
const showTodos = (todo, index) => {
  let html = `<ul class="todos">    
  <li>${todo.title}</li>
      <li>${todo.description}</li>
      <button onclick="editTodo(${index})" class="todo__btn">Editar</button>
      <button onclick="deleteTodo(${index})" class="todo__btn">Borrar</button></ul>`;
  return html;
};

// Función para renderizar todas las tareas en el contenedor
const renderTodos = () => {
  container.innerHTML = "";
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const tasksToShow = allTodos.slice(startIndex, endIndex);
  tasksToShow.map((task, index) => {
    return (container.innerHTML += showTodos(task, startIndex + index));
  });
  adjustContainerHeight();
  renderPagination();
};

const adjustContainerHeight = () => {
  const todos = document.querySelectorAll(".todos");
  let containerHeight = 0;

  todos.forEach((todo) => { console.log({todo: todo.offsetHeight})
    containerHeight += todo.offsetHeight;
  });

  container.style.height = `${containerHeight}px`;
};

const renderPagination = () => {
  const totalPages = Math.ceil(allTodos.length / tasksPerPage);
  console.log(allTodos.length)
  let paginationHTML = "";

  if (totalPages > 1) {
    paginationHTML += `<button onclick="previousPage()" class="pagination__btn">Anterior</button>`;
    paginationHTML += `<button onclick="nextPage()" class="pagination__btn">Siguiente</button>`;
  }

  paginationContainer.innerHTML = paginationHTML;
};

// Agregar evento al formulario para guardar una tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const errorMessage = document.getElementById("error__message");
  console.log(errorMessage);

  const isInvalidInputFields = title === "" || description === "";

  if (isInvalidInputFields) {
    errorMessage.innerText = "Please fill out the following information";
    errorMessage.style.display = "block";

    setTimeout(() => {
      errorMessage.innerText = "";
      errorMessage.style.display = "none";
    }, 3000);
    return;
  }
  errorMessage.innerText = "";
  errorMessage.style.display = "none";

  const formValues = {
    title: title,
    description: description
  };

  allTodos.push(formValues);

  localStorage.setItem("todos", JSON.stringify(allTodos));

  renderTodos();
  form.reset();
});
renderTodos();

const deleteTodo = (index) => {
  // Utilizar filter para crear un nuevo array sin la tarea a eliminar
  allTodos = allTodos.filter((_, i) => i !== index);

  // Guardar las tareas actualizadas en el localStorage
  localStorage.setItem("todos", JSON.stringify(allTodos));

  // Renderizar las tareas actualizadas
  renderTodos();
};

const editTodo = (index) => {
  // Utilizar find para obtener la tarea correspondiente al índice
  const todo = allTodos.find((_, i) => i === index);

  // Actualizar los valores en el formulario
  document.getElementById("title").value = todo.title;
  document.getElementById("description").value = todo.description;

  // Eliminar la tarea del array utilizando filter
  allTodos = allTodos.filter((_, i) => i !== index);

  // Guardar las tareas actualizadas en el localStorage
  localStorage.setItem("todos", JSON.stringify(allTodos));

  // Renderizar las tareas actualizadas
  renderTodos();
};

const previousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    renderTodos();
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(allTodos.length / tasksPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTodos();
  }
};