import validateImage from "../api/validateImage.js";
let allComputers = []
let currentComputer = []

let computerInformationElements = {
    features: document.getElementById("computerFeatures"),
    price: document.getElementById("computerPrice"),
    description: document.getElementById("computerDescription"),
    title: document.getElementById("computerTitle"),
    image: document.getElementById("computerImage")
}

/**
 * 
 * @returns Returns a copy of the current computer
 */
const getCurrentComputer = () => [...currentComputer];


/**
 * Initializes the intial lists and adds the computers to a select HTML list.
 * @param {Array} computers List of computers to initalize to this object 
 * @param {*} computerSelect Select list to add computers to
 */
const initializeComputers = (computers, computerSelect) => {
    allComputers = computers;
    currentComputer = computers[0];

    computers.map((computer, i) =>
    {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.innerHTML = computer.title;
        computerSelect.append(newOption)
    });
}

/**
 * Updates the selected computer and updates all HTML elements that contain information about the computer.
 * @param {Number} index Computer index selected
 * @param {*} numberFormatter Number formatter to use for the price
 */
const updateComputer = (index, numberFormatter) =>
{
    currentComputer = allComputers[index];
    let features = "";

    for(let i = 0; i < currentComputer.specs.length; ++i)
    {
        features += currentComputer.specs[i] + "<br>";
    }


    computerInformationElements.features.innerHTML = features;
    computerInformationElements.price.innerText = numberFormatter.format(currentComputer.price);
    computerInformationElements.description.innerText = currentComputer.description;
    computerInformationElements.title.innerText = currentComputer.title;
    fetch("https://hickory-quilled-actress.glitch.me/" + currentComputer.image, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
            computerInformationElements.image.src = "https://hickory-quilled-actress.glitch.me/" + currentComputer.image;
        } else {
            computerInformationElements.image.src = "https://via.placeholder.com/300"
        }
    })
    .catch(err => console.log('Error:', err))

    computerInformationElements.image.alt = currentComputer.title;
}



const computersView = {
    getCurrentComputer,
    initializeComputers,
    updateComputer
}

export default computersView;