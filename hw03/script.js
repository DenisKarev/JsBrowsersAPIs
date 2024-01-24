let ls = {};
let picObj = {};

async function getPicture(url) {
  // Of The Day

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Something went wrong with getting a picture!');
  }
  return (await response.json()) ?? {};
}

function getNewUrl() {
  return `https://www.gstatic.com/prettyearth/${picsids[Math.round(Math.random() * picsids.length)]}.json`;
}

function likePicture(e) {
  ls.likes += 1;
  document.querySelector('.icon-text').textContent = ls.likes;
  appEl.querySelector('.history')?.remove();
  appEl.querySelector('.history-button')?.removeAttribute('visible');
  appEl.querySelector('.info')?.remove();
  appEl.querySelector('.like-info')?.removeAttribute('visible');
}

function generateHistory() {
  const history = ls.getHistory();
  let result = 'History:'
  result += history.map((e) => {
    const item = e.split('_')
    return `<ul class='history_list'>
  <li class="history_list_item">
    <span>Image from: ${item[0]}</span><span>Likes: ${item[1]}</span>
  </li>
</ul>`
 } ).join('');
  return result
}

function showPictureInfo(e) {
  const buttonEl = appEl.querySelector('.like-info');
  if (buttonEl.getAttribute('visible')) {
    appEl.querySelector('.info')?.remove();
    buttonEl.removeAttribute('visible');
    
  } else {
    appEl.querySelector('.history')?.remove();
    appEl.querySelector('.history-button')?.removeAttribute('visible');

    buttonEl.setAttribute('visible', true);
    const infoEl = document.createElement('div');
    infoEl.classList.add('info');
    let keys = Object.keys(picObj.geocode);
    let result = `&copy;: ${picObj.attribution}<div>Geoloc: Latitude: ${picObj.lat}, Longitude: ${picObj.lng}</div>`;
    result += keys.map((e) => `<div>${e}: ${picObj.geocode[e]}</div>`).join('');
    infoEl.innerHTML = result;
    appEl.append(infoEl);
  }
}

function showHistory(e) {
  const buttonEl = appEl.querySelector('.history-button');

  buttonEl.classList.toggle('clicked');

  if (buttonEl.getAttribute('visible')) {
    appEl.querySelector('.history')?.remove();
    buttonEl.removeAttribute('visible');

  } else {
    appEl.querySelector('.info')?.remove();
    appEl.querySelector('.like-info')?.removeAttribute('visible');

    buttonEl.setAttribute('visible', true);

    const historyEl = document.createElement('div');
    historyEl.classList.add('history');
    historyEl.innerHTML = generateHistory();
    
    // `History:<ul class='history_list'></ul>`;
    // const ulEl = historyEl.querySelector('.history_list');
    // const liEl = document.createElement('li');
    // liEl.classList.add('history_list_item');
    // ulEl.append(liEl);
    // historyEl.append(ulEl);
    appEl.append(historyEl);
  }
}

async function tryPutPicture() {
  const picUrl = getNewUrl();
  picObj = await getPicture(picUrl);
  console.log(picObj);

  if (picObj) {
    const imgEl = document.createElement('img');
    imgEl.src = picObj.dataUri;
    ls = new LS(picUrl);
    const buttEl = document.createElement('div');
    const buttHistoryEl = document.createElement('div');
    const buttInfoEl = document.createElement('div');
    buttEl.classList.add('like');
    buttHistoryEl.classList.add('like', 'history-button');
    buttInfoEl.classList.add('like', 'like-info');
    // buttHistoryEl.textContent = 'History of pictures';
    buttEl.innerHTML = `
    <svg viewBox="0 0 23 21" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3 19.5c-.5 0-1-.1-1.4-.4C7.5 17.9 1 13.5 1 8 1 4.2 4.1 1.2 7.8 1.2c1.2 0 2.4.3 3.4.9 1-.6 2.2-.9 3.4-.9 3.8 0 6.8 3.1 6.8 6.8 0 5.5-6.5 9.9-8.8 11.1-.4.3-.9.4-1.4.4zM7.8 2.9c-2.8 0-5.1 2.3-5.1 5.1 0 2.3 1.6 4.5 3 5.9 1.7 1.8 3.8 3.1 5 3.7l.1.1c.3.2.7.2 1 0l.1-.1C13.1 17 15.1 15.7 16.8 13.9c1.4-1.4 3-3.6 3-5.9 0-2.8-2.3-5.1-5.1-5.1-1.1 0-2.1.3-2.9.9L11.3 4.1l-.5-.3c-.9-.6-1.9-.9-2.9-.9z" fill="white"></path>
      <text x="8" y="14" class="icon-text" fill="white">${ls.likes}</text>
    </svg>
    <div class="like-count"></div>`;
    // <svg viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 16 1 H 4 C 2.3 1 1 2.3 1 4 V 14.9 C 1 16.5 2.3 17.9 4 17.9 H 4.8 C 5.6 17.9 6.4 18.2 6.9 18.8 L 8.6 20.5 C 9.4 21.3 10.7 21.3 11.4 20.5 L 13.1 18.8 C 13.7 18.2 14.4 17.9 15.2 17.9 H 16 C 17.7 17.9 19 16.6 19 14.9 V 4 C 19 2.4 17.7 1 16 1 Z M 10.3 14 C 10.2 14 9.9 14 9.7 14 C 8.4 13.5 5.5 11.7 5.5 8.5 C 5.5 7.1 6.6 6 8 6 C 8.8 6 9.5 6.4 10 7 C 10.5 6.4 11.2 6 12 6 C 13.4 6 14.5 7.1 14.5 8.5 C 14.5 11.7 11.6 13.5 10.3 14 Z"
    //     fill="white"></path></svg>
    // console.log(imgEl.clientHeight);
    // buttEl.style.top = `${imgEl.clientHeight + 76}px`;
    buttInfoEl.innerHTML = `<svg viewBox="0 0 25 22" class="icon-info" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <path d="M 7.546 9.386 m -1.28 0 a 1.28 1.28 90 1 0 2.56 0 a 1.28 1.28 90 1 0 -2.56 0 Z M 8.894 19.564 c -0.104 0 -0.208 -0.016 -0.31 -0.05 c -0.276 -0.09 -0.496 -0.296 -0.608 -0.562 l -0.786 -1.884 H 4.566 C 3.15 17.066 2 15.916 2 14.502 V 4.272 C 2 2.858 3.15 1.706 4.566 1.706 h 15.35 c 1.414 0 2.566 1.15 2.566 2.566 v 10.23 c 0 1.414 -1.15 2.566 -2.566 2.566 H 13.33 L 9.404 19.422 c -0.154 0.094 -0.332 0.142 -0.51 0.142 z m -0.366 -1.606 s -0.002 0 0 0 z M 4.566 3.414 c -0.474 0 -0.858 0.386 -0.858 0.858 v 10.23 c 0 0.474 0.386 0.858 0.858 0.858 h 3.764 l 0.906 2.174 L 12.858 15.36 h 7.058 c 0.474 0 0.858 -0.386 0.858 -0.858 V 4.272 c 0 -0.474 -0.386 -0.858 -0.858 -0.858 H 4.566 z M 12.24 9.386 m -1.28 0 a 1.28 1.28 90 1 0 2.56 0 a 1.28 1.28 90 1 0 -2.56 0 Z M 16.934 9.386 m -1.28 0 a 1.28 1.28 90 1 0 2.56 0 a 1.28 1.28 90 1 0 -2.56 0 Z"
      fill="white" /></svg>`;
    buttEl.addEventListener('click', likePicture);
    buttInfoEl.addEventListener('click', showPictureInfo);
    buttHistoryEl.addEventListener('click', showHistory);

    appEl.append(imgEl, buttEl, buttInfoEl, buttHistoryEl);
  } else {
    throw new Error('No picture? ((');
  }
}

const appEl = document.querySelector('.app');
tryPutPicture();
