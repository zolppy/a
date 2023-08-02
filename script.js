// For avoiding that more of one condition on table stays marked
let conditionIndex = 0;
const conditionIds = [];

// For activating event
const calculateButton = document.getElementById('calc-btn');

function clearInputFields() {
    document.getElementById('weight-input-id').value = '';
    document.getElementById('height-input-id').value = '';
}

// Data validation
function isValidData(weight, height) {
    if (weight == '' && height != '') {
        alert('Preencha o campo para peso.');
    } else if (weight != '' && height == '') {
        alert('Preencha o campo para altura.');
    } else if (weight == '' && height == '') {
        alert('Preencha os campos para peso e altura.');
    } else { // Both aren't empty
        return true;
    }

    return false;
}

function calculateBMI() {
    let weight = document.getElementById('weight-input-id').value;
    let height = document.getElementById('height-input-id').value;

    if (isValidData(weight, height)) {
        let bmi = weight / (height ** 2);
        bmi = bmi.toFixed(2);  // Convert for two decimal places
        // Store bmi in web browser's local storage
        localStorage.setItem('bmi', bmi); // Isn't necessary using JSON
        return bmi;
    }

    return NaN;
}

function displayBMI() {
    // Get bmi of web browser's local storage
    let bmi = localStorage.getItem('bmi');

    if (! isNaN(bmi)) {
        const outputWrap = document.getElementById('output-wrap');
        const outputElement = document.getElementById('output');

        if (outputWrap.classList.contains('hide')) {
            outputWrap.classList.remove('hide');
        }

        outputElement.innerHTML = `Seu IMC: <strong>${bmi}</strong>`;
    }
}

function getBMICondition() {
    // Get bmi as string may cause problems
    let bmi = parseFloat(localStorage.getItem('bmi'));

    // 0 to 18.49
    if (bmi < 18.5) {
        return 'underweight';
    // 18.5 to 24.99
    } else if (bmi <= 24.99) {
        return 'ideal-weight';
    // 25 to 29.99
    } else if (bmi <= 29.99) {
        return 'overweight';
    // 30 to 34.99
    } else if (bmi <= 34.99) {
        return 'obesity-grade-i';
    // 35 to 39.99
    } else if (bmi <= 39.99) {
        return 'obesity-grade-ii';
    // 40 or more
    } else {
        return 'morbid-obesity';
    }
}

function markBMICondition() {
    let bmi = localStorage.getItem('bmi');

    if (! isNaN(bmi)) {
        let conditionId = getBMICondition();
        conditionIds.push(document.getElementById(conditionId));

        // For avoiding that more of one condition on table stays marked
        // Might to exists a better way to make this
        if (conditionIndex > 0) {
            conditionIds[conditionIndex - 1].classList.remove('table-primary');
        }
        
        conditionIds[conditionIndex].classList.add('table-primary');
        conditionIndex++;
    }
}

calculateButton.addEventListener('click', function() {
    calculateBMI();
    clearInputFields();
    displayBMI();
    markBMICondition();
});

// This event is activated when the page is fully loaded
window.addEventListener('load', function() {
    if (localStorage.getItem('bmi') !== null) {
        displayBMI();
        markBMICondition();
    }
});