// Elementos
const calculateBtn = document.querySelector(".calculate-btn");

// Funções auxiliares
const getInput = (field) => field.value;
const clearField = (field) => field.value = field.value && "";
const calculateBmi = (weight, height) => weight / height ** 2;

// Funções

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

  console.log(bmi);
});