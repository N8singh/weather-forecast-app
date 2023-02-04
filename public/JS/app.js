const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#mesg-1')
const m2 = document.querySelector('#mesg-2')
const m3 = document.querySelector('#msg-3')

weatherform.addEventListener('submit', (e) =>{
   e.preventDefault()
    const location = search.value
    console.log(location)

    m1.textContent = 'Loading...'
    m2.textContent = ""
    m3.textContent = ""

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return m1.textContent = data.error
        }
        else {
        m1.textContent = data.place
        m2.textContent = data.forecast
        m3.textContent = `Latitude is ${data.lat} and Longitude is ${data.lon}`
        }
    })
})
})