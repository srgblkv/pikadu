// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

/////////////////////////////////////////////////

// tempory data --------------------------
const listUsers = [
  {
    id: '01',
    email: '123@m.com',
    password: '123',
    displayName: '123asd',
  },
  {
    id: '02',
    email: '321@m.com',
    password: '321',
    displayName: 'dsa321',
  },
];
// ---------------------------------------

// login form nodes ----------------------
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
// ---------------------------------------

// user ui node --------------------------
const userUiElem = document.querySelector('.user-ui');
const userName = document.querySelector('.user-name');
const userLogout = document.querySelector('.exit');
// ---------------------------------------

// functions for authorization -----------
const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь не зарегистрирован или введены некорректные данные');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      if (email && validateEmail(email) && password) {
        const user = {
          id: email,
          email,
          password,
          displayName: email.split('@')[0]
        }
        listUsers.push(user);
        this.authorizedUser(user);
        handler();
      } else {
        alert('Введите корректный email и пароль для регистрации');
      }
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
  },
  getUser(email) {
    return listUsers.find((user) =>
      user.email === email
    );
  },
  authorizedUser(user) {
    this.user = user;
  }
};
// ---------------------------------------

// validate Email ------------------------
const validateEmail = (email) => {
  const hosting = email.split('@')[1];
  return hosting.split('').find(char => char === '.');
};
// ---------------------------------------

// node switcher -------------------------
const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    userName.textContent = user.displayName;
    loginElem.style.display = 'none';
    userUiElem.style.display = '';
  } else {
    loginElem.style.display = '';
    userUiElem.style.display = 'none';
  }
};
// ---------------------------------------

// event listener ------------------------
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passInput.value, toggleAuthDom);
});

loginSignup.addEventListener('click', (event) => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passInput.value, toggleAuthDom);
});

userLogout.addEventListener('click', (event) => {
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);
});
// --------------------------------------

// start ---------------------------------
toggleAuthDom();
