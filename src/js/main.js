$(document).ready(function () {
    $.cookie.raw = true;
    $.cookie.json = true;


    if ($.cookie("city")) {

        if ($('#city').attr('city')) {
            $('.cities__selected').html($('#city').attr('city'));
            $('.cookie-city').html($('#city').attr('city2'));
        } else {
            $('.cities__selected').html(JSON.parse($.cookie("city")));
            $('.cookie-city').html(JSON.parse($.cookie("city2")));
        }
    } else {
        if ($('#city').attr('city')) {
            $.cookie('city', $('#city').attr('city'), { path: '/', expires: 21 });
            $('.cities__selected').html($('#city').attr('city'));
            $('.cookie-city').html($('#city').attr('city2'));
        } else {
            $.cookie('city', 'Гродно', { path: '/', expires: 21 });            
            $.cookie('city2', 'Гродно', { path: '/', expires: 21 });
        }
    }





    /*  $('input[name="search"]').on('blur', function () {
         $('.search__result').removeClass('active');
     }); */

    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $(".search-mobile.active"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.removeClass('active');
            $('.search__result').removeClass('active');
        }
    });

    $('.search-mobile').on('click', function () {
        $(this).addClass('active');
    })

    $('.cities__select').on('click', function () {
        $.cookie('city', $(this).attr('attrCity'), { path: '/', expires: 21 });        
        $.cookie('city2', $(this).attr('city2'), { path: '/', expires: 21 });
        $('.cities__selected').html($(this).attr('attrCity'));
        $('.cookie-city').html($(this).attr('city2'));
    });

    $('.nav__select').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.cities').on('click', function () {
        $(this).toggleClass('active');
        $('.all-cities').toggleClass('active');
    });

    $('.contacts').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.burger').on('click', function () {
        $('body, html').toggleClass('no-scroll');
        $('.burger').toggleClass('active');
        $('.nav.mobile').toggleClass('active');
    });

    $('.search__trigger').on('click', function () {
        $(this).closest('.search').addClass('active');
    });

    $('.search__close').on('click', function () {
        $(this).closest('.search').removeClass('active');
        $('.search__result').removeClass('active');
    });

    $('.faq__trigger').on('click', function () {
        $(this).closest('.faq__item').toggleClass('active');
    });

    $('.systems__tab').on('click', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.systems__item').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });

    $('.our-works__filter').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.our-works__items .img').each(function () {
            $(this).replaceWith('<unimg class="img foto-open" src="' + $(this).attr('data-src') + '" data-src="' + $(this).attr('data-src') + '" filtred="' + $(this).attr('filtred') + '"></unimg>')
        });
        if ($(this).attr('filtred') == "all") {
            $('.our-works__items .img').each(function () {
                $(this).replaceWith('<img class="img foto-open active" src="' + $(this).attr('data-src') + '" data-src="' + $(this).attr('data-src') + '" filtred="' + $(this).attr('filtred') + '"></img>')
            });
        } else {
            $('.our-works__items .img[filtred="' + $(this).attr('filtred') + '"').each(function () {
                $(this).replaceWith('<img class="img foto-open active" src="' + $(this).attr('data-src') + '" data-src="' + $(this).attr('data-src') + '" filtred="' + $(this).attr('filtred') + '"></img>')
            });
        }
    });

    let i = 0;
    setInterval(function () {
        $('.manager__text').eq(i).addClass('active').siblings().removeClass('active');
        i++;
        if (i >= $('.manager__text').length) {
            i = 0;
        }
    }, 3000)

    $('.modal-open').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation(); 
        $('.modal').addClass('active');
    });

    $('.modal .close').on('click', function () {
        $('.modal').removeClass('active');
        $('.success').removeClass('active');
        $('.send').addClass('active');
    });

    $(".send input").eq(1).mask("+375 (99) 999-99-99");
    $(".consultation input").eq(1).mask("+375 (99) 999-99-99");
    $(".questionnaire input").eq(4).mask("+375 (99) 999-99-99");

    $('.send .btn, .consultation .btn').on('click', function (e) {
        e.preventDefault();
        let k = 0;
        $(this).closest('form').find('input').each(function () {
            if ($(this).val() == '') {
                k++;
                $(this).addClass('error');
            }
        });
        setTimeout(function () {
            $('input').removeClass('error');
        }, 2000);
        if (k == 0) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: "POST",
                data: {
                    action: 'send_feedback',
                    name: $(this).closest('form').find('input').eq(0).val(),
                    phone: $(this).closest('form').find('input').eq(1).val(),
                },
                dataType: "json",
                complete: function (data) {
                    $('.send').removeClass('active');
                    $('.modal').addClass('active');
                    $('.success').addClass('active');
                }
            })
        }
    });

    $('.questionnaire form').on('submit', function (e) {
        e.preventDefault();
        let k = 0;
        $(this).closest('form').find('input, textarea').each(function () {
            if ($(this).val() == '') {
                k++;
                $(this).addClass('error');
            }
            console.log($(this).val())
        });
        setTimeout(function () {
            $('input, textarea').removeClass('error');
        }, 2000);
        if (k == 0) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: "POST",
                data: {
                    action: 'send_vac',
                    name: $(this).find('input').eq(0).val(),
                    surname: $(this).find('input').eq(1).val(),
                    patronymic: $(this).find('input').eq(2).val(),
                    email: $(this).find('input').eq(3).val(),
                    phone: $(this).find('input').eq(4).val(),
                    city: $(this).find('input').eq(5).val(),
                    birth_date: $(this).find('input').eq(6).val(),
                    vac: $(this).find('select').val(),
                    start_work: $(this).find('input').eq(7).val(),
                    study: $(this).find('input').eq(8).val(),
                    experience: $(this).find('textarea').eq(0).val(),
                    about: $(this).find('textarea').eq(1).val(),
                },
                dataType: "json",
                complete: function (data) {
                    $('.send').removeClass('active');
                    $('.modal').addClass('active');
                    $('.success').addClass('active');
                }
            })
        }
    });


    $('body').on('click', '.foto-open', function () {
        $('.foto-modal').addClass('active');
        $('.foto-modal .replace-img').attr('src', $(this).attr('src'));
        $('.foto-modal .replace-img').attr('eq', $(this).index());
    });

    $('.foto-modal .right').on('click', function () {
        $('.foto-modal .replace-img').addClass('leave');
        setTimeout(() => {
            if ($('.foto-modal .replace-img').attr('eq') != $('.foto-open').length - 1) {
                $('.foto-modal .replace-img').attr('src', $('.foto-open').eq(parseInt($('.foto-modal .replace-img').attr('eq')) + 1).attr('src'));
                $('.foto-modal .replace-img').attr('eq', parseInt($('.foto-modal .replace-img').attr('eq')) + 1);
            } else {
                $('.foto-modal .replace-img').attr('src', $('.foto-open').eq(0).attr('src'));
                $('.foto-modal .replace-img').attr('eq', 0);
            }
            $('.foto-modal .replace-img').removeClass('leave');
        }, 300);

    });

    $('.foto-modal .left').on('click', function () {
        $('.foto-modal .replace-img').addClass('leave');
        setTimeout(() => {
            if ($('.foto-modal .replace-img').attr('eq') != '0') {
                $('.foto-modal .replace-img').attr('src', $('.foto-open').eq($('.foto-modal .replace-img').attr('eq') - 1).attr('src'));
                $('.foto-modal .replace-img').attr('eq', parseInt($('.foto-modal .replace-img').attr('eq')) - 1);
            } else {
                $('.foto-modal .replace-img').attr('src', $('.foto-open').eq($('.foto-open').length - 1).attr('src'));
                $('.foto-modal .replace-img').attr('eq', $('.foto-open').length - 1);
            }
            $('.foto-modal .replace-img').removeClass('leave');
        }, 300);
    });

    $('.foto-modal .close').on('click', function () {
        $('.foto-modal').removeClass('active');
    });

    $('select').on('click', function () {
        if (!$('label').hasClass('active')) {
            $('label').addClass('active');
        } else {
            $('label').removeClass('active');
        }
    });

    $('select').on('change', function () {
        $('label').removeClass('active');
        $('label span').html($(this).val());
    });

    $('select').on('blur', function () {
        $('label').removeClass('active');
    });


    $('.search input, .search-mobile input').on('input', function () {
        $('.search__result').removeClass('active');
        if ($(this).val() != '' && $(this).val().length >= 2) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: "POST",
                data: {
                    action: 'ajax_search',
                    term: $(this).val()
                },
                dataType: "json",
                complete: function (data) {
                    $('.search__result').addClass('active').html(data.responseText);
                }
            })
        }
    });







    var swiper = new Swiper(".recommend-swiper", {
        slidesPerView: "auto",
        spaceBetween: 60,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: "auto",
            }
        }
    });


    var howSwiper = new Swiper(".how-swiper", {
        slidesPerView: "auto",
        spaceBetween: 60,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: "auto",
            }
        }
    });



    var fbSwiper = new Swiper(".feedback-swiper", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 60,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 3,
            }
        }
    });


});