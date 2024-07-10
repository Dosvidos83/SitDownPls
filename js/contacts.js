const windowWidth = document.documentElement.clientWidth;

const shopsList = [
  { name: 'Москва, SitDownPls на Солянке', address: 'м. Китай-город, ул. Солянка, д.24', coords: [55.750616, 37.641809] },
  { name: 'Москва, SitDownPls на Покровке', address: 'м. Курская, ул. Покровка, д.14', coords: [55.759086, 37.645106] },
]

ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.755216, 37.6434575],
    zoom: 14,
    controls: [],
  }, {
    geolocationControlFloat: 'right',
    zoomControlFloat: 'right',
    zoomControlSize: 'small',
  });

  // отключаем drag
  if (windowWidth <= 768) {
    myMap.behaviors.disable('drag');
    myMap.behaviors.disable('scrollZoom');
  }

  let zoomControlY;
  windowWidth >= 560 ? zoomControlY = '320px' : zoomControlY = '170px';
  myMap.controls.add('zoomControl', {
    size: 'small',
    float: 'none',
    position: {
      bottom: zoomControlY,
      right: '10px',
    }
  });

  myMap.controls.add('geolocationControl', {
    float: 'right',
    position: {
      top: '10px',
      right: '10px'
    }
  });

  // Создание геообъекта с типом точка (метка).
  shopsList.forEach(shop => {
    const myGeoObject = new ymaps.Placemark(shop.coords, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../images/elephant.svg',
      iconImageSize: [40, 40],
    });
    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myGeoObject);
  })

  //изменение центра карты при выборе магазина
  document.addEventListener('click', (e) => {
    if (e.target.closest('.contacts__search-result-item')) {
      const selectedItem = e.target.closest('.contacts__search-result-item');
      const address = selectedItem.querySelector('address').textContent;
      // находим выбранный магазин в массиве
      const selectedShop = shopsList.find(shop => shop.address === address);
      // изменяем координаты центра карты на координаты магазина и увеличиваем масштаб
      myMap.panTo(selectedShop.coords);
    };
  })
}

// Поиск магазина
const shopSearchContainer = document.querySelector('.contacts__container');
const filterInput = shopSearchContainer.querySelector('.contacts__search-input');

let filteredShops;
filterInput.addEventListener('input', (e) => {
  const shopSearchListWrapper = shopSearchContainer.querySelector('.contacts__search-result-list-wrapper');
  const inputValue = leftTrim(filterInput.value).toLowerCase();
  // перед добавлением списка удаляем предыдущий
  const prevResultList = shopSearchListWrapper.querySelector('.contacts__search-result-list');
  if (prevResultList) {
    prevResultList.remove();
  }
  //фильтруем ShopsList (только если в инпуте что то есть)
  if (inputValue) {
    filteredShops = shopsList.filter(shop => shop.name.toLowerCase().indexOf(inputValue) > -1
      || shop.address.toLowerCase().indexOf(inputValue) > -1);
    //если фильтрация дала результат создаем список
    if (filteredShops.length > 0) {
      const filterResultList = document.createElement('ul');
      filterResultList.classList.add('contacts__search-result-list');
      filteredShops.forEach(shop => {
        const resultItem = createSearchResultItem(shop.name, shop.address);
        filterResultList.append(resultItem);
      })
      shopSearchListWrapper.append(filterResultList);
    }
  }
});

function leftTrim(str) {
  if (str === null) return str;
  return str.replace(/^\s+/g, '');
}

function createSearchResultItem(name, addr) {
  const li = document.createElement('li');
  li.classList.add('contacts__search-result-item');
  li.setAttribute('tabindex', '0');
  triggerСlick(li);
  // передаем название магазина в инпут при клике на элемент списка отфильтрованных магазинов
  li.addEventListener('click', (e) => {
    const shopTitle = li.querySelector('.contacts__search-result-title').textContent;
    filterInput.value = shopTitle;
    e.target.closest('ul').remove();
  })

  const title = document.createElement('h2');
  title.classList.add('contacts__search-result-title');
  title.textContent = name;

  const address = document.createElement('address');
  address.classList.add('contacts__search-result-address');
  address.textContent = addr;

  li.append(title);
  li.append(address);

  return li;
}

// вызываем клик по элементу при нажатии на Enter или Space (когда он в фокусе)
function triggerСlick(element) {
  element.onfocus = () => {
    element.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        element.click();
      }
    })
  }

  return element;
}
