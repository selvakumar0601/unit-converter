const category = document.getElementById("category");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");

const units = {
    length: {
        meter: {
            name: "Meter",
            factor: 1
        },
        feet: {
            name: "Feet",
            factor: 3.28084
        },
        kilometer: {
            name: "Kilometer",
            factor: 0.001
        },
        mile: {
            name: "Mile",
            factor: 0.000621371
        }
    },

    weight: {
        kilogram: {
            name: "Kilogram",
            factor: 1
        },
        pound: {
            name: "Pound",
            factor: 2.20462
        },
        gram: {
            name: "Gram",
            factor: 1000
        },
        ounce: {
            name: "Ounce",
            factor: 35.274
        }
    }
};


// Load units into dropdowns
function loadUnits() {

    const selectedCategory = category.value;
    const categoryUnits = units[selectedCategory];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    for (const unit in categoryUnits) {

        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = categoryUnits[unit].name;

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = categoryUnits[unit].name;

        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    }

    // Set different default units
    toUnit.selectedIndex = 1;

    convert();
}


// Conversion function
function convert() {

    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {
        result.textContent = "0";
        return;
    }

    const selectedCategory = category.value;

    const from = fromUnit.value;
    const to = toUnit.value;

    const fromFactor = units[selectedCategory][from].factor;
    const toFactor = units[selectedCategory][to].factor;

    // Convert input to base unit
    const baseValue = value / fromFactor;

    // Convert base unit to target unit
    const convertedValue = baseValue * toFactor;

    result.textContent = `${convertedValue.toFixed(4)} ${
        units[selectedCategory][to].name
    }`;
}


// Events
category.addEventListener("change", loadUnits);

inputValue.addEventListener("input", convert);

fromUnit.addEventListener("change", convert);

toUnit.addEventListener("change", convert);


// Initial setup
loadUnits();