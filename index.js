const form = document.getElementById("form");
const container = document.getElementById("container");

// Obtener las tareas almacenadas en el localStorage al cargar la página
let allTodos = JSON.parse(localStorage.getItem('todos')) || [];

// Función para mostrar las tareas en el HTML
const showTodos = (todo) => {
  let html = `
    <li>${todo.title}</li>
    <li>${todo.description}</li>`;
  return html;
};

// Función para renderizar todas las tareas en el contenedor
const renderTodos = () => {
  container.innerHTML = "";
  allTodos.map((task) => {
    return (container.innerHTML += showTodos(task));
  });
};

// Agregar evento al formulario para guardar una tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const formValues = {
    title: title,
    description: description,
  };

  allTodos.push(formValues);

  // Guardar las tareas en el localStorage
  localStorage.setItem('todos', JSON.stringify(allTodos));

  renderTodos();
  form.reset();
});

// Renderizar las tareas al cargar la página
renderTodos();
