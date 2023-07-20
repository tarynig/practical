// get all elements
const fieldComp = document.querySelector('#field-comp');
const voxPackagesListing = document.querySelector('.vox-slider__wrap');
const voxSliderNoresults = document.querySelector('.vox-slider-noresults');

const voxPackageLoadSpinner = document.querySelector(
  '.vox-package-load__spinner'
);
const voxPackageLoadInfo = document.querySelector('.vox-package-load__info');
const voxPackageLoadShort = document.querySelector('.vox-package-load__short');
const voxPackageLoadLogo = document.querySelector('.vox-package-load__logo');
const voxPackageLoadCost = document.querySelector('.vox-package-load__cost');
const cardSpeed = document.querySelector('.card__speed');

let allCompanies = [];
let mainObj = {};

let buildCards = function () {
  for (let prop in mainObj) {
    const company = mainObj[prop][0].company;
    const cost = mainObj[prop][0].cost;
    const speed = mainObj[prop][0].speed;
    const popular = mainObj[prop][0].popular;
    const popularLabel = mainObj[prop][0].popular
      ? '<div class="card__popular">Popular</div>'
      : '';

    // add company to list if not already included
    if (!allCompanies.includes(company)) {
      allCompanies.push(company);
    }

    // build out cards
    const cardContent = `<div class="slide selected"
    data-company="${company}" data-cost="${cost}" data-speed="${speed}" data-popular="${popular}"><div class="card">
    <div class="card__cost">
    ${popularLabel}
    R${cost} pm</div>
    <div class="card__speed">
    <div class="card__speed--down">${speed}Mbps</div><div class="card__speed--up">${speed}Mbps</div>
    </div>
    <div class="card__logo"><object alt="${company} logo" type="image/svg+xml" data="assets/img/logos/${company}-large.svg" class="logo-${company}">
    </object></div>
    
    </div>
    </div>`;

    voxPackagesListing.innerHTML += cardContent;
  }
  // add active state to first card
  addActiveClass();
};

let buildCompanySelect = function () {
  for (let i = 0; i < allCompanies.length; i++) {
    // build out select options
    const option = document.createElement('option');
    option.value = allCompanies[i];
    option.text = allCompanies[i];
    fieldComp.add(option);
  }
};

fetch('./assets/data/packages.json')
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    mainObj = data;
    buildCards();
    buildCompanySelect();
  });

// Filter

let filterSelection = {
  provider: 'all',
  speedMin: '0',
  speedMax: '10000',
  costMin: '0',
  costMax: '10000',
  sort: 'all',
};

document.body.addEventListener('change', function (event) {
  if (event.target.classList.contains('filter-field')) {
    let thisFilter = event.target;
    let selectionId = thisFilter.id;
    let value = thisFilter.value;

    switch (selectionId) {
      case 'field-comp':
        filterSelection.provider = value;
        break;
      case 'field-speed':
        let speedMin = thisFilter.options[thisFilter.selectedIndex].dataset.min;
        let speedMax = thisFilter.options[thisFilter.selectedIndex].dataset.max;
        filterSelection.speedMin = speedMin;
        filterSelection.speedMax = speedMax;
        break;
      case 'field-price':
        let costMin = thisFilter.options[thisFilter.selectedIndex].dataset.min;
        let costMax = thisFilter.options[thisFilter.selectedIndex].dataset.max;
        filterSelection.costMin = costMin;
        filterSelection.costMax = costMax;
        break;
      case 'field-sort':
        let sortOn = thisFilter.checked == true ? true : 'all';
        filterSelection.sort = sortOn;
        break;
    }
    console.log('changed ' + thisFilter.value);

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

  let slideCount = document.querySelectorAll('.selected').length;
  if (233 * slideCount < voxSliderWrap.clientWidth) {
    next.classList.remove('active');
    prev.classList.remove('active');
  } else {
    next.classList.add('active');
    prev.classList.remove('active');
  }
});

let filterPackages = function (
  provider,
  speedMin,
  speedMax,
  costMin,
  costMax,
  cost,
  sort
) {
  // Get all slides
  let allSlides = document.querySelectorAll('.slide');

  // Filter slides
  allSlides.forEach(function (slide, i, arr) {
    let slideSpeed = Number(slide.dataset.speed); // Slide company
    let slideCost = Number(slide.dataset.cost); // Slide cost
    console.log(sort);
    if (
      slideSpeed < speedMax &&
      slideSpeed > speedMin &&
      slideCost < costMax &&
      slideCost > costMin &&
      [slide.dataset.company, 'all'].includes(provider) &&
      [slide.dataset.popular, 'all'].includes(String(sort))
    ) {
      slide.classList.add('selected');
      slide.classList.remove('deselected');
    } else {
      slide.classList.remove('selected');
      slide.classList.add('deselected');
    }
  });
  // Show no results message
  const noResultsMessage = 'nothing here';
  if (document.querySelector('.slide.selected')) {
    voxSliderNoresults.style.display = 'none';
  } else {
    voxSliderNoresults.style.display = 'block';
  }

  // Update counter
  let allActiveSlides = document.querySelectorAll('.slide.selected');

  document.querySelector(
    '.navigation-count'
  ).innerHTML = `${allActiveSlides.length} results`;
  console.log(`${allActiveSlides.length} results`);
};

// Select card

const hidePackageInfo = function () {
  [voxPackageLoadInfo, voxPackageLoadShort].forEach(
    item => (item.style.opacity = 0)
  );
  voxPackageLoadSpinner.style.display = 'block';
};

const showPackageInfo = function () {
  [voxPackageLoadInfo, voxPackageLoadShort].forEach(
    item => (item.style.opacity = 1)
  );
  voxPackageLoadSpinner.style.display = 'none';
};

let addActiveClass = function () {
  const slides = document.querySelectorAll('.slide');

  slides.forEach(function (item, i, arr) {
    // set initial active slide
    arr[0].classList.add('order');

    // Card clicks
    item.addEventListener('click', function () {
      slides.forEach(slide => slide.classList.remove('order'));
      let clickedSlide = this;

      // set active on slide click
      clickedSlide.classList.add('order');

      // Load new package info

      hidePackageInfo();

      const showNewPackageInfo = function () {
        showPackageInfo();
        let newCost = clickedSlide.dataset.cost;
        let newCompany = clickedSlide.dataset.company;
        let newSpeed = clickedSlide.dataset.speed;

        voxPackageLoadCost.innerHTML = `R${newCost}pm`;
        voxPackageLoadLogo.innerHTML = `<img alt="${newCompany} logo" src="assets/img/logos/${newCompany}-large.svg" />`;
        cardSpeed.innerHTML = `<div class="card__speed--down">${newSpeed}Mbps</div><div class="card__speed--up">${newSpeed}Mbps</div>`;
      };

      setTimeout(showNewPackageInfo, 500);
    });
  });
};
