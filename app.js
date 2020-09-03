
document.addEventListener("DOMContentLoaded", function(){
    const weatherList = [];
    
    document.querySelector('#add').addEventListener('click', (e) => {
        e.preventDefault();
        createHeader()
        const temperature = document.querySelector('#temperature').value;
        const date = document.querySelector('#date').value;
        if(!temperature || !date) {
            return false
        }
        const newObj = {temperature, date}
        weatherList.push(newObj)
        addRow(newObj)
        document.querySelector('#temperature').value=''
        document.querySelector('#date').value=''
    })

    document.querySelector('#maxTemp').addEventListener('click', (e) => {
        e.preventDefault();
        if(weatherList.length){
            const sortedList = bubblesort(weatherList)
            document.getElementById('results').innerHTML = `Maximum Temprature is: ${sortedList[sortedList.length - 1].temperature}`
        }
    })
    
    document.querySelector('#minTemp').addEventListener('click', (e) => {
        e.preventDefault();
        if(weatherList.length){
            const sortedList = bubblesort(weatherList)
            document.getElementById('results').innerHTML = `Minimum Temprature is: ${sortedList[0].temperature}`
        }
        // const minTemp = getMinTemperature(weatherList)
      })
});

const createHeader = () =>{
    let inputs = document.querySelectorAll('input.form__input');
    var table = document.querySelector('table')
    if(!table.tHead){
        var tHead = document.createElement('thead')
        var tr = document.createElement('tr')
        inputs.forEach((input) =>{
            var th = document.createElement('th');
            th.innerHTML= input.getAttribute('name')
            tr.appendChild(th)
        })
        tHead.appendChild(tr)
        table.appendChild(tHead)
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


const bubblesort = (arr)=> {
    var len = arr.length;
  
    for (var i = 0; i < len ; i++) {
      for(var j = 0 ; j < len - i - 1; j++){
      if (+arr[j].temperature > +arr[j + 1].temperature) {
        // swap
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j + 1] = temp;
      }
     }
    }
    return arr;
  }




