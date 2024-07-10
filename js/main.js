
if (document.querySelector('.feedback__form')) {
  const feedbackForm = document.querySelector('.feedback__form');
  feedbackForm.querySelector('input[type="tel"]');
  const phoneInput = feedbackForm.querySelector('input[type="tel"]');

  // input mask
  const buyFormPhoneInput = document.querySelector('.phone-input');
  const inputMask = new Inputmask('+7(999) 999-99-99');
  inputMask.mask(phoneInput);

  // валидация
  const validation = new JustValidate(
    feedbackForm,
    {
      focusInvalidField: false,
    }, []);

  validation
    .addField('.name-input', [

      {
        rule: 'required',
        errorMessage: 'Обязательно для заполнения',
      },

      {
        rule: 'function',
        errorMessage: 'Недопустимый формат',
        validator: () => {
          const input = document.querySelector('.name-input');
          const result = !/[^А-яёЁ\s-]/.test(input.value);
          return result;
        }
      },
    ])

    .addField('.email-input', [
      {
        rule: 'required',
        errorMessage: 'Обязательно для заполнения',
      },

      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      },

      {
        rule: 'function',
        errorMessage: 'Недопустимый формат',
        validator: () => {
          const input = document.querySelector('.email-input');
          const result = !/[А-яёЁ\s-]/.test(input.value);
          return result;
        }
      },
    ])

    .addField('.phone-input', [
      {
        rule: 'required',
        errorMessage: 'Обязательно для заполнения',
      },

      {
        rule: 'function',
        errorMessage: 'Недопустимый формат',
        validator: () => {
          const phone = phoneInput.inputmask.unmaskedvalue();
          return phone.length === 10;
        }
      },
    ])

    .addField('.feedback__checkbox', [
      {
        rule: 'required',
        errorMessage: ' ',
      },
    ])

    .onSuccess((ev) => {
      ev.preventDefault();
      feedbackForm.reset();
      const modal = document.querySelector('.modal');
      const modalWindow = modal.querySelector('.call-back__modal-window');
      // открываем модальное окно "мы вам перезвоним"
      modalWindow.style.display = 'flex';
      modalWindow.classList.add('show');
      modal.style.display = 'flex';
      document.body.style.overflowY = 'hidden';
      setTimeout(() => {
        modal.classList.add('show');
        validation.refresh();
      }, 150);
    })
}

// слайдер hero
const heroSwiper = new Swiper('.hero__swiper', {
  loop: true,
  autoplay: {
    delay: 4000,
  },
  allowTouchMove: false,
  effect: "fade",
  speed: 1100,
  pagination: {
    el: '.hero__swiper-pagination',
    type: 'bullets',
  },
})

// слайдер offer
// при ширине окна > 1024 делаем центральный слайд с адаптивной шириной через класс 'adaptive-width'
// (если ширину делать адаптивной на всех разрешениях, то слайдер ломается и breakpoints не работают)
const offerSlider = document.querySelector('.offer__list');
const windowWidth = document.documentElement.clientWidth;
if (windowWidth > 1024) {
  offerSlider.classList.add('adaptive-width');
}

const offerSwiper = new Swiper('.offer__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 32,
  navigation: {
    nextEl: '.offer__swiper-btn-next',
    prevEl: '.offer__swiper-btn-prev',
  },

  breakpoints: {
    250: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    625: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    }
  }
})

// слайдер useful
const usefulSwiper = new Swiper('.useful__swiper', {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 32,
  navigation: {
    nextEl: '.useful__swiper-btn-next',
    prevEl: '.useful__swiper-btn-prev',
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    560: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    800: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },

    1500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  }
})

// булиты с прогрессбаром в hero
const bulletsContainer = document.querySelector('.hero__swiper-pagination');
const bullets = bulletsContainer.querySelectorAll('span');
bullets.forEach(bullet => {
  const progressBullet = createSvg();
  bullet.append(progressBullet);
});

function createSvg() {
  const xmlns = "http://www.w3.org/2000/svg";
  const boxWidth = 24;
  const boxHeight = 24;
  const svg = document.createElementNS(xmlns, "svg");
  svg.classList.add('progress-ring');
  svg.setAttributeNS(null, 'viewBox', "0 0 " + boxWidth + " " + boxHeight);
  svg.setAttributeNS(null, 'width', boxWidth);
  svg.setAttributeNS(null, 'height', boxHeight);
  svg.setAttributeNS(null, 'fill', 'none');

  const circleOrange = document.createElementNS(xmlns, "circle");
  circleOrange.classList.add('circle-orange');
  circleOrange.setAttribute('cx', 12);
  circleOrange.setAttribute('cy', 12);
  circleOrange.setAttribute('r', 10);
  circleOrange.setAttribute('stroke', '#FF862F');
  circleOrange.setAttribute('stroke-width', '3');
  circleOrange.style.transformOrigin = 'center';
  circleOrange.style.transform = 'rotate(90deg) scaleX(-1)';

  const circleWhite = document.createElementNS(xmlns, "circle");
  circleWhite.classList.add('circle-white');
  circleWhite.setAttribute('cx', 12);
  circleWhite.setAttribute('cy', 12);
  circleWhite.setAttribute('r', 10);
  circleWhite.setAttribute('stroke', '#FFF');
  circleWhite.setAttribute('stroke-width', '2');

  svg.appendChild(circleWhite);
  svg.appendChild(circleOrange);

  return svg;
}

// добавление карточек rating
const moreBtn = document.querySelector('.rating__more-btn');
const ratingList = document.querySelector('.rating__list');

// задаем количество (для каждого разрешения свое) сразу показанных карточек
let immediatelyShownCount;
windowWidth >= 1350 ? immediatelyShownCount = 8 : immediatelyShownCount = 6;
// остальные карточки скрываем
for (let i = 0; i < ratingList.childElementCount; ++i) {
  if (i >= immediatelyShownCount) {
    ratingList.children[i].style.display = 'none';
    ratingList.children[i].style.opacity = '0';
    ratingList.children[i].style.transform = 'translateY(40px) scaleX(.8)';
  }
}

moreBtn.addEventListener('click', () => {
  // задаем количество (для каждого разрешения свое) добавляемых при клике на кнопку карточек
  let cardsToAddCount;
  const windowWidth = document.documentElement.clientWidth;
  windowWidth >= 1350 || windowWidth <= 1021 ? cardsToAddCount = 4 : cardsToAddCount = 3;
  //
  const listItems = ratingList.querySelectorAll('.rating__item');
  let delay = 100;
  listItems.forEach(item => {
    if (window.getComputedStyle(item).display !== 'none') {
      return;
    }
    item.style.display = 'list-item';
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0) scaleX(1)';
    }, delay);
    delay += 100;
  });

  // убираем кнопку добавления карточек
  moreBtn.style.display = 'none';
});
