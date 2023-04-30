function reset(event) {
    const results = event.currentTarget.parentNode;

    console.log(results);
    results.classList.add('hidden');
    const p = results.querySelector('p');
    p.textContent = '';
    word.value = ''; // prendo direttamente con l'id
}

function onJson(json) {
    let results = json.data.detections;
    let code;
    let name;
    const div_res = document.querySelector('#results');
    const p = div_res.querySelector('p');
    const button = div_res.querySelector('button');

    console.log('results ');
    console.log(results);
            
    for(let i in results) {
        if(results[i].isReliable === true) {
            code = results[i].language;
        }
    }

    console.log(code);

    for(let j in languages) {
        if(languages[j].code === code) {
            name = languages[j].name;
        }
    }

    console.log(name);

    div_res.classList.remove('hidden');
    p.textContent = 'Hai scritto in ' + name;
    button.addEventListener('click', reset);
}

function onResponse(response) {
    console.log('response');
    console.log(response);

    return response.json();
}

function onClick(event) {
    const text = encodeURIComponent(document.querySelector('#word').value);

    event.preventDefault();

    // FETCH
    fetch(endpoint + '?q=' + text, {
        headers: {
            'Authorization': 'Bearer ' + api_key,
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(onResponse).then(onJson);
}

function onJsonLang(json) {
    languages = json;
    console.log('languages');
    console.log(languages);
}

const endpoint = 'https://ws.detectlanguage.com/0.2/detect';
const endpoint_lang = 'https://ws.detectlanguage.com/0.2/languages';
const api_key = 'eab87263ea67998a91a46459bbc94438';
let languages;

// assegniamo l'handler al bottone
const submit_button = document.querySelector('#search-bar');

submit_button.addEventListener('submit',  onClick);

fetch(endpoint_lang, {
    headers: {
        'Authorization': 'Bearer ' + api_key,
        'Content-type': 'application/x-www-form-urlencoded'
    }
}).then(onResponse).then(onJsonLang);