let indexOfCondition = 0;
const conditionId = [];
const calculateBtn = document.getElementById('calc-btn');

function makesTheFieldsEmpty() {
    document.getElementById('weight-input-id').value = '';
    document.getElementById('height-input-id').value = '';
}

function calculatesBMI() {
    // Store the values of inputs
    let weight = document.getElementById('weight-input-id').value;
    let height = document.getElementById('height-input-id').value;
    
    // Data validation
    let validWeight = (weight !== '') && (! isNaN(weight));
    let validHeight = (height !== '') && (! isNaN(height));
    
    if (validWeight && validHeight) {
        let bmi = weight / (height ** 2);

        bmi = bmi.toFixed(2); // Precision of two decimal places

        // Stores the BMI in local storage of user browser or updates the existing value
        localStorage.setItem('bmi', bmi); // Is not necessary using JSON

        return bmi;
    }

    alert('Valor(es) inválido(s)!');

    return NaN;
}

function showsBMI(bmi) {
    if (! isNaN(bmi)) {
        const outputWrap = document.getElementById('output-wrap');
        const output = document.getElementById('output');

        if (outputWrap.classList.contains('hide')) {
            outputWrap.classList.remove('hide');
        }

        output.innerHTML = `Seu IMC: <strong>${bmi}</strong>`;
    }
}

function marksCondition(bmi) {
    location.reload();
    let conditionsIdIndex;
    const DEFAULT_FONT_WEIGHT = 'normal';
    const DEFAULT_BACKGROUND_COLOR = '#fff';
    const conditionsId = ['underweight', 'ideal-weight', 'overweight', 'obesity-grade-i', 'obesity-grade-ii', 'morbid-obesity'];

    // RATES
    /*
        Underweight:      0 to 18.49
        Ideal weight:     18.5 to 24.99
        Overweight:       25 to 29.99
        Obesity grade I:  30 to 34.99
        Obesity grade II: 35 to 39.99
        Morbid obesity:   40 and so on
    */

    if (! isNaN(bmi)) {
        if (bmi < 18.5) {
            conditionsIdIndex = 0;
        } else if (bmi <= 24.99) {
            conditionsIdIndex = 1;
        } else if (bmi <= 29.99) {
            conditionsIdIndex = 2;
        } else if (bmi <= 34.99) {
            conditionsIdIndex = 3;
        } else if (bmi <= 39.99) {
            conditionsIdIndex = 4;
        } else { // 40 and so on
            conditionsIdIndex = 5;
        }
                
        // Note that "conditionId" (singular) is different of "conditionsId" (plural)
        conditionId.push(document.getElementById(conditionsId[conditionsIdIndex]));

        // This avoid that more of one condition stay marked
        if (indexOfCondition > 0) {
            conditionId[indexOfCondition - 1].classList.remove('table-primary');
            conditionId[indexOfCondition - 1].classList.add('table-light');
        }
        
        conditionId[indexOfCondition].classList.add('table-primary');
        indexOfCondition++;
    }
}

calculateBtn.addEventListener('click', function() {
    let bmi = calculatesBMI();

    makesTheFieldsEmpty();
    showsBMI(bmi);
    marksCondition(bmi);
});

window.addEventListener('load', function() {
    if (localStorage.getItem('bmi') !== null) { // If there is BMI stored
        let bmi = localStorage.getItem('bmi'); // Gets the value of BMI stored in local storage of user browser

        showsBMI(bmi);
        marksCondition(bmi);
    }
});