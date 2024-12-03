document.addEventListener('scroll', function () {
    const startTrigger = document.querySelector('.scroll-trigger');
    const endTrigger = document.querySelector('.scroll-endTrigger');
    const stickyText = document.querySelector('.loading-text');
    const container = document.querySelector('#text-container');

    const viewportMiddle = window.innerHeight / 2;

    const triggerStartPosition = startTrigger.getBoundingClientRect().top;
    const triggerEndPosition = endTrigger.getBoundingClientRect().top;


    const containerOffset = container.offsetTop;

    if (triggerStartPosition <= viewportMiddle && triggerEndPosition > viewportMiddle) {

        stickyText.style.position = 'fixed';
        stickyText.style.top = '50%'; 
        stickyText.style.left = '50%'; 
        stickyText.style.transform = 'translate(-50%, -50%)'; 
        stickyText.classList.add('visible');
        stickyText.classList.remove('hidden');
    } else if (triggerEndPosition <= viewportMiddle) {

        stickyText.style.position = 'absolute';
        stickyText.classList.add('hidden');
        stickyText.classList.remove('visible');
    } else {

        stickyText.style.position = 'absolute';
        stickyText.classList.add('hidden');
        stickyText.classList.remove('visible');
    }
});
