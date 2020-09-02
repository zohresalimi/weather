
document.addEventListener("DOMContentLoaded", function(){
    const weather = [];
    
    document.querySelector('#add').addEventListener('click', (e) => {
        e.preventDefault();
        const temperature = document.querySelector('#temperature').value;
        const date = document.querySelector('#date').value;
        if(!temperature && !date) {
            e.target.disabled = true;
        }
        const newObj = {temperature, date}
        weather.push(newObj)
        addHeader(newObj)
        addRow(newObj)
        document.querySelector('#temperature').value=''
        document.querySelector('#date').value=''
    })
});

const addHeader = (newObj) =>{
    const header = Object.keys(newObj);
    var recordTable = document.querySelector('table')
    if(!recordTable.tHead){
        var tHead = recordTable.createTHead();
        var tr = tHead.insertRow(-1);
        for(let i=0; i < header.length; i++) {
            var th = document.createElement('th');
            th.innerHTML= header[i]
            tr.appendChild(th)
        }
    }

}

const addRow = (data) =>{
    const table = document.querySelector('table')
    const tbody = document.querySelector('tbody')
    const tr = document.createElement('tr')
    const header = Object.keys(data);

    for(let j=0; j<header.length; j++){
        var cell = document.createElement('td')
        cell.innerHTML = data[header]
        tr.appendChild(cell)
    }
    table.appendChild(tr)
}