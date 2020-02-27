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
    messageTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.locationString
                messageTwo.textContent = data.forecast
            }
        })
    })
})