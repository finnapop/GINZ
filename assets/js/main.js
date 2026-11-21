'use strict';

{
    $(function(){
        $('.header__btn').on('click', function(){
            $('.nav').toggleClass('active');
        });

        $('.nav__btn, .nav__item a').on('click', function(){
            $('.nav').removeClass('active');
        });

        const heroTrack = document.querySelector('.mainImg__track');
        const heroSlides = heroTrack ? Array.from(heroTrack.querySelectorAll('.mainImg__slide')) : [];
        const realHeroSlides = heroTrack ? Array.from(heroTrack.querySelectorAll('.mainImg__slide[data-slide]')) : [];
        const heroPrevButton = document.querySelector('.mainImg__arrow--prev');
        const heroNextButton = document.querySelector('.mainImg__arrow--next');

        if (heroTrack && realHeroSlides.length > 1) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const transitionDuration = prefersReducedMotion ? 0 : 800;
            const slideStep = 100 / heroSlides.length;
            let trackIndex = 1;
            let isAnimating = false;
            let autoplayTimer;

            heroTrack.style.transform = `translateX(-${slideStep}%)`;

            const updateSlideAccessibility = function(){
                const activeSlideIndex = (trackIndex - 1 + realHeroSlides.length) % realHeroSlides.length;
                realHeroSlides.forEach(function(slide, index){
                    if (index === activeSlideIndex) {
                        slide.removeAttribute('aria-hidden');
                    } else {
                        slide.setAttribute('aria-hidden', 'true');
                    }
                });
            };

            const snapToTrackIndex = function(index){
                trackIndex = index;
                heroTrack.style.transition = 'none';
                heroTrack.style.transform = `translateX(-${trackIndex * slideStep}%)`;
                heroTrack.offsetWidth;
                heroTrack.style.transition = '';
            };

            const changeHeroSlide = function(direction){
                if (isAnimating) {
                    return false;
                }

                isAnimating = true;
                trackIndex += direction;
                heroTrack.style.transform = `translateX(-${trackIndex * slideStep}%)`;
                updateSlideAccessibility();

                window.setTimeout(function(){
                    if (trackIndex === 0) {
                        snapToTrackIndex(realHeroSlides.length);
                    } else if (trackIndex === realHeroSlides.length + 1) {
                        snapToTrackIndex(1);
                    }
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
