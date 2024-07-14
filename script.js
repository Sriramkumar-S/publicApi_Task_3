const searchCriteria = document.getElementById('isro');
const url = "https://isro.vercel.app/api";

const search = document.getElementById('search');
search.setAttribute('disabled', "");
const isro = document.getElementById('isro');
isro.addEventListener('change', () => {
    if(isro.value === '') {
        search.setAttribute('disabled', "");
    } else {
        search.removeAttribute('disabled')
    }
})

search.addEventListener('click', () => {
    console.log(searchCriteria.value)
    const responseData = fetchResponse(url, searchCriteria.value).then((data) => {
        console.log(data)
        displaySearchResults(data)
    });
})

function fetchResponse(url, searchData) {
    return new Promise((resolve, reject) => {
        const searchResponse = fetch(`${url}/${searchData}`);
        try {
            searchResponse.then((data) => {
                if(data) {
                    return data.json();
                } else {
                    reject("No records found!")
                }
            }).then((resp) => {
                resolve(resp)

            })
        } catch (err) {
            reject(err)
        }
    })
    
}

const thead = document.getElementById('thead')
const tbody = document.getElementById('tbody')
const table = document.getElementById('table')
const theadrow = document.getElementById('thead-row');

function displaySearchResults(data) {
        theadrow.innerHTML = "";
        tbody.innerHTML = ""
        Object.keys(data[searchCriteria.value][0]).forEach(element => {
            const th = createTableComp('th');
            th.scope = "col";
            th.textContent = `${element.toUpperCase()}`;
            theadrow.append(th);
        });
        data[searchCriteria.value].forEach(element => {
            const tbodyrow = createTableComp('tr');
            Object.values(element).forEach(el => {
                const td = createTableComp('td');
                td.textContent = `${el}`;
                tbodyrow.append(td);
            });
            tbody.append(tbodyrow);
        });
    }

function createDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
}
function createTable(className, action) {
    
    if(action === 'table') {
       let data = document.createElement('table');
        data.classList = className;
        return data;
    }
    
}

function createTableComp(action) {
    let data = ''
    if(action === 'thead') {
        data = document.createElement('thead');
    }
    if(action === 'tr') {
        data = document.createElement('tr');
    }
    if(action === 'th') {
        data = document.createElement('th');
    }
    if(action === 'tbody') {
        data = document.createElement('tbody');
    }
    if(action === 'td') {
        data = document.createElement('td');
    }
    return data;
}