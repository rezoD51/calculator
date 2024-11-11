//kullanıcıdan veri alma 
const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

//ekranı güncelleme 
updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

//butona tıklandığında tepki vermeyi sağlama
keys.addEventListener('click', function (e) {
    const element = e.target;
    const value = element.value;

    //tıklanılan elementin buton olup olmadığını kontrol etme
    if (!element.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
        case 'sqrt':
        case '%':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    //işlem bititkten sonra = operatörünü güncelleyerek işleme devam etme
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    //eğer ilk değer boşsa ekrandaki değeri ilk değere ata
    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        //virgülden sonrasını 7 basamak ile sınırlandırma
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;

}

//hesaplamaların yapılması
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second
    } else if (operator === '/') {
        return first / second;
    } else if (operator === '^') {
        return first ** second;
    } else if (operator === 'sqrt') {
        return Math.pow(second, 1 / first);
    } else if (operator === '%') {
        return ((first * second )/100);
    }
    return second;
}

//beklenen ikici değeri alma
function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        //girilen saylıların yanayana eklenmesi
        displayValue = displayValue === '0' ? num : displayValue + num;
    }

}
//değerin sonunu kontrol ederek nokta ekleme eğer nokta varsa ekleme
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}
//ekranın değerini sıfırlama fonksiyonu
function clear() {
    displayValue = '0';
}