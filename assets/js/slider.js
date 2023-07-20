const voxSlider = document.querySelector('.vox-slider');
const voxSliderWrap = document.querySelector('.vox-slider__wrap');
const next = document.querySelector('.vox-slider__navigation .next');
const prev = document.querySelector('.vox-slider__navigation .prev');
const nav = document.querySelectorAll('.nav');

let distanceMoved = Number(0);
let prevCount = 0;
let nextCount = 1;

nav.forEach(slide => {
  slide.addEventListener('click', function (event) {
    let slideCount = document.querySelectorAll('.selected').length;
    let clickedNav = event.target;

    if (distanceMoved >= 0) prev.classList.remove('active');
    if (
      clickedNav.classList.contains('next') &&
      distanceMoved <= 0 &&
      next.classList.contains('active')
    ) {
      distanceMoved -= 233;
      nextCount += 1;
      prev.classList.add('active');
      this.classList.add('active');
      if (nextCount == slideCount) {
        distanceMoved = 0;
        nextCount = 1;
        prev.classList.remove('active');
      }
    } else if (
      clickedNav.classList.contains('prev') &&
      prev.classList.contains('active') &&
      distanceMoved <= -233
    ) {
      distanceMoved += 233;
      prevCount += 1;
      if (prevCount == slideCount) {
        distanceMoved = 0;
        nextCount = 1;
        prev.classList.remove('active');
      }
    }

    voxSliderWrap.style.marginLeft = distanceMoved + 'px';
  });
});
