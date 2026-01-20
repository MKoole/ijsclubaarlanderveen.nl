
var spildeElement = document.getElementById('splide');
if (!spildeElement) {
    return;
}

const splide = new Splide('#splide', {
    type: 'loop',
    autoplay: true,
    interval: 15000,      // 15 seconds
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    pagination: false,
});

splide.mount();

// Pause autoplay when a video starts playing
document.querySelectorAll('#splide video').forEach(video => {
    video.addEventListener('play', () => splide.Components.Autoplay.pause());
    video.addEventListener('ended', () => splide.Components.Autoplay.play());
    video.addEventListener('pause', () => splide.Components.Autoplay.play());
});