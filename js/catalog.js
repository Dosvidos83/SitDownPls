const filteredArr = [
  { name: 'Диван кожаный', model: 'R-94', rating: '5.0', src: './images/sofa_R-94.webp', price: '94 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван апартековый', model: 'T-75', rating: '4.9', src: './images/sofa_T-75.webp', price: '69 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван тканевый', model: 'D-31', rating: '4.8', src: './images/sofa_D-31.webp', price: '28 490', type: 'Диван', shape: 'corner', },
  { name: 'Диван велюровый', model: 'Y-68', rating: '4.8', src: './images/sofa_Y-68.webp', price: '22 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван из шинила', model: 'W-95', rating: '4.8', src: './images/sofa_W-95.webp', price: '22 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван флоковый', model: 'G-41', rating: '4.8', src: './images/sofa_G-41.webp', price: '17 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван шиниловый', model: 'V-43', rating: '4.8', src: './images/sofa_V-43.webp', price: '19 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван велюровый', model: 'S-99', rating: '4.7', src: './images/sofa_S-99.webp', price: '19 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван из кожзама', model: 'F-85', rating: '4.7', src: './images/sofa_F-85.webp', price: '26 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван флоковый', model: 'H-64', rating: '4.6', src: './images/sofa_H-64.webp', price: '25 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван флоковый', model: 'H-58', rating: '4.6', src: './images/sofa_H-58.webp', price: '23 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван из кожзама', model: 'R-43', rating: '4.6', src: './images/sofa_R-43.webp', price: '33 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван из шинила', model: 'C-42', rating: '4.6', src: './images/sofa_C-42.webp', price: '18 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван велюровый', model: 'U-58', rating: '4.6', src: './images/sofa_U-58.webp', price: '21 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван флоковый', model: 'F-41', rating: '4.5', src: './images/sofa_F-41.webp', price: '17 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван велюровый', model: 'R-85', rating: '4.5', src: './images/sofa_R-85.webp', price: '34 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван велюровый', model: 'S-44', rating: '4.5', src: './images/sofa_S-44.webp', price: '19 990', type: 'Диван', shape: 'corner', },
  { name: 'Диван из шинила', model: 'C-80', rating: '4.4', src: './images/sofa_C-80.webp', price: '20 990', type: 'Диван', shape: 'corner', },
]

// создаем карточки каталога
// задаем количество карточек в одной вкладке
let cardsinTab;
const windowWidth = document.documentElement.clientWidth;
windowWidth >= 1022 ? cardsinTab = 9 : cardsinTab = 6;
// определяем количество вкладок;
const tabsCount = Math.ceil(filteredArr.length / cardsinTab);
// создаем табы и кнопки управления
const btnsContainer = document.querySelector('.catalog__tab-pagination');
const tabList = document.querySelector('.catalog__tab-list');
let tab;
let cardList;
let tabNumber = 0;
filteredArr.forEach((card, index) => {
  if (Number.isInteger(index / cardsinTab)) {
    tab = createTab();
    cardList = document.createElement('ul');
    cardList.classList.add('catalog__card-list');
  }
  const article = createCard(card);
  const catalogSlide = document.createElement('li');
  catalogSlide.classList.add('catalog__tab-item');
  catalogSlide.append(article);
  cardList.append(catalogSlide);
  tab.append(cardList);
  tabList.append(tab);
})
// кнопки управления
if (tabsCount > 1) {
  for (let i = 0; i < tabsCount; i++) {
    const tabBtn = createBtn(i + 1);
    btnsContainer.append(tabBtn);
  }
}

// все вкладки кроме первой скрыты
const tabs = tabList.querySelectorAll('.catalog__tab');
tabs.forEach((tab, i) => {
  if (i === 0) {
    tab.setAttribute('data-active', '');
    return;
  }
  tab.style.display = 'none';
})

// показываем соответствующую вкладку по нажатию на кнопку управления
const tabControlBnts = btnsContainer.querySelectorAll('.catalog__tab-control-btn');
btnsContainer.children[0].classList.add('catalog__tab-control-btn-active');
tabControlBnts.forEach(btn => {
  btn.addEventListener('click', () => {
    // при нажатии на кнопку, которой соответствует уже открытая вкладка ничего не происходит
    if (btn.classList.contains('catalog__tab-control-btn-active')) {
      return;
    }
    const prevActiveBtn = btnsContainer.querySelector('.catalog__tab-control-btn-active');
    prevActiveBtn.classList.remove('catalog__tab-control-btn-active');
    btn.classList.add('catalog__tab-control-btn-active');
    // до открытия нужной вкладки находим уже открытую и скрываем
    const prevOpened = tabList.querySelector('li[data-active]');
    prevOpened.style.display = 'none';
    prevOpened.removeAttribute('data-active');
    // показываем нужную вкладку
    const tabToOpen = tabList.childNodes[btn.textContent - 1];
    tabToOpen.setAttribute('data-active', '');
    tabToOpen.style.display = 'list-item';
    document.querySelector('.catalog__filters-container').scrollIntoView();
  })
})

function createBtn(textContent) {
  const btn = document.createElement('button');
  btn.classList.add('catalog__tab-control-btn');
  btn.textContent = textContent;

  return btn;
}

function createTab() {
  const tab = document.createElement('li');
  tab.classList.add('catalog__tab');

  return tab;
}

function createCard(articleObj) {
  const card = document.createElement('article');
  card.classList.add('article', 'catalog__article');

  const raitingIndicator = document.createElement('span');
  raitingIndicator.textContent = articleObj.rating;
  raitingIndicator.classList.add('article__rating-indicator', 'rating-indicator');

  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', articleObj.src);
  cardImg.setAttribute('alt', `${articleObj.name} ${articleObj.model}`);
  cardImg.classList.add('catalog__article-img', 'article__img');

  const cardTextContainer = document.createElement('div');
  cardTextContainer.classList.add('catalog__article-text-content', 'article__text-content');

  const cardTitle = document.createElement('h3');
  cardTitle.innerHTML = `${articleObj.name}<br />“${articleObj.model}”`;
  cardTitle.classList.add('catalog__article-title', 'article__title');

  const cardPrice = document.createElement('span');
  cardPrice.textContent = `${articleObj.price} руб`;
  cardPrice.classList.add('catalog__article-price', 'article__price');

  const cardButton = document.createElement('a');
  cardButton.textContent = 'Купить';
  cardButton.classList.add('catalog__article-btn', 'article__btn');
  cardButton.setAttribute('type', 'button');
  cardButton.setAttribute('href', './card.html');

  cardTextContainer.append(cardTitle);
  cardTextContainer.append(cardPrice);
  cardTextContainer.append(cardButton);

  card.append(raitingIndicator);
  card.append(cardImg);
  card.append(cardTextContainer);

  return card;
}

const rangeSlider = document.querySelector('.catalog__input-range-slider');
noUiSlider.create(rangeSlider, {
  start: [2000, 150000],
  connect: true,
  step: 1,
  range: {
    'min': 0,
    'max': 200000,
  }
});

const noUiSlidernoUiHandle = document.querySelectorAll('.noUi-handle');
noUiSlidernoUiHandle.forEach(el => {
  el.addEventListener('focus', () => {
    const noUiConnect = document.querySelector('.noUi-connect');
    noUiConnect.classList.add('noUi-connect_focus');
  })

  el.addEventListener('blur', () => {
    const noUiConnect = document.querySelector('.noUi-connect');
    noUiConnect.classList.remove('noUi-connect_focus');
  })

  el.addEventListener('active', () => {
    const noUiConnect = document.querySelector('.noUi-connect');
    noUiConnect.classList.remove('noUi-connect_focus');
  })
})

const inputFrom = document.querySelector('#input-price-0');
const inputTo = document.querySelector('#input-price-1');
const inputs = [inputFrom, inputTo,];
inputs.forEach((input, index) => {
  // ввод только цифр
  input.addEventListener('keydown', event => {
    // разрешаем: backspace, delete, tab и escape
    if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || event.keyCode === 13 ||
      // Разрешаем: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // разрешаем: home, end, влево, вправо
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // ничего не делаем
      return;
    }
    else {
      // запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
    }
  });

  function setRangeSlider(i, value) {
    let arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr)
  }

  // изменение rangeSlider при изменении значения в инпуте
  input.addEventListener('change', event => {
    const num = Number(event.target.value.replace(' ', ''));
    setRangeSlider(index, num);
  });
})

// разделение числа на разряды
rangeSlider.noUiSlider.on('update', function (values, handle) {
  const value = `${Math.round(values[handle])}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  inputs[handle].value = value;
})

if (windowWidth < 1350) {
  // filters dropdown
  const filtersContainer = document.querySelector('.catalog__filters-container');
  const dropdownBtns = filtersContainer.querySelectorAll('.catalog__filter-subtitle');
  dropdownBtns.forEach(btn => {
    btn.setAttribute('tabIndex', '0');
    triggerСlick(btn);
    btn.addEventListener('click', (e) => {
      const target = e.target;
      const openedFilter = filtersContainer.querySelector('.is-active');
      const filterList = target.closest('.catalog__filters-item');
      if (openedFilter && openedFilter !== filterList) {
        openedFilter.classList.remove('is-active');
      }
      filterList.classList.toggle('is-active');
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const openedFilter = filtersContainer.querySelector('.is-active')
    if (!target.closest('.catalog__filters-item')
      && !target.closest('.is-active')
      && openedFilter) {
      openedFilter.classList.remove('is-active');
    }
  })
}

// вызываем клик по элементу при нажатии на Enter или Space (когда он в фокусе)
function triggerСlick(element) {
  element.onfocus = () => {
    element.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        element.click();
      }
    })
  }

  return element;
}

// тэги фильтра (только чекбоксы)
const tagList = document.querySelector('.catalog__filters-tag-list');
const filterInputs = document.querySelectorAll('.catalog__checkbox');
filterInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    const label = e.target.nextElementSibling;
    const choiceValue = label.textContent;
    const inputName = input.getAttribute('name');
    // создаем tag если галочка ставится
    if (e.target.checked) {
      const tagItem = document.createElement('li');
      tagItem.classList.add('catalog__tag-item');

      const tag = document.createElement('span');
      tag.textContent = choiceValue;
      tag.classList.add('catalog__tag');
      // tag color
      let tagClass;
      switch (inputName) {
        case 'category':
          tagClass = '_color-lime';
          break;
        case 'price':
          tagClass = '_color-bone';
          break;
        case 'discount':
          tagClass = '_color-violet';
          break;
        case 'color':
          tagClass = '_color-grey';
          break;
      }

      tag.classList.add(`catalog__tag${tagClass}`);
      const closeTagBtn = document.createElement('button');
      closeTagBtn.classList.add('catalog__close-tag-btn', 'close-btn');
      // убираем tag через кнопку закрытия
      closeTagBtn.addEventListener('click', () => {
        const tagToClose = closeTagBtn.parentElement;
        tagToClose.parentElement.remove();
        input.checked = false;
      })

      const closeBtnRect = document.createElement('span');

      closeTagBtn.append(closeBtnRect);
      tag.append(closeTagBtn);
      tagItem.append(tag);
      tagList.append(tagItem);
    }
    else {
      // убираем tag если галочка снимается
      const tags = tagList.querySelectorAll('.catalog__tag');
      tags.forEach(tag => {
        if (tag.textContent === choiceValue) {
          tag.parentElement.remove();
        }
      })
    }
  })
})

// тэг ценового диапазона
rangeSlider.noUiSlider.on('set', function (values) {
  // если есть тэг по предыдущей фильтрации цены, то удаляем его
  const prevPriceTag = tagList.querySelector('.price-tag');
  if (prevPriceTag) {
    prevPriceTag.parentElement.remove();
  }
  const maxPriceValue = `${Math.round(values[1])}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  const tagItem = document.createElement('li');
  tagItem.classList.add('catalog__tag-item');

  const tag = document.createElement('span');
  tag.textContent = `До ${maxPriceValue}`;
  tag.classList.add('catalog__tag', `catalog__tag_color-bone`, 'price-tag');
  const closeTagBtn = document.createElement('button');
  closeTagBtn.classList.add('catalog__close-tag-btn', 'close-btn');
  const closeBtnRect = document.createElement('span');

  closeTagBtn.append(closeBtnRect);
  // убираем tag через кнопку закрытия
  closeTagBtn.addEventListener('click', () => {
    const tagToClose = closeTagBtn.parentElement;
    tagToClose.parentElement.remove();
  })
  tag.append(closeTagBtn);
  tagItem.append(tag);
  tagList.append(tagItem);
})

// скрываем чекбоксы 9+
const listMaxLenght = 9;
const filtersList = document.querySelector('.catalog__filters-list');
const filterSubLists = filtersList.querySelectorAll('.catalog__filter-sub-list');
filterSubLists.forEach(subList => {
  const listLenght = subList.childElementCount;
  if (listLenght > listMaxLenght) {
    for (let i = listLenght - 1; i >= listMaxLenght; --i) {
      subList.children[i].style.display = 'none';
    }
    // создаем кнопку
    const moreBtn = document.createElement('button');
    moreBtn.textContent = `ещё +${listLenght - listMaxLenght}`;
    moreBtn.classList.add('catalog__more-checkboxes-btn');
    const parent = subList.parentElement;
    parent.append(moreBtn);
    // показываем/скрываем чекбоксы при клике на кнопку
    moreBtn.addEventListener('click', () => {
      let displayStyleValue;
      let btnText;
      if (moreBtn.textContent === 'Свернуть') {
        displayStyleValue = 'none';
        btnText = `ещё +${listLenght - listMaxLenght}`;
      }
      else {
        displayStyleValue = 'block';
        btnText = 'Свернуть';
      }
      for (let i = listLenght - 1; i >= listMaxLenght; --i) {
        subList.children[i].style.display = displayStyleValue;
      }
      moreBtn.textContent = btnText;
    })
  }
})








