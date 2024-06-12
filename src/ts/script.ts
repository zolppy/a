// Elementos
const calculateBtn = document.querySelector(
  ".calculate-btn"
) as HTMLButtonElement;

// Funções auxiliares
const getInput = (field: HTMLInputElement) => field.value;
const clearField = (field: HTMLInputElement) =>
  (field.value = field.value && "");
const calculateBmi = (weight: number, height: number) => weight / height ** 2;

// Funções
const showClasssification = (bmi: string) => {
  const container = document.querySelector(".bmi-result") as HTMLElement;
  const el = container.querySelector(".bmi-value") as HTMLSpanElement;

  container.classList.contains("is-hidden") &&
    container.classList.remove("is-hidden");
  el.textContent = bmi.replace(".", ",");
};

const markClassification = (bmi: number) => {
  const classificationContainer = document.querySelector(
    ".categories-table tbody"
  ) as HTMLElement;
  const classifications = classificationContainer.children as HTMLCollection;

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
};

// Eventos
window.addEventListener("load", () => {
  const weightField = document.querySelector(
    ".weight-input"
  ) as HTMLInputElement;
  const heightField = document.querySelector(
    ".height-input"
  ) as HTMLInputElement;

  clearField(weightField);
  clearField(heightField);
});

calculateBtn.addEventListener("click", () => {
  const weightField = document.querySelector(
    ".weight-input"
  ) as HTMLInputElement;
  const heightField = document.querySelector(
    ".height-input"
  ) as HTMLInputElement;
  const weight: number = Number(getInput(weightField));
  const height: number = Number(getInput(heightField));
  const bmi: number = Number(calculateBmi(weight, height).toFixed(2));

  markClassification(bmi);
  showClasssification(bmi.toString());
});
