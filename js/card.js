const similarSwiper = new Swiper('.similar__swiper', {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 32,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.similar__swiper-btn-next',
    prevEl: '.similar__swiper-btn-prev',
  },

  breakpoints: {
    250: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
    },
    625: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1360: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    }
  }
})

const swiper = new Swiper('.description__swiper-1', {
  spaceBetween: 38,
  slidesPerView: 4,
  initialSlide: 1,
  freeMode: true,
  resizeObserver: true,
  breakpoints: {

    200: {
      slidesPerView: 2.38,
      direction: 'horizontal',
    },

    470: {
      spaceBetween: 25,
      direction: 'horizontal',
    },

    561: {
      direction: 'vertical',
    },

    971: {
      slidesPerView: 4,
      spaceBetween: 38,
      direction: 'horizontal',
    }
  }
});

const swiper2 = new Swiper('.description__swiper-2', {
  spaceBetween: 32,
  thumbs: {
    swiper: swiper,
  },
});

// слайдер в модальном окне при клике на изображение в swiper-2
const slider = document.querySelector('.description__swiper-2');
const slides = slider.querySelectorAll('.swiper-slide');

const modalWrapper = document.querySelector('.modal');
slides.forEach(slide => {
  slide.addEventListener('click', () => {
    const modalSwiper = document.querySelector('.description__modal-slider-wrapper');
    // покаываем модальное окно
    modalSwiper.style.display = 'flex';
    modalSwiper.classList.add('show');
    // инициализируем слайдер в модальном окне
    const swiper = new Swiper('.description__swiper-3', {
      spaceBetween: 38,
      slidesPerView: 4,
      initialSlide: 1,
      freeMode: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.description__swiper-btn-next',
        prevEl: '.description__swiper-btn-prev',
      },
      breakpoints: {

        200: {
          slidesPerView: 1,
        },

        560: {
          slidesPerView: 2,
        },

        960: {
          slidesPerView: 3,
        },

        1350: {
          slidesPerView: 4,
        }
      }
    });

    const swiper2 = new Swiper('.description__swiper-4', {
      spaceBetween: 32,
      thumbs: {
        swiper: swiper,
      },
    });

    modalWrapper.style.display = 'flex';
    setTimeout(() => {
      modalWrapper.classList.add('show');
      document.body.style.overflowY = 'hidden';
    }, 50);
  });
});

// input mask
const buyFormPhoneInput = document.querySelector('.phone-input');
const inputMask = new Inputmask('+7(999) 999-99-99');
inputMask.mask(buyFormPhoneInput);

// валидация формы "Купить в один клик"
const buyForm = document.querySelector('.buy-on-click__form');
const validation = new JustValidate(
  buyForm,
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

  .addField('.phone-input', [
    {
      rule: 'required',
      errorMessage: 'Обязательно для заполнения',
    },

    {
      rule: 'function',
      errorMessage: 'Недопустимый формат',
      validator: () => {
        const phone = buyFormPhoneInput.inputmask.unmaskedvalue();
        return phone.length === 10;
      }
    },
  ])

  .addField('.buy-on-click__checkbox', [
    {
      rule: 'required',
      errorMessage: ' ',
    },
  ])

  .onSuccess((ev) => {
    ev.preventDefault();
    buyForm.reset();
    // после валидации закрываем форму "Купить в один клик"
    const modal = document.querySelector('.modal');
    const buyOnClicForm = modal.querySelector('.buy-on-click__modal-window');
    buyOnClicForm.classList.remove('show');
    validation.refresh();
    setTimeout(() => {
      buyOnClicForm.style.display = 'none';
    }, 150);
    // и открываем модальное окно "мы вам перезвоним"
    const callBackModal = modal.querySelector('.call-back__modal-window');
    setTimeout(() => {
      callBackModal.style.display = 'flex';
      setTimeout(() => {
        callBackModal.classList.add('show');
      }, 150);
    }, 150);
  })

// открытие модального окна с формой
const buyOnClickBtn = document.querySelector('.description__by-on-click-btn');
buyOnClickBtn.addEventListener('click', () => {
  const modal = document.querySelector('.modal');
  const buyOnClicForm = modal.querySelector('.buy-on-click__modal-window');
  buyOnClicForm.style.display = 'flex';
  buyOnClicForm.classList.add('show');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
    document.body.style.overflowY = 'hidden';
  }, 150);
})
