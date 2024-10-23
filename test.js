const inputEl = (document.getElementsByClassName('app__controls-input'))[0]; //создали переменную
const btnEl = (document.getElementsByClassName('app__controls-button'))[0]; //создали переменную
const listEl = (document.getElementsByClassName('app__list'))[0]; //создали переменную
let data = [];

//Загрузка данные в браузере
function init() {
  const tmp = localStorage.getItem('data');
  if (tmp !== null) {
    data = JSON.parse(tmp);
  }
  render();
}

//Сохранение данных в браузере
function saveNotes() {
    localStorage.setItem('data', JSON.stringify(data));
}

//Созданеи задачи
function createTask(objectData) {
  const root = document.createElement('div');
  root.classList.add('app__list-item');
  root.classList.add(objectData.isGreen ? 'app__list-item' : 'app__list-item_done');
  
  const input = document.createElement('input');
  input.classList.add('app__list-checkbox');
  input.type = 'checkbox';
  input.checked = objectData.isStrikethrough;

  const txt = document.createElement('p');
  txt.classList.add('app__list-item-text');
  txt.innerText = objectData.text;
  if (objectData.isStrikethrough) {
    txt.classList.add('strikethrough');
  }

  const btn = document.createElement('button');
  btn.classList.add('app__list-btn');

  const img = document.createElement('img');
  img.src = '/Vector.png';
  img.alt = 'trash';

  btn.appendChild(img);

  //Обработчик для чекбокса
  input.addEventListener('change', () => {
    changeStatusById(objectData.id);
  });

  //Кнопка удаления 
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteById(objectData.id);
  });

  root.appendChild(input);
  root.appendChild(txt);
  root.appendChild(btn);
  
  return root;
}

// Добавление новой задачи
function addTask(text, isStrikethrough = false, isGreen = false) {
    const task = {
        id: Date.now(),
        text: text,
        isStrikethrough: isStrikethrough,
        isGreen: isGreen
    };
    data.push(task);
    saveNotes();
    render();
}

//Задача по ID
function changeStatusById(id) {
    const task = data.find((item) => item.id === id);
    if (task) {
        task.isStrikethrough = !task.isStrikethrough;
        task.isGreen = !task.isGreen;
        saveNotes();
        render();
    }
}

//Удаление задачи по ID
function deleteById(id) {
    data =data.filter((item) => item.id !== id);
    saveNotes();
    render();
}

//Кнопка ввода
btnEl.addEventListener('click', () => {
  const textValue = inputEl.value.trim();
  if (textValue !== '') {
    addTask(textValue);
    inputEl.value = '';
  }
});

//Отображение всех задач
function render() {
  listEl.innerHTML = '';
  data.forEach((task) => {
    const taskElement = createTask(task);
    listEl.appendChild(taskElement);
  });
}

init();