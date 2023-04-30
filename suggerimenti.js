function reset(event) {
    const results = event.currentTarget.parentNode;

    console.log(results);
    results.classList.add('hidden');
    const ul = results.querySelector('ul');
    ul.innerHTML = '';
    author.value = ''; // prendo direttamente con l'id
}

function onJson(json) {
    const results = json.items;
    const div = document.querySelector('#results-books');
    const list = div.querySelector('ul');
    const button = div.querySelector('button');

    console.log(json);
    console.log(results);

    for(let i in results) {
        const el = document.createElement('li');

        console.log(results[i].volumeInfo.title)
        el.textContent = results[i].volumeInfo.title;
        console.log(el);
        list.appendChild(el);
    }

    div.classList.remove('hidden');
    button.addEventListener('click', reset);
}

function onResponse(response) {
    console.log(response);

    return response.json();
}

function onClick(event) {
    const text = encodeURIComponent(document.querySelector('#author').value);
    console.log(text);

    event.preventDefault();

    // FETCH
    fetch(endpoint + '?q=' + text + '&key=' + key_api).then(onResponse).then(onJson);
}

const endpoint = 'https://www.googleapis.com/books/v1/volumes';
const key_api = 'AIzaSyAhtJy6wsCH-w3RClZU1_QMSpw6ACuE21Q';

// assegniamo l'handler al bottone
const submit = document.querySelector('#search-info');
submit.addEventListener('submit',  onClick);