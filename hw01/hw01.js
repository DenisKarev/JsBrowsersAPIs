// Урок 1. Dom-дерево

// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Дополнительно (необязательная часть):
// Сохраняйте изменения в LocalStorage, чтобы они сохранялись при перезагрузке страницы.

// Начальные данные (JSON):

const tableHead = `<div class="row">
<div class="col1"><b>name</b></div>
<div class="col"><b>time</b></div>
<div class="col"><b>maximum participants</b></div>
<div class="col"><b>current participants</b></div>
<div class="col"><b>sign up</b></div>
<div class="col"><b>ungsign</b></div></div>`;

let initialData = [
  {
    id: 1,
    name: 'Йога',
    time: '10:00 - 11:00',
    maxParticipants: 15,
    currentParticipants: 14,
    signed: false,
  },
  {
    id: 2,
    name: 'Пилатес',
    time: '11:30 - 12:30',
    maxParticipants: 10,
    currentParticipants: 5,
    signed: false,
  },
  {
    id: 3,
    name: 'Кроссфит',
    time: '13:00 - 14:00',
    maxParticipants: 20,
    currentParticipants: 15,
    signed: false,
  },
  {
    id: 4,
    name: 'Танцы',
    time: '14:30 - 15:30',
    maxParticipants: 12,
    currentParticipants: 12,
    signed: false,
  },
  {
    id: 5,
    name: 'Бокс',
    time: '16:00 - 17:00',
    maxParticipants: 8,
    currentParticipants: 6,
    signed: true,
  },
  // {
  //   id: 6,
  //   name: 'Тайский-Бокс',
  //   time: '16:00 - 17:00',
  //   maxParticipants: 18,
  //   currentParticipants: 18,
  //   signed: true,
  // },
];

class LS {
  isPresent = false;

  saveData(data) {
    localStorage.setItem('hw01APIsData', JSON.stringify(data));
  }

  signup(id) {
    const entry = initialData.find((entry) => +entry.id === id);
    entry.signed = true;
    entry.currentParticipants = +entry.currentParticipants + 1;
    // console.log(entry);
    this.saveData(initialData);
  }

  unsign(id) {
    const entry = initialData.find((entry) => +entry.id === id);
    entry.signed = false;
    entry.currentParticipants = +entry.currentParticipants - 1;
    // console.log(entry);
    this.saveData(initialData);
  }

  getData() {
    return JSON.parse(localStorage.getItem('hw01APIsData'));
  }

  constructor() {
    if (localStorage.getItem('hw01APIsData')) {
      this.isPresent = true;
    }
  }
}
const tableEl = document.querySelector('.table');
const ls = new LS();
if (ls.isPresent) {
  initialData = ls.getData();
} else {
  ls.saveData(initialData);
}

drawTheTable();

function drawTheTable() {
  tableEl.innerHTML = tableHead;
  tableEl.insertAdjacentHTML(
    'beforeend',
    initialData
      .map(
        (entry) =>
          `
        <div class="row" ${entry.signed ? 'data-signed = true' : 'data-signed = false'} data-id='${entry.id}'>
          <div class="col1">${entry.name}</div>
          <div class="col">${entry.time}</div>
          <div class="col" data-max="${entry.maxParticipants}">${entry.maxParticipants}</div>
          <div class="col" data-cur="${entry.currentParticipants}">${entry.currentParticipants}</div>
          <div class="col"><button class="signupButton" ${
            isSignupButtonActive(entry) ? '' : 'disabled'
          } onclick="signUp(event);">sign up</button></div>
          <div class="col"><button class="unsignButton" ${
            isUnsignButtonActive(entry) ? '' : 'disabled = true'
          } onclick="unSign(event);">unsign</button></div>
        </div>
        `
      )
      .join('')
  );
}

function isSignupButtonActive(entry) {
  // console.log(entry);
  if (!entry.signed || entry.signed === 'false') {
    if (+entry.maxParticipants - +entry.currentParticipants >= 1) return true;
    else return false;
  }
  return false;
}

function isUnsignButtonActive(entry) {
  // console.log(entry);
  if (entry.signed || entry.signed === 'true' || !entry.signed === 'false') {
    return true;
  }
  return false;
}

function signUp(e) {
  const row = e.target.closest('.row');
  const signed = !row.getAttribute('data-signed') === 'false' || row.getAttribute('data-signed') === 'true';
  const maxP = +row.children[2].getAttribute('data-max');
  const curP = +row.children[3].getAttribute('data-cur');
  // console.log(signed, maxP, curP);
  if (!signed && maxP - curP >= 1) {
    row.querySelector('.unsignButton').removeAttribute('disabled');
    row.setAttribute('data-signed', 'true');
    e.target.setAttribute('disabled', '');
    row.children[3].setAttribute('data-cur', curP + 1);
    row.children[3].textContent = curP + 1;
    ls.signup(+row.getAttribute('data-id'));
  }
}

function unSign(e) {
  const row = e.target.closest('.row');
  const curP = +row.children[3].getAttribute('data-cur');
  row.setAttribute('data-signed', 'false');
  row.children[3].setAttribute('data-cur', curP - 1);
  row.children[3].textContent = curP - 1;
  row.querySelector('.signupButton').removeAttribute('disabled');
  e.target.setAttribute('disabled', '');
  ls.unsign(+row.getAttribute('data-id'));
}
