let weatherList = [];

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('input').addEventListener('select', (event) =>{
        console.log(event.currentTarget)
        isInputValid(event.currentTarget)
    })

    document.querySelector('#add').addEventListener('click', (event) => {
        event.preventDefault();
        const temperature = document.querySelector('#temperature').value;
        const date = document.querySelector('#date').value;
        if(isFormValid()){
            createHeader()
            weatherList.push({temperature, date})
            bubbleSortDate(weatherList)
            renderTable(weatherList)
            createChart(weatherList)
            document.querySelector('#temperature').value=''
            document.querySelector('#date').value=''
        }
        
    })

    document.querySelector('#maxTemp').addEventListener('click', (event) => {
        event.preventDefault();
        if(weatherList.length){
            const sortedList = bubbleSortTemperature(weatherList)
            document.getElementById('results').innerHTML = `Maximum Temperature is: ${sortedList[sortedList.length - 1].temperature}`
        }
    })
    
    document.querySelector('#minTemp').addEventListener('click', (event) => {
        event.preventDefault();
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
        weatherList = getSeedData(5);
        const sortedList = bubbleSortDate(weatherList)
        createHeader()
        renderTable(sortedList)
        createChart(sortedList)
    })


    
    

});


// Field Validation
const highlightInvalidField = (element) => {
    const span = document.createElement('span')
    span.className = 'validation invalid-feedback'
    const dataValue = element.getAttribute('data-value')
    span.innerText = `Please Fille in ${dataValue} Field`
    element.classList.add('invalid-field')
    const parentElement = element.parentElement
    parentElement.insertBefore(span, null)
}

const unHighlightField = (element) => {
    element.classList.remove('invalid-field')
    const parentElement = element.parentElement
    parentElement.removeChild(element.nextElementSibling)
}

const isInputValid = (element) =>{
    if(element.value === ''){
        highlightInvalidField(element)
        return false
    }else{
        if(element.classList.contains('invalid-field')){
            unHighlightField(element)
        }
        return true
    }
}

const isFormValid = () =>{
    const errorList = []
    const inputs = document.forms["form"].getElementsByTagName("input");
    for(let i=0; i<inputs.length; i++) {
        const isValid = isInputValid(inputs[i])
        if(!isValid){
            errorList.push(inputs[i])
        }
    }
    return errorList.length === 0
}

const createChart= (list) =>{
    const date = []
    const temperatures = []
    list.forEach((item) => {
        date.push(item.date)
        temperatures.push(item.temperature)
    })

    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
          labels: date,
          datasets: [{ 
              data: temperatures,
              label: "Temperature",
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Temperature Graph Line'
          }
        }
      });
}

const getDates = (list) =>{

    console.log(date)
    return date
}

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

const renderTable = (list) =>{
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


  const seedData = () =>{
      const date = new Date(`2020-${Math.ceil(Math.random() * 12)}-${Math.ceil( Math.random() * 28)}`).toISOString().split('T')[0];
      var temperature = Math.floor(Math.random()*30) + 1; // this will get a number between 1 and 30;
      temperature *= Math.floor(Math.random()*2) == 1 ? 1 : -1;// this will add minus sign in 50% of cases
      return {temperature, date }
  }

  const getSeedData = (reapetNumber) =>{
      const weatherSeedData = []
    for(let num = 0; num<reapetNumber; num++){
        weatherSeedData.push(seedData())
    }
    return weatherSeedData
  }


