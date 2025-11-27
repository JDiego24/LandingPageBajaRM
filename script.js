document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica para Animaciones On-Scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.js-animate-on-scroll');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'is-visible' para que el CSS aplique la animación
                entry.target.classList.add('is-visible');
                // Deja de observar el elemento
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 2. Lógica para el Control de Videos en Carruseles
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        // Detiene el avance del carrusel al hacer clic en el área del video
        const videoElement = carousel.querySelector('.carousel-item video');
        
        if (videoElement) {
            videoElement.addEventListener('click', (e) => {
                // Evita que el clic se propague al carrusel, previniendo el avance de slide
                e.stopPropagation();
            });
        }
        
        // Controlar la reproducción y pausa al cambiar de slide
        carousel.addEventListener('slide.bs.carousel', (e) => {
            // Detiene todos los videos al iniciar la transición de slide
            carousel.querySelectorAll('video').forEach(video => {
                video.pause();
            });
            
            // Si el siguiente elemento es un video, intenta reproducirlo
            const nextSlide = e.relatedTarget;
            const nextVideo = nextSlide.querySelector('video');
            
            if (nextVideo) {
                // Intenta reproducir el video activo
                nextVideo.play().catch(error => {
                    // La reproducción automática puede ser bloqueada por el navegador
                });
            }
        });
    });
});