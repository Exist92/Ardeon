document.querySelectorAll('.video-block').forEach(block => {
    const video = block.querySelector('video');
    block.addEventListener('mouseenter', () => {
      video.play();
    });
    block.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // сброс
    });
  });
