const account1 = {
  owner: "yogesh engla",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, 3000],
  interestRate: 1.5,
  pin: 1111,
};
const account2 = {
  owner: "tarun gautam",
  movements: [200, 3200, -350, -79, -321, -1020, 500, -40],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "gaurav kalbor",
  movements: [300, 3410, -50, -720, -310, -1200, 800, -80],
  interestRate: 1,
  pin: 3333,
};
const account4 = {
  owner: "dheeraj yadav",
  movements: [100, 400, -10, -70, -320, -150, 850, -20],
  interestRate: 0.7,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

// Html Elements --------------------------------------------->>>>
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--short");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTranferAmount = document.querySelector(".form__input--amount");
const inputLoamAount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosepin = document.querySelector(".form__input--pin");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrwal";
    const html = `
        <div class="movements__row">
        <div class="movements_type movements_type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${Math.abs(mov)}</div>
      </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

const displayUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

displayUserName(accounts);
console.log(accounts);

const displaySummary = function (movements) {
  const insert = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = `${insert}₹`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}₹`;

  const interest = movements
    .filter((mov) => mov > 0)
    .filter((mov) => mov > 100)
    .map((mov) => (mov * 1.2) / 100)
    .reduce((acc, mov) => acc + mov);

  labelSumInterest.textContent = `${interest}₹`;
};

displaySummary(account1.movements);

const displayBalance = function (movements) {
  const interest = movements
    .filter((mov) => mov > 0)
    .filter((mov) => mov > 100)
    .map((mov) => (mov * 1.2) / 100)
    .reduce((acc, mov) => acc + mov);

  const bal = movements.reduce((acc, mov) => acc + mov);
  const balMain = interest + bal;

  labelBalance.textContent = `${balMain}₹`;
};
displayBalance(account1.movements);

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  if (currentAccount.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `WelCome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
  }
  // Clear Input Field
  inputLoginUsername.value = " ";
  inputLoginPin.value = " ";
});
// console.log(currentAccount);
