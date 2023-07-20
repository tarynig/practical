const imgs = document.querySelectorAll('[data-src]');
function preloadimgs(e) {
  let t = e.dataset.src;
  t && (e.src = t);
}
const imgValues = { threshold: 0, rootMargin: '0px 0px 100px 0px' },
  imgObserver = new IntersectionObserver((e, t) => {
    e.forEach(e => {
      e.isIntersecting && (preloadimgs(e.target), t.unobserve(e.target));
    });
  }, imgValues);
function getTimeRemaining(e) {
  let t = Date.parse(e) - Date.parse(new Date());
  return (
    !(t < 0) && {
      total: t,
      days: Math.floor(t / 864e5),
      hours: Math.floor((t / 36e5) % 24),
      minutes: Math.floor((t / 1e3 / 60) % 60),
      seconds: Math.floor((t / 1e3) % 60),
    }
  );
}
function initializeClock(e, t) {
  var a = document.getElementById(e),
    o = a.querySelector('.days'),
    l = a.querySelector('.hours'),
    s = a.querySelector('.minutes'),
    i = a.querySelector('.seconds');
  function n() {
    var e = getTimeRemaining(t);
    e
      ? ((o.innerHTML = e.days),
        (l.innerHTML = ('0' + e.hours).slice(-2)),
        (s.innerHTML = ('0' + e.minutes).slice(-2)),
        (i.innerHTML = ('0' + e.seconds).slice(-2)))
      : clearInterval(c);
  }
  n();
  var c = setInterval(n, 1e3);
}
imgs.forEach(e => {
  imgObserver.observe(e);
});
var deadline = new Date(),
  dayOfWeek = 5;
deadline.setDate(
  deadline.getDate() + ((dayOfWeek + 7 - deadline.getDay()) % 7)
),
  initializeClock('clockdiv', deadline);
const viewBox = document.querySelector('.vox-splash'),
  box = viewBox.getBoundingClientRect();
function isInViewport(e) {
  let t = e.getBoundingClientRect();
  return (
    t.top >= 0 &&
    t.left >= 0 &&
    t.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    t.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
const splash = document.querySelector('.vox-splash'),
  voxCelebrate = document.querySelectorAll('.vox-celebrate'),
  voxCelebrateMap = document.querySelectorAll('.vox-entry__map');
let hideSplash = function () {
  voxCelebrateMap.forEach(e => {
    e.innerHTML = '';
  });
};
document.addEventListener(
  'scroll',
  function () {
    isInViewport(splash)
      ? (console.log('here it is'),
        splash.classList.contains('inview') ||
          voxCelebrateMap.forEach(function (e, t, a) {
            (e.innerHTML =
              '<img src="assets/img/celebrate.svg" class="vox-celebrate" />'),
              setTimeout(hideSplash, 1200);
          }),
        splash.classList.add('inview'))
      : splash.classList.remove('inview');
  },
  { passive: !0 }
);
const fieldComp = document.querySelector('#field-comp'),
  voxPackagesListing = document.querySelector('.vox-slider__wrap'),
  voxSliderNoresults = document.querySelector('.vox-slider-noresults'),
  voxPackageLoadSpinner = document.querySelector('.vox-package-load__spinner'),
  voxPackageLoadInfo = document.querySelector('.vox-package-load__info'),
  voxPackageLoadShort = document.querySelector('.vox-package-load__short'),
  voxPackageLoadLogo = document.querySelector('.vox-package-load__logo'),
  voxPackageLoadCost = document.querySelector('.vox-package-load__cost'),
  cardSpeed = document.querySelector('.card__speed');
let allCompanies = [],
  mainObj = {},
  buildCards = function () {
    for (let e in mainObj) {
      let t = mainObj[e][0].company,
        a = mainObj[e][0].cost,
        o = mainObj[e][0].speed,
        l = mainObj[e][0].popular,
        s = mainObj[e][0].popular
          ? '<div class="card__popular">Popular</div>'
          : '';
      allCompanies.includes(t) || allCompanies.push(t);
      let i = `<div class="slide selected"
    data-company="${t}" data-cost="${a}" data-speed="${o}" data-popular="${l}"><div class="card">
    <div class="card__cost">
    ${s}
    R${a} pm</div>
    <div class="card__speed">
    <div class="card__speed--down">${o}Mbps</div><div class="card__speed--up">${o}Mbps</div>
    </div>
    <div class="card__logo"><object alt="${t} logo" type="image/svg+xml" data="assets/img/logos/${t}-large.svg" class="logo-${t}">
    </object></div>
    
    </div>
    </div>`;
      voxPackagesListing.innerHTML += i;
    }
    addActiveClass();
  },
  buildCompanySelect = function () {
    for (let e = 0; e < allCompanies.length; e++) {
      let t = document.createElement('option');
      (t.value = allCompanies[e]), (t.text = allCompanies[e]), fieldComp.add(t);
    }
  };
fetch('./assets/data/packages.json')
  .then(function (e) {
    return e.json();
  })
  .then(function (e) {
    (mainObj = e), buildCards(), buildCompanySelect();
  });
let filterSelection = {
  provider: 'all',
  speedMin: '0',
  speedMax: '10000',
  costMin: '0',
  costMax: '10000',
  sort: 'all',
};
document.body.addEventListener('change', function (e) {
  if (e.target.classList.contains('filter-field')) {
    let t = e.target,
      a = t.id,
      o = t.value;
    switch (a) {
      case 'field-comp':
        filterSelection.provider = o;
        break;
      case 'field-speed':
        let l = t.options[t.selectedIndex].dataset.min,
          s = t.options[t.selectedIndex].dataset.max;
        (filterSelection.speedMin = l), (filterSelection.speedMax = s);
        break;
      case 'field-price':
        let i = t.options[t.selectedIndex].dataset.min,
          n = t.options[t.selectedIndex].dataset.max;
        (filterSelection.costMin = i), (filterSelection.costMax = n);
        break;
      case 'field-sort':
        let c = !0 == t.checked || 'all';
        filterSelection.sort = c;
    }
    console.log('changed ' + t.value),
      filterPackages(
        filterSelection.provider,
        Number(filterSelection.speedMin),
        Number(filterSelection.speedMax),
        Number(filterSelection.costMin),
        Number(filterSelection.costMax),
        filterSelection.cost,
        filterSelection.sort
      );
  }
  233 * document.querySelectorAll('.selected').length <
  voxSliderWrap.clientWidth
    ? (next.classList.remove('active'), prev.classList.remove('active'))
    : (next.classList.add('active'), prev.classList.remove('active'));
});
let filterPackages = function (e, t, a, o, l, s, i) {
  document.querySelectorAll('.slide').forEach(function (s, n, c) {
    let r = Number(s.dataset.speed),
      d = Number(s.dataset.cost);
    console.log(i),
      r < a &&
      r > t &&
      d < l &&
      d > o &&
      [s.dataset.company, 'all'].includes(e) &&
      [s.dataset.popular, 'all'].includes(String(i))
        ? (s.classList.add('selected'), s.classList.remove('deselected'))
        : (s.classList.remove('selected'), s.classList.add('deselected'));
  }),
    document.querySelector('.slide.selected')
      ? (voxSliderNoresults.style.display = 'none')
      : (voxSliderNoresults.style.display = 'block');
  let n = document.querySelectorAll('.slide.selected');
  (document.querySelector(
    '.navigation-count'
  ).innerHTML = `${n.length} results`),
    console.log(`${n.length} results`);
};
const hidePackageInfo = function () {
    [voxPackageLoadInfo, voxPackageLoadShort].forEach(
      e => (e.style.opacity = 0)
    ),
      (voxPackageLoadSpinner.style.display = 'block');
  },
  showPackageInfo = function () {
    [voxPackageLoadInfo, voxPackageLoadShort].forEach(
      e => (e.style.opacity = 1)
    ),
      (voxPackageLoadSpinner.style.display = 'none');
  };
let addActiveClass = function () {
  let e = document.querySelectorAll('.slide');
  e.forEach(function (t, a, o) {
    o[0].classList.add('order'),
      t.addEventListener('click', function () {
        e.forEach(e => e.classList.remove('order'));
        let t = this;
        t.classList.add('order'), hidePackageInfo();
        let a = function () {
          showPackageInfo();
          let e = t.dataset.cost,
            a = t.dataset.company,
            o = t.dataset.speed;
          (voxPackageLoadCost.innerHTML = `R${e}pm`),
            (voxPackageLoadLogo.innerHTML = `<img alt="${a} logo" src="assets/img/logos/${a}-large.svg" />`),
            (cardSpeed.innerHTML = `<div class="card__speed--down">${o}Mbps</div><div class="card__speed--up">${o}Mbps</div>`);
        };
        setTimeout(a, 500);
      });
  });
};
const voxSlider = document.querySelector('.vox-slider'),
  voxSliderWrap = document.querySelector('.vox-slider__wrap'),
  next = document.querySelector('.vox-slider__navigation .next'),
  prev = document.querySelector('.vox-slider__navigation .prev'),
  nav = document.querySelectorAll('.nav');
let distanceMoved = Number(0),
  prevCount = 0,
  nextCount = 1;
nav.forEach(e => {
  e.addEventListener('click', function (e) {
    let t = document.querySelectorAll('.selected').length,
      a = e.target;
    distanceMoved >= 0 && prev.classList.remove('active'),
      a.classList.contains('next') &&
      distanceMoved <= 0 &&
      next.classList.contains('active')
        ? ((distanceMoved -= 233),
          (nextCount += 1),
          prev.classList.add('active'),
          this.classList.add('active'),
          nextCount == t &&
            ((distanceMoved = 0),
            (nextCount = 1),
            prev.classList.remove('active')))
        : a.classList.contains('prev') &&
          prev.classList.contains('active') &&
          distanceMoved <= -233 &&
          ((distanceMoved += 233),
          (prevCount += 1) == t &&
            ((distanceMoved = 0),
            (nextCount = 1),
            prev.classList.remove('active'))),
      (voxSliderWrap.style.marginLeft = distanceMoved + 'px');
  });
});
let modalWrap = document.querySelector('.vox-modal'),
  modalLinks = document.querySelectorAll('.vox-modal-link'),
  modalContent = document.querySelector('.vox-modal__content'),
  modalContentClose = document.querySelector('.vox-modal__content__close'),
  openContent = '';
modalLinks.forEach(function (e) {
  e.addEventListener('click', function (e) {
    e.preventDefault();
    let t = document.querySelector(
      `.vox-modal__content--${this.dataset.content}`
    );
    modalWrap.classList.add('open'),
      (t.style.display = 'block'),
      (modalWrap.style.display = 'flex'),
      (openContent = t);
  });
});
let closeModalManually = function () {
    (openContent.style.display = 'none'), (modalWrap.style.display = 'none');
  },
  closeModal = function (e) {
    if (
      modalWrap.classList.contains('open') &&
      !e.target.classList.contains('vox-modal-link')
    ) {
      let t = e.composedPath().includes(modalContent);
      t ||
        ((openContent.style.display = 'none'),
        (modalWrap.style.display = 'none'));
    }
  };
document.addEventListener('click', closeModal),
  modalContentClose.addEventListener('click', closeModalManually);
