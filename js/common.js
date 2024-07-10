// отключаем submit формы поиска в header при пустом инпуте
const searchForm = document.querySelector('.header__form');
const searchFormInput = searchForm.querySelector('input');
searchForm.addEventListener('submit', (e) => {
  if (searchFormInput.value === '') {
    e.preventDefault();
  }
})

// селект регион
const regionSelect = document.querySelector('.header__region-select');
makeFunctionalityForSelect(regionSelect);

// селект категория
const categoriesSelect = document.querySelector('.header__categories-select');
const searchInput = document.querySelector('.header__input');
makeFunctionalityForSelect(categoriesSelect, searchInput);

function makeUnselectable(select) {
  const options = select.querySelectorAll('li');
  options.forEach(option => {
    option.setAttribute('tabIndex', '-1');
    triggerСlick(option);
  })
}

function makeFunctionalityForSelect(select, focusTargetAfterSelect) {
  const selectBtn = select.querySelector('button');
  const selectList = select.querySelector('ul');
  // выбранным по дефолту значением принимается первая опция
  if (!selectBtn.innerHTML) {
    selectBtn.innerHTML = selectList.children[0].textContent;
    selectList.children[0].style.display = 'none';
    selectList.children[0].classList.add('selected');
    selectBtn.setAttribute('aria-label', `регион ${selectList.children[0].textContent}`);
    makeUnselectable(select);
  }
  // при открытии селекта делаем опции доступными для выбора через клавиатуру
  selectBtn.addEventListener('click', () => {
    const options = select.querySelectorAll('li');
    options.forEach(option => {
      if (option.classList.contains('selected')) {
        option.setAttribute('tabIndex', '-1');
        return;
      }
      option.setAttribute('tabIndex', '0');
    })
    //открываем / закрываем селектлист
    select.classList.toggle('is-active');
  })
  // закрытие селекта при выборе опции
  const options = select.querySelectorAll('li');
  options.forEach(option => {
    option.addEventListener('click', () => {
      // находим ранее выбранную опцию и делаем ее доступной в списке
      const selectedItem = selectList.querySelector('.selected');
      if (selectedItem) {
        selectedItem.classList.remove('selected');
        selectedItem.style.display = 'block';
        selectedItem.setAttribute('tabIndex', '0');
      }
      // передаем значение выбранной опции в кнопку и убираем ее из списка
      selectBtn.textContent = option.textContent;
      option.style.display = 'none';
      select.classList.remove('is-active');
      option.classList.add('selected');
      // при закрытии селекта делаем опции недоступными для выбора через клавиатуру
      makeUnselectable(select);
      // и фокусируем кнопку селекта
      if (focusTargetAfterSelect) {
        focusTargetAfterSelect.focus();
      }
      else {
        selectBtn.focus();
      }
      selectBtn.setAttribute('aria-label', `регион ${option.textContent}`);
    })
  })
  // закрытие селекта при клике вне
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target !== selectBtn && !target.closest('.select-list')) {
      select.classList.remove('is-active');
    }
  })

  return select;
}

// вызываем клик по элементу при нажатии на Enter (когда он в фокусе);
function triggerСlick(element) {
  element.onfocus = () => {
    element.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        element.click();
      }
    })
  }

  return element;
}

// бургер меню
const burgerBtn = document.querySelector('.header__burger-btn');
const burgerMenu = document.querySelector('.header__main-nav');
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('transformed');
  burgerMenu.classList.toggle('show');
})

document.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.closest('.header__main-nav') && (!target.closest('.header__burger-btn'))) {
    burgerMenu.classList.remove('show');
    burgerBtn.classList.remove('transformed');
  }
})

// закрытие модального окна
const modal = document.querySelector('.modal');
if (modal) {
  const modalWindows = modal.querySelectorAll('.modal__window');
  modalWindows.forEach(modalWindow => {
    const closeBtn = modalWindow.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      closeBtn.closest('.modal__window').classList.remove('.show');
    });
  })

  modal.addEventListener('click', (e) => {
    const target = e.target;
    if (!e.target.closest('.modal__window') || target.closest('.modal__close-btn')) {
      // перед закрытием находим видимое модальное окно и скрываем
      const modalWindows = modal.querySelectorAll('.modal__window');
      modalWindows.forEach(modalWindow => {
        if (window.getComputedStyle(modalWindow).display == 'flex') {
          // если было открыто модальное окно с формой, то очищаем форму
          const form = modalWindow.querySelector('form');
          if (form) {
            form.reset();
            validation.refresh();
          }
          modalWindow.style.display = 'none';
          modalWindow.classList.remove('show')
        }
      })
      // после скрываем всю модалку
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 150);
      document.body.style.overflowY = 'auto';
    }
  })
}

// при снятии флажка чекбокса в форме обратной связи, делаем кнопку неaктивной
const form = document.querySelector('.form');
if (form) {
  const checkbox = form.querySelector('.checkbox');
  if (checkbox) {
    const formBtn = form.querySelector('.form__btn');
    checkbox.addEventListener('change', () => {
      !checkbox.checked ? formBtn.setAttribute('disabled', '') : formBtn.removeAttribute('disabled');
    })
  }
}
