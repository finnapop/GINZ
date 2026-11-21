'use strict';

{
    $(function(){
        $('.header__btn').on('click', function(){
            $('.nav').toggleClass('active');
        });

        $('.nav__btn, .nav__item a').on('click', function(){
            $('.nav').removeClass('active');
        });

        const heroSlides = document.querySelectorAll('.mainImg__slide');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const heroPrevButton = document.querySelector('.mainImg__arrow--prev');
        const heroNextButton = document.querySelector('.mainImg__arrow--next');

        if (heroSlides.length > 1) {
            const transitionDuration = prefersReducedMotion ? 0 : 800;
            let activeSlideIndex = 0;
            let isAnimating = false;
            let autoplayTimer;

            const changeHeroSlide = function(direction){
                if (isAnimating) {
                    return false;
                }

                const outgoingSlide = heroSlides[activeSlideIndex];
                const nextSlideIndex = (activeSlideIndex + direction + heroSlides.length) % heroSlides.length;
                const incomingSlide = heroSlides[nextSlideIndex];

                isAnimating = true;
                outgoingSlide.classList.remove('is-active');
                outgoingSlide.classList.add(direction > 0 ? 'is-leaving' : 'is-leaving-right');
                outgoingSlide.setAttribute('aria-hidden', 'true');
                activeSlideIndex = nextSlideIndex;

                if (direction < 0) {
                    incomingSlide.classList.add('is-entering-from-left');
                    incomingSlide.offsetWidth;
                }
                incomingSlide.classList.add('is-active');
                incomingSlide.classList.remove('is-entering-from-left');
                incomingSlide.removeAttribute('aria-hidden');

                window.setTimeout(function(){
                    outgoingSlide.classList.remove('is-leaving', 'is-leaving-right');
                    isAnimating = false;
                }, transitionDuration);

                return true;
            };

            const startAutoplay = function(){
                window.clearInterval(autoplayTimer);
                if (!prefersReducedMotion) {
                    autoplayTimer = window.setInterval(function(){
                        changeHeroSlide(1);
                    }, 10000);
                }
            };

            heroPrevButton.addEventListener('click', function(){
                if (changeHeroSlide(-1)) {
                    startAutoplay();
                }
            });
            heroNextButton.addEventListener('click', function(){
                if (changeHeroSlide(1)) {
                    startAutoplay();
                }
            });

            startAutoplay();
        }
    });

}
