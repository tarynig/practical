let modalWrap = document.querySelector('.vox-modal');
let modalLinks = document.querySelectorAll('.vox-modal-link');
let modalContent = document.querySelector('.vox-modal__content');
let modalContentClose = document.querySelector('.vox-modal__content__close');

let openContent = '';
// open related modal
modalLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    let theContent = document.querySelector(
      `.vox-modal__content--${this.dataset.content}`
    );

    modalWrap.classList.add('open');

    theContent.style.display = 'block';
    modalWrap.style.display = 'flex';

    openContent = theContent;
  });
});

let closeModalManually = function () {
  openContent.style.display = 'none';
  modalWrap.style.display = 'none';
};
let closeModal = function (event) {
  if (
    modalWrap.classList.contains('open') &&
    !event.target.classList.contains('vox-modal-link')
  ) {
    const withinBoundaries = event.composedPath().includes(modalContent);

    if (withinBoundaries) {
    } else {
      openContent.style.display = 'none';
      modalWrap.style.display = 'none';
    }
  }
};

document.addEventListener('click', closeModal);
modalContentClose.addEventListener('click', closeModalManually);
