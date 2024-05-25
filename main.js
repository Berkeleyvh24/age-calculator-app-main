document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dobForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const dayInput = document.getElementById('day');
      const monthInput = document.getElementById('month');
      const yearInput = document.getElementById('year');
      const errorElement = document.getElementById('error');
      const resultElement = document.getElementById('results-container');
  
      errorElement.textContent = '';
      resultElement.textContent = '';
  
      const day = parseInt(dayInput.value, 10);
      const month = parseInt(monthInput.value, 10);
      const year = parseInt(yearInput.value, 10);
  
      if (!isValidDate(day, month, year)) {
        errorElement.textContent = 'Please enter a valid date.';
        return;
      }
  
      const age = calculateAge(day, month, year);
      displayAge(age, resultElement);
    });
  
    function isValidDate(day, month, year) {
      if (isNaN(day) || day < 1 || day > 31) {
        return false;
      }
  
      if (isNaN(month) || month < 1 || month > 12) {
        return false;
      }
  
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return false;
      }
  
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }
  
    function calculateAge(day, month, year) {
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();
  
      if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }
  
      if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }
  
      return { years: ageYears, months: ageMonths, days: ageDays };
    }
  
    function displayAge(age, resultElement) {
      resultElement.innerHTML = `<span>${age.years}</span> years <span>${age.months}</span> months <span>${age.days}</span> days`;
    }
  });