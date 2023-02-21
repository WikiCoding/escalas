//const url = 'http://localhost:3000'
//const url = 'https://uninterested-pear-hose.cyclic.app'
const url = 'https://escalas.cyclic.app'
const startDate = document.getElementById('data-inicio');
const endDate = document.getElementById('data-fim');
const loadDb = document.getElementById('load');
const saveBtn = document.getElementById('save');
const delBtn = document.getElementById('delete');
const container = document.getElementById('container');

let dataInputs = document.getElementsByName('field');

Inputs = JSON.parse(localStorage.getItem('dataInputs')) || [];

loadDb.addEventListener('click', async () => {
    localStorage.clear();

    await Render();
})

async function Render() {

    if (!localStorage.getItem('dataInputs')) {
        const response = await fetch(`${url}/mapa`, {
            method: 'GET'
        })

        const [data] = await response.json();

        if (data) {
            for (let i = 0; i < 42; i++) {
                dataInputs[i].innerHTML = data.data[i];
            }
            startDate.value = data.startDate.slice(0, 10);
            endDate.value = data.endDate.slice(0, 10);
        }

    } else {

        if (Inputs.length != 0) {
            for (let i = 0; i < 42; i++) {
                dataInputs[i].innerHTML = Inputs[i];
            }
        } else {
            for (let i = 0; i < 42; i++) {
                dataInputs[i].innerHTML = '';
            }
        }
    }
}

const loadStartDate = localStorage.getItem('startDate') || '';
const loadEndDate = localStorage.getItem('endDate') || '';
startDate.value = loadStartDate;
endDate.value = loadEndDate;

startDate.addEventListener('change', async (e) => {
    localStorage.setItem('startDate', e.target.value);
});

endDate.addEventListener('change', (e) => {
    localStorage.setItem('endDate', e.target.value);
})

container.addEventListener('change', () => {
    Inputs = [];
    for (let i = 0; i < 42; i++) {
        Inputs.push(dataInputs[i].value);
    }
    localStorage.setItem('dataInputs', JSON.stringify(Inputs))
})

delBtn.addEventListener('click', async () => {
    localStorage.clear();

    const req = await fetch(`${url}/mapa`, {
        method: 'DELETE'
    });

    const data = await req.json();

    console.log(data);

    window.location.reload();
});

saveBtn.addEventListener('click', async () => {
    const jsonData = {};
    jsonData.startDate = startDate.value;
    jsonData.endDate = endDate.value;
    jsonData.data = JSON.parse(localStorage.getItem('dataInputs'));

    const result = await fetch(`${url}/mapa`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(jsonData)
    })

    const response = await result.json();

    alert(response.message);
    window.location.reload();
})

Render();
