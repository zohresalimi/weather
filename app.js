
document.addEventListener("DOMContentLoaded", function(){
    const weatherList = [];
    
    document.querySelector('#add').addEventListener('click', (e) => {
        e.preventDefault();
        const temperature = document.querySelector('#temperature').value;
        const date = document.querySelector('#date').value;
        if(!temperature || !date) {
            return false
        }
        const newObj = {temperature, date}
        weatherList.push(newObj)
        addHeader()
        addRow(newObj)
        document.querySelector('#temperature').value=''
        document.querySelector('#date').value=''
    })
});

const addHeader = () =>{
    let inputs = document.querySelectorAll('input.form__input');
    var recordTable = document.querySelector('table')
    if(!recordTable.tHead){
        var tHead = recordTable.createTHead();
        var tr = tHead.insertRow(-1);
        inputs.forEach((input) =>{
            var th = document.createElement('th');
            th.innerHTML= input.getAttribute('name')
            tr.appendChild(th)
        })
    }
}

const addRow = (data) =>{
    const table = document.querySelector('table')
    const tbody = document.createElement('tbody')
    const tr = document.createElement('tr')
    const header = Object.keys(data);

    for(let j=0; j<header.length; j++){
        var td = document.createElement('td')
        td.innerHTML = data[header[j]]
        tr.appendChild(td)
    }
    tbody.appendChild(tr)
    table.appendChild(tbody)
}