const form = document.getElementById("form");
const container = document.getElementById("container");

// Obtener las tareas almacenadas en el localStorage al cargar la página
let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Función para mostrar las tareas en el HTML
const showTodos = (todo, index) => {
  let html = `
      <li>${todo.title}</li>
      <li>${todo.description}</li>
      <button onclick="editTodo(${index})">Editar</button>
      <button onclick="deleteTodo(${index})">Borrar</button>`;
  return html;
};

// Función para renderizar todas las tareas en el contenedor
const renderTodos = () => {
  container.innerHTML = "";
  allTodos.map((task, index) => {
    return (container.innerHTML += showTodos(task, index));
  });
};

// Agregar evento al formulario para guardar una tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const errorMessage = document.getElementById("error__message");
  console.log(errorMessage)

  const isInvalidInputFields = title === "" || description === "";

  if (isInvalidInputFields) {
    errorMessage.innerText = "Please fill out the following information";
    errorMessage.style.display = "block";

    setTimeout(() => {
      errorMessage.innerText = "";
      errorMessage.style.display = "none"
    }, 3000)
    return;
  }
    errorMessage.innerText = "";
    errorMessage.style.display = "none";


  const formValues = {
    title: title,
    description: description,
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
