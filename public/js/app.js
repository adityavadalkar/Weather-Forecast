console.log("Client side javascript file loaded!")



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input') 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = searchElement.value

    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Think happy thoughts till then!'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.locationString
                messageTwo.textContent = data.dailySummary + " The temperature currently is " + data.currTemperature + "℃. It is going to be a " + data.currSummary.toLowerCase() + " day today." + " There is " + data.dailyPrecipProbability + "% chance of " + data.dailyPrecipType + " today."
            }
        })
    })
})
