const pick = (string) => document.querySelector(string)
const pickAll = (string) => document.querySelectorAll(string)
const newTag = (string) => document.createElement(string)

// DOM ContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchAlldogs()
    // pick("#good-dog-filter").addEventListener("click", (e) => {
    //     const filter = e.target.textContent
    //     if(filter!== "Filter good dogs: OFF") {
    //         filter = "Filter good dogs: OFF"
    //     } else {
    //         filter = "Filter good dogs: ON"
    //     }
    //     fetchAlldogs(filter)
    // })

})

// Fetch Dogs
function fetchAlldogs() {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => 
        // {
//         if (filter === null) {
        json.forEach(renderAllDogs)
//         } else if(filter === "Filter good dogs: OFF") {
//             json.filter(dog = dog.isGoodDog === false).forEach(renderAllDogs)
//         } else if(filter === "Filter good dogs: ON") {
//             json.filter(dog = dog.isGoodDog === true).forEach(renderAllDogs)
//         }
        )
//     }
}

// function filterDogs(obj)

// Render Dogs
function renderAllDogs(obj) {
    //create Elements
    // let divObj = newTag("div")
    let spanObj = newTag("span")
   
    
    // Adding Attributes
    // divObj.id = "dog-summary-container"
    spanObj.id = "dog-bar"
    spanObj.textContent = obj.name

    pick("#dog-bar").append(spanObj)
    // pick("#dog-info").append(imgFrame)
    spanObj.addEventListener("click", () =>
        {
            fetchDogInfo(obj.id)
        })
    
}

// function showDogPick(url) {
//     let img = newTag("img")
    
//     img.src = url
//     img.id = "dog-info"

//     pick("#dog-info").append("img")
// }


function fetchDogInfo(id) {
    fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(json => {
        pick("#dog-summary-container").innerHTML = showDog(json.image, json.name, json.isGoodDog)})
}

function showDog(url, name, goodDog) {
    if (goodDog === true) {
    return (`
    <div>
      <div>
      <img src = "${url}" alt = ${name}>
      <h2> ${name} </h2>
      </div>
      <button> Good Dog!</button>
    </div>
      `)
    } else {
        return (`
      <div>
        <div>
        <img id="dog-info" src = "${url}" alt = ${name}>
        <h2> ${name} </h2>
        </div>
        <button> Bad Dog!</button>
      </div>
      `)

    }
}


// pick("#good-dog-filter").addEventListener("Click", (e) => {
//     console.log(e.target)
//     if(e.target.textContent !== "Filter good dogs: OFF") {
//         e.target.textContent = "Filter good dogs: OFF"
//         console.log(e.target.textContent)
//         fetchAlldogs(e.target.textContent)
//     } else {
//         e.target.textContent = "Filter good dogs: ON"
//         fetchAlldogs(e.target.textContent)
//     }
//     console.log(e.target.textContent)
//     fetchAlldogs(filter)
// })