function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  if (t < 0) {
    return false;
  }
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  function updateClock() {
    var t = getTimeRemaining(endtime);
    if (t) {
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    } else {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
var deadline = new Date(); //today
var dayOfWeek = 5; //friday
deadline.setDate(
  deadline.getDate() + ((dayOfWeek + 7 - deadline.getDay()) % 7)
);
initializeClock('clockdiv', deadline);

// const element = document.querySelector(".vox-splash");
// element.scrollIntoView();

const viewBox = document.querySelector('.vox-splash');
const box = viewBox.getBoundingClientRect();
//
function isInViewport(splash) {
  const box = splash.getBoundingClientRect();
  return (
    box.top >= 0 &&
    box.left >= 0 &&
    box.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    box.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const splash = document.querySelector('.vox-splash');
const voxCelebrate = document.querySelectorAll('.vox-celebrate');
const voxCelebrateMap = document.querySelectorAll('.vox-entry__map');
let hideSplash = function () {
  voxCelebrateMap.forEach(item => {
    item.innerHTML = ``;
  });
};

document.addEventListener(
  'scroll',
  function () {
    if (isInViewport(splash)) {
      console.log('here it is');

      if (!splash.classList.contains('inview')) {
        voxCelebrateMap.forEach(function (e, k, p) {
          e.innerHTML = `<img src="assets/img/celebrate.svg" class="vox-celebrate" />`;
          setTimeout(hideSplash, 1200);
        });
      }
      splash.classList.add('inview');
    } else {
      splash.classList.remove('inview');
    }
  },
  {
    passive: true,
  }
);
