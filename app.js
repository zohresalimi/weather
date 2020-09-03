
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
        bubbleSortDate(weatherList)
        RenderTable(weatherList)
        document.querySelector('#temperature').value=''
        document.querySelector('#date').value=''
    })

    document.querySelector('#maxTemp').addEventListener('click', (e) => {
        e.preventDefault();
        if(weatherList.length){
            const sortedList = bubbleSortTemperature(weatherList)
            document.getElementById('results').innerHTML = `Maximum Temperature is: ${sortedList[sortedList.length - 1].temperature}`
        }
    })
    
    document.querySelector('#minTemp').addEventListener('click', (e) => {
        e.preventDefault();
        if(weatherList.length){
            const sortedList = bubbleSortTemperature(weatherList)
            document.getElementById('results').innerHTML = `Minimum Temperature is: ${sortedList[0].temperature}`
        }
    })

    document.querySelector('#average').addEventListener('click', (e) => {
        e.preventDefault();
        if(weatherList.length){
            const averageTemp = calculateAverage(weatherList)
            document.getElementById('results').innerHTML = `Average Temperature is: ${averageTemp}`
        }
    })

    document.querySelector('#seed').addEventListener('click', (e) => {
        e.preventDefault();
        if(weatherList.length){
            const weatherSeedList = getSeedData(5);
            const sortedList = bubbleSortDate(weatherSeedList)
            RenderTable(sortedList)

        }
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

const RenderTable = (list) =>{
    const table = document.querySelector('table')
    const tableRef = table.getElementsByTagName('tbody')[0];
    if(tableRef){
        tableRef.parentNode.removeChild(tableRef);
    }
    const tbody = document.createElement('tbody')
    for(let row=0; row<list.length; row++){
        const tr = document.createElement('tr')
        const header = Object.keys(list[row]);
        for(let cell=0; cell<header.length; cell++){
            var td = document.createElement('td')
            td.innerHTML = list[row][header[cell]]
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
}


const bubbleSortTemperature = (arr)=> {
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

  const bubbleSortDate = (arr)=> {
    var len = arr.length;
  
    for (var i = 0; i < len ; i++) {
      for(var j = 0 ; j < len - i - 1; j++){
      if (arr[j].date > arr[j + 1].date) {
        // swap
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j + 1] = temp;
      }
     }
    }
    return arr;
  }

const calculateAverage = (arr) =>{
    const len = arr.length;
    let sum = 0;
    arr.forEach((item) =>{
        sum += parseInt(item.temperature)
    })

    return sum/len
}


weather = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
    return {
      date: new Date(
        `2020-${Math.ceil(Math.random() * 12)}-${Math.ceil(
          Math.random() * 28
        )}`
      ).toISOString(),
      temperature: Math.floor(Math.random() * num * 10),
    };
  });


  const seedData = () =>{
      const date = new Date(`2020-${Math.ceil(Math.random() * 12)}-${Math.ceil( Math.random() * 28)}`).toISOString().split('T')[0];
      var temperature = Math.floor(Math.random()*30) + 1; // this will get a number between 1 and 30;
      temperature *= Math.floor(Math.random()*2) == 1 ? 1 : -1;// this will add minus sign in 50% of cases
      return {date, temperature}
  }

  const getSeedData = (reapetNumber) =>{
      const weatherSeedData = []
    for(let num = 0; num<reapetNumber; num++){
        weatherSeedData.push(seedData())
    }
  }


