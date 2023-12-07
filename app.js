const modalElements = document.querySelectorAll('.dialog');
const openButtons = document.querySelectorAll('.open-button');
const closeBtns = document.querySelectorAll('.close-btn');

const onAnimationEnd = (modalElement) => {
	document.body.classList.remove('scroll-lock');

	modalElement.classList.remove('hide');
	modalElement.close();

	modalElement.removeEventListener('animationend', onAnimationEnd);
};

const handleModalShow = (modalElement) => {
	modalElement.showModal();

	document.body.classList.add('scroll-lock');
};

const handleModalClose = (modalElement) => {
	modalElement.classList.add('hide');

	modalElement.addEventListener('animationend', () => {
        onAnimationEnd(modalElement);
    });
};

const handleModalClick = ({ currentTarget, target }) => {
	const isClickedOnBackdrop = target === currentTarget;

	if (isClickedOnBackdrop) {
		currentTarget.close();
	}
};

modalElements.forEach((modal) => {
	modal.addEventListener('click', handleModalClick);
});

openButtons.forEach((button) => {
	const modalId = button.getAttribute('id');
	const modal = document.querySelector(`#${modalId}.dialog`);

	button.addEventListener('click', () => {
		handleModalShow(modal);
	});
});

closeBtns.forEach((button) => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('id');
        const modal = document.querySelector(`#${modalId}.dialog`);

        handleModalClose(modal);
    })
});
