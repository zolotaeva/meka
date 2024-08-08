window.addEventListener('load', function () {
  const preloader = document.querySelector('.preload-wrapper');
  preloader.style.display = 'none';
});
//Swiper start

const promoSwiper = new Swiper(".promo__slider", {
	pagination: {
		el: ".promo__slider .swiper-pagination",
		type: 'custom',
		renderCustom: function (swiper, current, total) {
			return `
			<span class="current"> 0${current}</span>
			<span class="total">0${total}
			`; 
	}
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

const projectsSwiper = new Swiper(".projects__slider", {
	slidesPerView: 2.5,
	spaceBetween: 40,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1.24,
			spaceBetween: 25,
		},
		575: {
			slidesPerView: 1.5,
		},
		767: {
			slidesPerView: 2.5,
		},
					
	},
});

const blogSwiper = new Swiper(".blog__slider", {
	slidesPerView: 4,
	spaceBetween: 40,
	navigation: {
		nextEl: ".blog__next",
		prevEl: ".blog__prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1.25,
			spaceBetween: 20,
		},
		575: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		992: {
			slidesPerView: 4,
		},
					
	},
});

const historySwiper = document.querySelectorAll('.history__slider');

historySwiper.forEach(item => {
	const historySwiperItem = new Swiper(item, {
		slidesPerView: 1.3,
		spaceBetween: 40,
		grabCursor: true,
		scrollbar: {
			el: '.history__scrollbar',
			draggable: true,
			//dragSize: dragSize
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			575: {
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 1.2,
			},
			1440: {
				slidesPerView: 1.3,
			},
						
		},
	});
});

const objectsSwiper = document.querySelectorAll('.objects__slider');
objectsSwiper.forEach(item => {
	const parent = item.closest('.objects__item');
	const objectSwiper = new Swiper(item, {
		slidesPerView: 1,
		grabCursor: true,
		pagination: {
			el: item.querySelector('.objects__pagination'),
			type: 'bullets',
		},
		navigation: {
			nextEl: parent.querySelector('.objects__nav-next'),
			prevEl: parent.querySelector('.objects__nav-prev'),
		},
	});
});

const topSwiper = new Swiper(".top__slider", {
	slidesPerView: 1,
	speed: 600,
	navigation: {
		nextEl: ".top__nav-next",
		prevEl: ".top__nav-prev",
	}
	
});


const productSliderThumbs = new Swiper('.thumbs-slider', {
	spaceBetween: 20,
	freeMode: true,
	slidesPerView: 3,
	watchSlidesProgress: true,
	navigation: {
		nextEl: '.thumbs__slide-next',
		prevEl: '.thumbs__slide-prev',
	},
});

const productSliderTop = new Swiper('.main-slider', {
	slidesPerView: 1,
	spaceBetween: 50,
	//effect: 'fade',
	//fadeEffect: {
	//	crossFade: true
	//},
	loop: false,
	navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
	},
	thumbs: {
			swiper: productSliderThumbs,
	}
});

const teamSwiper = new Swiper(".team__slider", {
	slidesPerView: 4,
	loop: true,
	spaceBetween: 40,
	navigation: {
		nextEl: ".team__next",
		prevEl: ".team__prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1.3,
			spaceBetween: 20,
		},
		575: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		992: {
			slidesPerView: 4,
		},
					
	},
});

//Swiper end

const footer = document.querySelector('.footer'),
 copy = document.querySelector('.footer__copyright'),
 headerSearch = document.querySelector('.header__search'),
 headerMenu = document.querySelector('#header_menu'),
 menuBurger = document.querySelector('.js-toggle-menu'),
 policy = document.querySelector('.policy'),
 footerDownload =  document.querySelector('.footer__links'),
	tabLinksHistory = document.querySelectorAll('.history__nav-link'),
	tabContetnHistory = document.querySelectorAll('.history__content-item'),
	btnTop = document.querySelector('.js-top');



// выравнивание в верстке пагинации - слайдер на главной
if (document.querySelector('.promo')) {
	setPaginationPositionPromoSlide();
	window.addEventListener("resize", setPaginationPositionPromoSlide);
}

// изменение положения блоков для мобильной верстки
if (document.documentElement.clientWidth < 1200) {
	footer.querySelector('.container').append(copy);

}

if (document.documentElement.clientWidth < 992) {
	headerMenu.prepend(headerSearch);
}

if (document.documentElement.clientWidth < 992) {
	footerDownload.before(policy);
	if (document.querySelector('.aside__box')) {
		document.querySelector('.page__title').after(document.querySelector('.aside__box'));
	}
	
}

// табы в Истории компании
tabLinksHistory.forEach(link => {
	link.addEventListener('click', function(event) {
		switchTab(event, tabLinksHistory, tabContetnHistory);
	});
});

// табы в карточке товара
const tabLinksProduct = document.querySelectorAll('.product-tabs__link');
const tabContetnProduct = document.querySelectorAll('.product-tabs__item');

tabLinksProduct.forEach(link => {
	link.addEventListener('click', function(event) {
		switchTab(event, tabLinksProduct, tabContetnProduct);
	});
});



// прокрутка страницы вверх
window.addEventListener('scroll', scrollTop);
btnTop.addEventListener('click', function () {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});


if (document.querySelector('.aside__box')) {
	// Инициализируем прокрутку по ссылкам из Содержания
	initializeScrollLinks();
}


toggleMenuMobil();
if (document.getElementById('tabs-container')) {
	scrollTabsNav();
}

if (document.querySelector('.filter')) {
	filterToggle();
}

if(document.querySelector('.products') || document.querySelector('.product-card')) {
	actionToggleActive();
}

if (document.documentElement.clientWidth < 768 && document.querySelector('.catalog__filter')) {
	const filterTitle = document.querySelector('.filter__title');
	const filterWrap = document.querySelector('.catalog__filter');

	filterTitle.addEventListener('click', () => {
		if (filterWrap.classList.contains('active')) {
			filterWrap.classList.remove('active');
		} else {
			filterWrap.classList.add('active');
		}
	})
}
if (document.documentElement.clientWidth < 768 && document.querySelector('.product-card__info')) {
	document.querySelector('.product-card__top').prepend(document.querySelector('.product-card__info .page__title'));
}

if (document.documentElement.clientWidth < 768) {
	document.querySelectorAll('.header__nav-item.nav-item.parent > .nav-link').forEach(link => {
		link.addEventListener('touchstart', (e) => {
			e.preventDefault();
			if(link.classList.contains('active')){
				link.classList.remove('active');
			}else {
				link.classList.add('active');
			}
			
		})
	})
}

// functions

// выравнивание в верстке пагинации - слайдер на главной
function setPaginationPositionPromoSlide() {
	const promo = document.querySelector('.promo'),
		promoImageCoords = promo.querySelector('.promo__img').getBoundingClientRect(),
		promoPagination = promo.querySelector('.swiper-pagination'),
		promoNav = promo.querySelector('.promo__slider-nav');
		if (document.documentElement.clientWidth > 767) {
			promoPagination.style.left = promoImageCoords.left + 40 + "px";
			promoNav.style.left = promoImageCoords.left + promoImageCoords.width - 158 + "px";
		}
}

// мобильное меню
function toggleMenuMobil() {
	menuBurger.addEventListener('click', (e) => {
		if (headerMenu.classList.contains('open')) {
			headerMenu.classList.remove('open');
			menuBurger.classList.remove('close');
			document.body.classList.remove('overlay');
		} else {
			headerMenu.classList.add('open');
			menuBurger.classList.add('close');
			document.body.classList.add('overlay');
		}
	});
}




// табы История компании
function switchTab(event, links, content) {
	event.preventDefault();

	links.forEach(link => link.classList.remove('active'));
	content.forEach(content => content.classList.remove('active'));

	const targetId = event.target.getAttribute('href').substring(1);
	event.target.classList.add('active');
	document.getElementById(targetId).classList.add('active');
}

// прокрутка навигации табов в Истории компании
function scrollTabsNav() {
	const tabsContainer = document.getElementById('tabs-container');
	const navPrev = document.getElementById('nav-prev');
	const navNext = document.getElementById('nav-next');
	const scrollAmount = 90; 

	navPrev.addEventListener('click', function(event) {
			event.preventDefault();
			tabsContainer.scrollLeft -= scrollAmount;
	});

	navNext.addEventListener('click', function(event) {
			event.preventDefault();
			tabsContainer.scrollLeft += scrollAmount;
	});
}

//кнопка прокрутки страницы наверх
function scrollTop() {
	const footerRect = footer.getBoundingClientRect();
	const btnTopRect = btnTop.getBoundingClientRect();

	if (window.scrollY > 300) {
		btnTop.style.display = 'block';
	} else {
			btnTop.style.display = 'none';
	}
	// не позволяем опусткаться кнопке ниже футера
	if (footerRect.top < window.innerHeight) {
		btnTop.style.bottom = `${window.innerHeight - footerRect.top + 20}px`;
		// 20px – это отступ от футера
	} else {
			btnTop.style.bottom = '80px';
	}
	
}

// якорение по содержанию новости
function initializeScrollLinks() {
	// Создаем объект для хранения соответствия между ссылками и заголовками
	const linkToHeadingMap = new Map();

	// Находим все ссылки в боковом меню
	const asideBlogLinks = document.querySelectorAll('.aside__list a');
	// Находим все заголовки h2 и h3 в статье
	const allHeadings = document.querySelectorAll('.news-detail__content h2, .news-detail__content h3');

	// Заполняем карту соответствия
	asideBlogLinks.forEach(link => {
			const titleType = link.dataset.title;
			const headingIndex = Array.from(allHeadings).findIndex(heading => heading.tagName.toLowerCase() === titleType);
			if (headingIndex !== -1) {
					linkToHeadingMap.set(link, allHeadings[headingIndex]);
			}
	});

	// Добавляем обработчики кликов на ссылки
	asideBlogLinks.forEach(link => {
			link.addEventListener('click', (e) => {
					e.preventDefault();
					const targetHeading = linkToHeadingMap.get(link);
					if (targetHeading) {
							targetHeading.scrollIntoView({ behavior: 'smooth' });
					}
			});
	});
}


function filterToggle () {
	const filterItems = document.querySelectorAll('.filter-item__top');
	
		filterItems.forEach(item => {
			item.addEventListener('click', () => {
				if (item.classList.contains('filter-item__active')) {
					item.classList.remove('filter-item__active');
				} else {
					item.classList.add('filter-item__active');
				}
			})
		})
}

function actionToggleActive() {
	const productCompare = document.querySelectorAll('.js-compare'),
		productFavorite = document.querySelectorAll('.js-favorite');
	
	productCompare.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			let text = item.textContent;
			if (item.classList.contains('in-compare')) {
				item.classList.remove('in-compare');
				if (text != '') {
					item.textContent = 'Сравнить';
				}
			} else {
				item.classList.add('in-compare');
				if (text != '') {
					item.textContent = 'В сравнении';
				}
			}
		})
	})

	productFavorite.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			let text = item.textContent;
			if (item.classList.contains('in-favorite')) {
				item.classList.remove('in-favorite');
				if (text != '') {
					item.textContent = 'В избранное';
				}
			} else {
				item.classList.add('in-favorite');
				if (text != '') {
					item.textContent = 'В избранном';
				}
			}
		})
	})
}


//const projectsFirstColCoords = document.querySelector('.projects__col').getBoundingClientRect(),
//	projectsSlider = document.querySelector('.projects__slider'),
//	projectsFirstCol = document.querySelector('.projects__col');

//projectsSlider.style.marginLeft = projectsFirstColCoords.left + projectsFirstColCoords.width + 40 + "px";

//projectsSlider.style.width = `calc(100vw - (${projectsFirstColCoords.left} + ${projectsFirstColCoords.width} + 40px`;