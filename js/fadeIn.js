document.addEventListener('scroll', () => {
    const fadeInBox = document.querySelector('.fade-In');
    const fadeInBoxPosition = fadeInBox.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5; // Trigger when the box is halfway down the screen
  
    if (fadeInBoxPosition < screenPosition) {
      fadeInBox.classList.add('visible');
      fadeInBox.classList.remove('hidden');
    }
  });
  