// Elementos
const calculateBtn = document.querySelector(".calculate-btn");

// Funções auxiliares
const getInput = (field) => field.value;
const clearField = (field) => field.value = field.value && "";
const calculateBmi = (weight, height) => weight / height ** 2;

// Funções
const showClasssification = (bmi) => {
  const container = document.querySelector(".bmi-result");
  const el = container.querySelector(".bmi-value");

  container.classList.contains("is-hidden") && container.classList.remove("is-hidden");
  el.textContent = String(bmi).replace(".", ",");
}

const markClassification = (bmi) => {
  const classificationContainer = document.querySelector(".categories-table tbody");
  const classifications = classificationContainer.children;

  for (const classification of classifications) {
    if (classification.classList.contains("is-tr-active")) {
      classification.classList.remove("is-tr-active");
    }
  }

  if (bmi < 18.5) {
    classifications[0].classList.add("is-tr-active");
  } else if (bmi <= 24.9) {
    classifications[1].classList.add("is-tr-active");
  } else if (bmi <= 29.9) {
    classifications[2].classList.add("is-tr-active");
  } else if (bmi <= 34.9) {
    classifications[3].classList.add("is-tr-active");
  } else if (bmi <= 39.9) {
    classifications[4].classList.add("is-tr-active");
  } else {
    classifications[5].classList.add("is-tr-active");
  }
}

// Eventos
window.addEventListener("load", () => {
  const weightField = document.querySelector(".weight-input");
  const heightField = document.querySelector(".height-input");

  clearField(weightField);
  clearField(heightField);
});

calculateBtn.addEventListener("click", () => {
  const weightField = document.querySelector(".weight-input");
  const heightField = document.querySelector(".height-input");
  const weight = getInput(weightField);
  const height = getInput(heightField);
  const bmi = calculateBmi(weight, height).toFixed(2);

  markClassification(bmi);
  showClasssification(bmi);
});