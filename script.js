class Calculator{// skapar en klass
    constructor(firstDisplay, secondDisplay){//använder constructor så att den tar all vår input och functions
    //detta är så att vi får in vår display inne i vår constructor
        this.firstDisplayText= firstDisplay;
        this.secondDisplayText= secondDisplay;
        this.clear()
    }
    clear(){
      //tar bort båda display
        this.secondDisplay='';
        this.firstDisplay='';
        this.operation= undefined;
    }
    delete(){
      //´konverterar nummer till string sedan ta bort slutet av varje nummer
        this.secondDisplay=this.secondDisplay.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number ==='.' && this.secondDisplay.includes('.'))return//detta gör så att man kan bara skriva en enda punkt
        this.secondDisplay= this.secondDisplay.toString() + number.toString();//detta är för att javascript adderar på nummer när vi vill bara skriva
    }
    
   
    chooseOperation(operation){
       //gör så att den första numret går ovanför det andra när man vill t.ex. addera
        //efter man har tagit en operator så går nummret upp
        if (this.secondDisplay === '') return// detta lämnar den andra display tomt
        if (this.firstDisplay !== '') {//om den inte är tom så ska den ropa på compute function
          this.compute()//detta uppdatera våra nummer
        }
        this.operation = operation;
        this.firstDisplay = this.secondDisplay;
        this.secondDisplay = '';
      }
    compute(){
        let computation;
        //konverterar till nummer
        const prev = parseFloat(this.firstDisplay)
        const current = parseFloat(this.secondDisplay)
        //om vi inte har valt förra nummer eller vår nuvarande nummer så skriver den inte ut något
        if (isNaN(prev) || isNaN(current)) return
        //valde switch eftersom den är snabbare och mer effektiv för just denna situation
        switch (this.operation) {
          //detta är för användarens val om hen vill addera, subtrahera osv
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.secondDisplay = computation
        this.operation = undefined
        this.firstDisplay = ''
      }
      //denna function är så att vi kan få en decimaltal när vi lägger in flera nummer
    getDisplayNumber(number){
        const stringNumber = number.toString()//konvertera till string
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)) {//om man skriver en 0 så kommer den inte skirvas ut
          integerDisplay = ''
        } else {//skriver man en integer value så får man en "."
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {//om decimaldigit inte är null så skrivs integerdisplay och decimal digits
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay;
        }
      }
    updateDisplay(){
        this.secondDisplayText.innerText =
        this.getDisplayNumber(this.secondDisplay)
        //om vår operator inte är null så skriver den ut nummret sedan operatorn
      if (this.operation != null) {
        this.firstDisplayText.innerText =
          `${this.getDisplayNumber(this.firstDisplay)} ${this.operation}`
      } else {//detta rensas efter man har räknat klart så att man börjar om
        this.firstDisplayText.innerText = ''
      }
    }
  }
//skapar variabler så att jag får alla element från min html
const numberBtn= document.querySelectorAll('[data-number]');
const operationsBtn= document.querySelectorAll('[data-operation]');
const equalBtn= document.querySelector('[data-equals]');
const deleteBtn= document.querySelector('[data-delete]');
const clearBtn= document.querySelector('[data-all-clear]');
const firstDisplay= document.querySelector('[data-previous-operand]');
const secondDisplay= document.querySelector('[data-current-operand]');

const calculator = new Calculator(firstDisplay, secondDisplay);//skapar ny calculator och ger den en klass och ger


numberBtn.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)//skriver ut nummer
      calculator.updateDisplay()//uppdaterar skärmen varje gång användaren klcikar på en knapp
    })
  })
  
  operationsBtn.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalBtn.addEventListener('click', button => {
    calculator.compute()//ropar på compute function
    calculator.updateDisplay()
  })
  
  clearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

  