let conditionIndex = 0;
const conditionIds = [];
const calculateButton = document.getElementById('calc-btn');

function clearInputFields() {
    document.getElementById('weight-input-id').value = '';
    document.getElementById('height-input-id').value = '';
}

function calculateBMI() {
    let weight = document.getElementById('weight-input-id').value;
    let height = document.getElementById('height-input-id').value;
    
    let isValidWeight = (weight !== '') && (! isNaN(weight));
    let isValidHeight = (height !== '') && (! isNaN(height));
    
    if (isValidWeight && isValidHeight) {
        let bmi = weight / (height ** 2);
        bmi = bmi.toFixed(2);
        localStorage.setItem('bmi', bmi);
        return bmi;
    }

    alert('Valor(es) inválido(s)!');

    return NaN;
}

function displayBMI(bmi) {
    if (! isNaN(bmi)) {
        const outputWrap = document.getElementById('output-wrap');
        const outputElement = document.getElementById('output');

        if (outputWrap.classList.contains('hide')) {
            outputWrap.classList.remove('hide');
        }

        outputElement.innerHTML = `Seu IMC: <strong>${bmi}</strong>`;
    }
}

function getBMICondition(bmi) {
    const conditionIds = ['underweight', 'ideal-weight', 'overweight', 'obesity-grade-i', 'obesity-grade-ii', 'morbid-obesity'];

    // RATES
    /*
        Underweight:      0 to 18.49
        Ideal weight:     18.5 to 24.99
        Overweight:       25 to 29.99
        Obesity grade I:  30 to 34.99
        Obesity grade II: 35 to 39.99
        Morbid obesity:   40 and so on
    */

    if (bmi < 18.5) {
        return conditionIds[0];
    } else if (bmi <= 24.99) {
        return conditionIds[1];
    } else if (bmi <= 29.99) {
        return conditionIds[2];
    } else if (bmi <= 34.99) {
        return conditionIds[3];
    } else if (bmi <= 39.99) {
        return conditionIds[4];
    } else { // 40 and so on
        return conditionIds[5];
    }

    return null;
}

function markBMICondition(bmi) {
    let conditionId;

    if (! isNaN(bmi)) {
        conditionId = getBMICondition(bmi);
                
        conditionIds.push(document.getElementById(conditionId));

        if (conditionIndex > 0) {
            conditionIds[conditionIndex - 1].classList.remove('table-primary');
        }
        
        conditionIds[conditionIndex].classList.add('table-primary');
        conditionIndex++;
    }
}

calculateButton.addEventListener('click', function() {
    let bmi = calculateBMI();

    clearInputFields();
    displayBMI(bmi);

    markBMICondition(bmi);
});

window.addEventListener('load', function() {
    if (localStorage.getItem('bmi') !== null) {
        let bmi = localStorage.getItem('bmi');

        displayBMI(bmi);
        markBMICondition(bmi);
    }
});