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

//Swiper end

const footer = document.querySelector('.footer');
const copy = document.querySelector('.footer__copyright');
const headerSearch = document.querySelector('.header__search');
const headerMenu = document.querySelector('#header_menu');
const menuBurger = document.querySelector('.js-toggle-menu');
const policy = document.querySelector('.policy');
const footerDownload =  document.querySelector('.footer__links');
const tabLinks = document.querySelectorAll('.history__nav-link');

const btnTop = document.querySelector('.js-top');



// выравнивание в верстке пагинации - слайдер на главной
if (document.querySelector('.promo')) {
	setPaginationPositionPromoSlide();
	window.addEventListener("resize", setPaginationPositionPromoSlide);
}

// изменение положения блоков для мобильной верстки
if (document.documentElement.clientWidth < 1200) {
	footer.querySelector('.container').append(copy);
	headerMenu.prepend(headerSearch);
}

if (document.documentElement.clientWidth < 992) {
	footerDownload.before(policy);
}

// табы в Истории компании
tabLinks.forEach(link => {
	link.addEventListener('click', switchTab);
});

// прокрутка страницы вверх
window.addEventListener('scroll', scrollTop);
btnTop.addEventListener('click', function () {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});



toggleMenuMobil();
scrollTabsNav();

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
		} else {
			headerMenu.classList.add('open');
			menuBurger.classList.add('close');
		}
	});
}

// табы История компании
function switchTab(event) {
	event.preventDefault();

	tabLinks.forEach(link => link.classList.remove('active'));
	document.querySelectorAll('.history__content-item').forEach(content => content.classList.remove('active'));

	const targetId = this.getAttribute('href').substring(1);
	this.classList.add('active');
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








//const projectsFirstColCoords = document.querySelector('.projects__col').getBoundingClientRect(),
//	projectsSlider = document.querySelector('.projects__slider'),
//	projectsFirstCol = document.querySelector('.projects__col');

//projectsSlider.style.marginLeft = projectsFirstColCoords.left + projectsFirstColCoords.width + 40 + "px";

//projectsSlider.style.width = `calc(100vw - (${projectsFirstColCoords.left} + ${projectsFirstColCoords.width} + 40px`;