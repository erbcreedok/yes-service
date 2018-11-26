//index page
$( document ).ready(function() {
    if ($('#sitepage').val() !== 'index' ) return;

    var firstSectionSlides = $('.first-section-slides');
    var firstSectionSliderNavItems = $('.first-section-slider-nav>div>.slider-nav-item');
    firstSectionSlides.slick({
        arrows: false,
        dots: true,
        draggable: false,
        swipe: false,
        fade: true,
        touchMove: false,
        autoplay: true,
        autoplaySpeed: 5000,
    });
    firstSectionSliderNavItems.on('click', function() {
        var index = $(firstSectionSliderNavItems).index(this);
        firstSectionSlides.slick('slickGoTo', index);
    });
    firstSectionSlides.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setActiveSlide(nextSlide);
    });
    setActiveSlide(0);
    function setActiveSlide(index) {
        firstSectionSliderNavItems.removeClass('active');
        firstSectionSliderNavItems.eq(index).addClass('active');
    }

    var productLists = $('#product-tabs');
    var productListsPills = $('.pill-tabs[data-target="#product-tabs"]>.pill');
    function setActiveProduct(index) {
        productLists.children().addClass('d-none');
        productLists.children().eq(index).removeClass('d-none');
        productListsPills.removeClass('active');
        productListsPills.eq(index).addClass('active');
    }
    productListsPills.on('click', function (e) {
        var index = productListsPills.index(this);
        setActiveProduct(index);
    })

    var logoList = $('.logo-list');
    logoList.slick({
        arrows: true,
        adaptiveHeight: true,
        prevArrow: '<div class="slider-arrow-prev slider-arrow-abs">Предыдущий</div>',
        nextArrow: '<div class="slider-arrow-next slider-arrow-abs">Следующий</div>'
    });
    $('.logo-tabs a').click(function() {
        if (this.classList.contains('active')) return;
        logoList.slick('slickGoTo', this.dataset.goto);
        $('.logo-tabs a.active').removeClass('active');
        $(this).addClass('active');
    });
    logoList.on('afterChange', function () {
       var currentSlide = logoList.slick('slickCurrentSlide');
        $('.logo-tabs a.active').removeClass('active');
        $('.logo-tabs a[data-goto=' + currentSlide + ']').addClass('active');
    });


});

$(document).ready(function () {
    $('input[name="phone"]').inputmask("+9 (999) 999 99 99");

    $('.callbackForm, #callbackForm').submit(function(e) {
        e.preventDefault();
        var nameElement = this.elements.name;
        var phoneElement = this.elements.phone;
        var name = nameElement.value.trim();
        var phone = phoneElement.value.trim();
        var valid = true;
        if (name === '') {
            nameElement.classList.add('no-valid');
            valid = false;
        } else {
            nameElement.classList.remove('no-valid');
        }
        if (phone.indexOf('_') !== -1) {
            phoneElement.classList.add('no-valid');
            valid = false;
        } else {
            phoneElement.classList.remove('no-valid');
        }
        if (!valid) return;

        sendMessage(this, name, phone);

    });

    var sendMessage = function(form, name, phone) {
        var message = '💡Новая заявка от ' + name;
        message += '\n    <i> Телефон: </i> ' + phone;
        message = encodeURIComponent(message);

        $('.ajax-status').html('Отправляем <span class="icon-spinner spin-me" style="display: inline-block;"></span>');

        $(form).attr('disabled', true);
        $(form.elements).attr('disabled', true);

        setTimeout(function() {
            console.log(message);
            $('.ajax-status').html('Отправлено <span class="icon-checkmark" style="display: inline-block;"></span>');
            $('.modal-form').fadeOut(function () {
                $('.modal-thanks').fadeIn(function () {
                    setTimeout(function () {
                        $('#callbackModal').modal('hide');
                    },3000)
                });
            });
        }, 3000);
    }
});

