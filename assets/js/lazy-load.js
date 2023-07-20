const imgs = document.querySelectorAll('[data-src]');

function preloadimgs(img) {
  const src = img.dataset.src;
  if (!src) return;
  img.src = src;
}

const imgValues = {
  threshold: 0,
  rootMargin: '0px 0px 100px 0px',
};

const imgObserver = new IntersectionObserver((items, imgObserver) => {
  items.forEach(item => {
    if (!item.isIntersecting) {
      return;
    } else {
      preloadimgs(item.target);
      imgObserver.unobserve(item.target);
    }
  });
}, imgValues);

imgs.forEach(img => {
  imgObserver.observe(img);
});
