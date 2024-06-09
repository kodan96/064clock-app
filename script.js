window.addEventListener('DOMContentLoaded', () => {

    


    function fetchQuote() {
        fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            $('.quote').text(`"${data.content}"`);
            $('.author').text(data.author);
        })
        .catch(error => console.error('Error fetching the quote:', error));
    }

    



    


    const getUserInfo = () => {
        fetch('https://ipinfo.io/json?token=f500ec19531b36')
        .then(response => response.json())
        .then(data => {
            $('.local').text(`${data.city}, ${data.country}`);

            // Get user's current time with timezone using Luxon
            const luxontime = luxon.DateTime.now().setZone(data.timezone);
            const formattedTime = luxontime.toFormat('HH:mm');

            $('.current-time').text(formattedTime);

            document.querySelector('.timezone').innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;

            $('.day-of-week').text(luxontime.toFormat('cccc'));
            $('.num-of-week').text(luxontime.weekNumber);
            $('.day-of-year').text(luxontime.ordinal);
            $('.timezone-short').text(luxontime.offsetNameShort);

            const currentHour = luxon.DateTime.now().hour;
            let welcomeMessage;

            if (currentHour >= 6 && currentHour < 12) {
                welcomeMessage = "Good Morning";
                $('.day').fadeIn();
                $('.night').fadeOut();
                $('.night-bg').fadeOut();
                $('.day-bg').fadeIn();
                $('.more_info').css('background-color', 'rgba(255, 255, 255, .5');
                $('.category, .data').css('color', 'black');
            } else if (currentHour >= 12 && currentHour < 18) {
                welcomeMessage = "Good Afternoon";
                $('.day').fadeIn();
                $('.night').fadeOut();
                $('.night-bg').fadeOut();
                $('.day-bg').fadeIn();
                $('.more_info').css('background-color', 'rgba(255, 255, 255, .5');
                $('.category, .data').css('color', 'black');
            } else {
                welcomeMessage = "Good Evening";
                $('.day').fadeOut();
                $('.night').fadeIn();
                $('.night-bg').fadeIn();
                $('.day-bg').fadeOut();
            }
        
            

            if (window.innerWidth > 600) {
                $('.welcome-message').text(`${welcomeMessage}, it's currently`);
            } else {
                $('.welcome-message').text(`${welcomeMessage}`);
            }
            setInterval(() => {
            $('.overlay').slideDown();
            }, 500)

           
        })
        .catch(error => console.error('Error fetching location data:', error));
    }

    const toggleAnimation = () => {
        const distance = window.innerHeight * .39
        if($('.more_info').hasClass('active')) {
            gsap.to('.clock', {
                duration: 0.5,
                y: 0,
                ease: 'expo'
            })
            gsap.to('.more_info', {
                duration: 0.5,
                y: 0,
                ease: 'expo'
            }, 0)
            gsap.to('.header_wrapper', {
                duration: 0.5,
                y: 0,
                ease: 'expo'
            }, .5)

        } else {
            gsap.to('.clock', {
                duration: 0.5,
                y: -distance,
                ease: 'expo'
            })
            gsap.to('.more_info', {
                duration: 0.5,
                y: -distance,
                ease: 'expo'
            }, 0)
            gsap.to('.header_wrapper', {
                duration: 0.5,
                y: -distance,
                ease: 'expo'
            }, .5)
        }
    }




    const refresh = document.querySelector('.refresh');

    refresh.addEventListener('click', () => {
        $('.refresh').addClass('clicked');
        setTimeout(() => {
            $('.refresh').removeClass('clicked');
        }, 500)
        fetchQuote();
    });

    $('.toggle_main').on('click', () => {
        $('.more, .less').slideToggle();
        $('.toggle_main').toggleClass('toggled');
        toggleAnimation();
        $('.more_info').slideToggle();
        $('.more_info').toggleClass('active');
    })

    fetchQuote();
    getUserInfo();
});
