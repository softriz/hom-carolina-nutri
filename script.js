        const sections = document.querySelectorAll('section');
        // const topBtn = document.getElementById('topBtn');
        const header = document.getElementById('header');

        window.addEventListener('scroll', () => {
            sections.forEach(sec => {
                if (window.scrollY > sec.offsetTop - 700) {
                    sec.classList.add('show');
                }
            });

            // if (window.scrollY > 300) topBtn.classList.add('show');
            // else topBtn.classList.remove('show');

            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        // topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

        // MOBILE MENU
        // const toggle = document.getElementById('menuToggle');
        const menu = document.getElementById('menu');

        // toggle.onclick = () => menu.classList.toggle('active');

        // HERO SLIDER AUTO
        const slider = document.getElementById('heroSlider');
        const slides = document.querySelectorAll('.hero-slide');
        let index = 0;
        const totalSlides = slides.length;

        function updateSlides() {
            slider.style.transform = `translateX(-${index * 100}%)`;

            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');
        }

        setInterval(() => {
            index++;
            if (index >= totalSlides) index = 0;
            updateSlides();
        }, 4000);

        // init first
        updateSlides();

        // MOBILE MENU CONTROL
        //   const header = document.querySelector('header');

        // create button + overlay if not exists
        //   let menuBtn = document.createElement('div');
        //   menuBtn.id = 'menuBtn';
        //   menuBtn.innerHTML = '☰';
        //   menuBtn.style.cursor = 'pointer';
        //   menuBtn.style.fontSize = '24px';

        let nav = document.querySelector('nav');
        //   header.appendChild(menuBtn);

        let overlay = document.getElementById('menuOverlay');
        // overlay.id = 'menuOverlay';
        // document.body.appendChild(overlay);

        function openMenu() {
            nav.classList.add('active');
            overlay.classList.add('active');
            menuBtn.innerHTML = '✕';
        }

        function closeMenu() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        menuBtn.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        //HOVER AUTOMATICA NO MOBILE
        let scrollListenerActive = false;

        function scrollMobile() {
            const screenCenter = window.innerHeight / 2;

            const elements = document.querySelectorAll('.card, .btn');
            // console.log(elements);
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                let distance_max = 70;
                const distance = Math.abs(screenCenter - elCenter);

                // if (el.className == 'feature') {
                //     distance_max = 60;
                // }

                if (distance < distance_max) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
        }

        function handleMobileEffects() {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;

            if (isMobile && !scrollListenerActive) {
                window.addEventListener('scroll', scrollMobile);
                scrollListenerActive = true;

                // 🔥 roda uma vez ao carregar
                scrollMobile();

            } else if (!isMobile && scrollListenerActive) {
                window.removeEventListener('scroll', scrollMobile);
                scrollListenerActive = false;

                document.querySelectorAll('.card, .btn')
                    .forEach(el => el.classList.remove('active'));
            }
        }

        // INIT
        handleMobileEffects();
        window.addEventListener('resize', handleMobileEffects);