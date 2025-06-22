// DOM elements
document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('bill');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const customTip = document.querySelector('.custom-tip');
    const peopleInput = document.getElementById('people');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const resetBtn = document.getElementById('reset-btn');
    const errorMessage = document.querySelector('.error-message');

    //State
    let billValue = 0;
    let tipValue = 0.15;
    let peopleValue = 1;

    //Initialize
    peopleInput.value = peopleValue;
    calculateTip();

    //Event listeners
    billInput.addEventListener('input', handleBillInput);
    tipButtons.forEach(button => button.addEventListener('click', handleTipButtonClick));
    customTip.addEventListener('input', handleCustomTip);
    peopleInput.addEventListener('input', handlePeopleInput);
    resetBtn.addEventListener('click', resetCalculator);

    //Functions
    function handleBillInput () {
        billValue = parseFloat(billInput.value) || 0;
        calculateTip();
        validateResetButton();
    }

    function handleTipButtonClick(e) {
        tipButtons.forEach(button => button.classList.remove('active'));

        e.target.classList.add('active');

        tipValue = parseInt(e.target.dataset.percent) / 100;

        customTip.value = '';
        
        calculateTip();
    }

    function handleCustomTip() {
        // Remove active class from all buttons
        tipButtons.forEach(button => button.classList.remove('active'));
        
        tipValue = parseFloat(customTip.value) / 100 || 0;
        calculateTip();
    }


    function handlePeopleInput() {  
        peopleValue = parseInt(peopleInput.value) || 0;

        // Show error if people is 0
        if (peopleValue === 0) {
            errorMessage.style.visibility = 'visible';
            peopleInput.style.outline = '2px solid hsl(13, 70%, 60%)';
        }
        else {
            errorMessage.style.visibility = 'hidden';
            peopleInput.style.outline = 'none';
        }

        calculateTip();
    }

    function calculateTip() {
        if (peopleValue <= 0 ) return;

        const tipAmount = (billValue * tipValue) / peopleValue;
        const totalAmount = (billValue + (billValue * tipValue)) / peopleValue;

        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;

        validateResetButton();
    }

    function validateResetButton() {
        if (billValue > 0  || tipValue > 0 || peopleValue !== 1) {
            resetBtn.disabled = false;
        } else {
            resetBtn.disabled = true;
        }
    }

    function resetCalculator() {
        billValue = 0;
        tipValue = 0.15;
        peopleValue = 1;

            // Reset UI
        billInput.value = '';
        tipButtons.forEach(button => button.classList.remove('active'));
        customTip.value = '';
        peopleInput.value = peopleValue;
        errorMessage.style.visibility = 'hidden';
        peopleInput.style.outline = 'none';
        
        // Reset displays
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        
        // Disable reset button
        resetBtn.disabled = true;

    }
});


