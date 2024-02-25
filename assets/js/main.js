const clearField = (field) => field.value = field.value && "";

window.addEventListener("load", () => {
  const weightField = document.querySelector(".weight-input");
  const heightField = document.querySelector(".height-input");

  clearField(weightField);
  clearField(heightField);
});