const pick = (string) => document.querySelector(string)
const pickAll = (string) => document.querySelectorAll(string)
const newTag = (string) => document.createElement(string)

// DOM ContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchAlldogs()

})

// Fetch Dogs
function fetchAlldogs() {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => {
         json.forEach(renderAllDogs)
     
         console.log(json)
         pick("#good-dog-filter").addEventListener(
          "click", (e) => {
            console.log(json)
            console.log(e.target.textContent)
            showFilteredDogs(e.target.textContent, json)
           }
        )
          
    
    })
}


// Render Dogs
function renderAllDogs(obj) {
    
    let spanObj = newTag("span")
   
    spanObj.id = "dog-bar"
    spanObj.textContent = obj.name

    pick("#dog-bar").append(spanObj)
    spanObj.addEventListener("click", () =>
        {
            fetchDogInfo(obj.id)
        })
    
}


function fetchDogInfo(id) {
    fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
        pick("#dog-summary-container").innerHTML = showDog(json)
        
        pick("#dog-summary-container button").addEventListener("click" , (e) => {
          console.log(e.target.textContent)
          changeDogAttributes(e.target.textContent)
        })
        
      })

}

const dogFilterText = (character) => {
  console.log(character)
  if(character === "Filter good dogs: OFF") {
    console.log(character)
    pick("#good-dog-filter").textContent = "Filter good dogs: ON"
  } else {
    pick("#good-dog-filter").textContent = "Filter good dogs: OFF"
  }
}




const changeDogAttributes = (character) => {
  if(character === "Good Dog!") {
    console.log(character)
    pick("#dog-summary-container button").textContent = "Bad Dog!"
  } else {
    pick("#dog-summary-container button").textContent = "Good Dog!"
  }
}

// function renderDogs(dog) {
//   console.log("hi")

//     let divBox = newTag("div")
//     let img = newTag("img")
//     let h2Name = newTag("h2")
//     let btn = newTag("button")

    
//     divBox.setAttribute('id','dog-info')
//     img.setAttribute('src', `${dog.image}`)
//     h2Name.textContent = `${dog.name}`
//     btn.textContent = chooseGoodBad(dog.isGoodDog)
//     divBox.append(img, h2Name, btn)
//     pick("#dog-summary-container").append(divBox)

// }

// function chooseGoodBad(goodDog) {
//   if(goodDog) {
//     return "Good Dog!"
//   } else {
//     return "Bad Dog!"
//   }
// }

function showFilteredDogs(word, dogs) {
  console.log(dogs)
  console.log(word)
    if(word.includes("OFF")){
      dogFilterText(word)
      showDogs(dogs.filter(dog => dog.isGoodDog === false))
  
     } else {
       dogFilterText(word)
       showDogs(dogs.filter(dog => dog.isGoodDog === true))
     }

}

function showDogs(array) {
  console.log(array)
  renderAllDogs(array)
}

function showDog(dog) {
  if (dog.isGoodDog) {
  return (`
  <div id="dog-summary-container">
    <div id="dog-info">
      <img src = "${dog.image}" alt = ${dog.name}>
      <h2> ${dog.name} </h2>
    </div>
    <button> Good Dog!</button>
  </div>
    `)
  } else {
      return (`
    <div id="dog-summary-container">
      <div id="dog-info">
        <img src = "${dog.image}" alt = ${dog.name}>
        <h2> ${dog.name} </h2>
      </div>
      <button> Bad Dog!</button>
    </div>
    `)

  }

}

