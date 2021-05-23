
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')
const operatorKeys = keys.querySelectorAll('[data-type="operator"]')



keys.addEventListener('click', event => {
    /*console.log(event.target)*/


    if (!event.target.closest('button'))return

    const key = event.target
    /*console.log(key.textContent)*/
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

// An Number Key
    
    if (key.dataset.type == 'number') {
        if ( displayValue == '0' || previousKeyType == 'operator') 
             { 
                display.textContent = keyValue
            }
            
            else{
                display.textContent = displayValue + keyValue
            }
          
          calculator.dataset.previousKeyType = 'number'

    }
    
// An Operation Key 

    if(key.dataset.type == 'operator') {

        //const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => {el.dataset.state = ''})
        //console.log(operatorKeys)

        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }


    if (type == 'equal')
    {
        //Perform a calculation 
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent = calculate (firstNumber, operator, secondNumber)

    }


    if (type == 'clear') {
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type
 })


 function calculate (firstNumber, operator, secondNumber) {

    firstNumber = parseInt (firstNumber)
    secondNumber = parseInt (secondNumber)


    let result = ''
        if (operator == 'plus') result =  firstNumber + secondNumber
        if (operator == 'minus') result =  firstNumber - secondNumber
        if (operator == 'times') result =  firstNumber * secondNumber
        if (operator == 'divide') result =  firstNumber / secondNumber

        return result
    
 }

// TESTARE 
 //console.assert(assertion,  msg)


    function clearCalculator() {
        //Press the clear key
        const clearKey = document.querySelector('[data-type = "clear"]')
        clearKey.click()
    }

    function testClearKey() {
        clearCalculator()

        console.assert(display.textContent == '0', 'Clear key. Display should be 0')
        console.assert(!calculator.dataset.firstNumber, 'Clear key. No first number')
        console.assert(!calculator.dataset.operator, 'Clear key. No operator remain')
    }

    // const one = document.querySelector('[data-key="1"]')
    // const five = document.querySelector('[data-key="5"]')
    // const nine = document.querySelector('[data-key="9"]')

    function testKeySequence(test) {
        //const array = [...keys]

        //  Press keys
            // A. Press more keys
        test.keys.forEach( key => { 
            // B. Press one key
            document.querySelector(`[data-key = "${key}"]`).click() 
        })

        //  Assertion
            // A. Test Value
            // B. Test Message

            console.assert(display.textContent == test.value, test.message)


        //  Clear Calculator
            clearCalculator()
            testClearKey()
    }

    const test = [{
        keys: ['1'],
        value: '1',
        message: 'Click 1'
    }, {
        keys: ['1', '5'],
        value: '15',
        message: 'Click 15'
    }, {
        keys: ['1', '5', '9'],
        value: '159',
        message: 'Click 159'
    }, {
        keys: ['1', '5', 'times', '9', 'equal'],
        value: '135',
        message: 'Calculation with times'
    }]

    test.forEach(testKeySequence)


    // /One test
    // ne.click()
    // onsole.assert(display.textContent == '1', 'Clicked One')
    // learCalculator()
    // estClearKey()


    // /15
    // ne.click()
    // ive.click()
    // onsole.assert(display.textContent == '15', 'Clicked 1 and 5 and 9')
    // learCalculator()
    // estClearKey()
   
    // /159
    // ne.click()
    // ive.click()
    // ine.click()
    // onsole.assert(display.textContent == '159', 'Clicked 1 and 5 and 9')
    // learCalculator()
    // estClearKey()