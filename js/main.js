$(document).ready(function () {

	$('.popup-with-form').magnificPopup();


	$(".owl-carousel").owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		responsive: {
			0: {
				items: 1,
				nav: false,
				autoplay: true,
				autoplayHoverPause: true,

			},
			600: {
				items: 2
			}

		}
	});

	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function (item) {
				return item.el.attr('title') + '<small>Поселок Бородулинский</small>';
			}
		}
	});

	//E-mail Ajax Send
	$("form").submit(function () { //Change
		let first = $('#pupopFormFirstWindow');
		let second = $('#pupopFormSecondWindow');
		let third = $(this);

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: third.serialize()
		}).done(function () {
			// alert("Спасибо Вам!");
			setTimeout(function () {
				$.magnificPopup.close();
				first.trigger("reset");
				second.trigger("reset");
				third.trigger("reset");
				$('#pupopButtonNextSecondWindow').attr('disabled', true);
				$('#pupopButtonNextThirdWindow').attr('disabled', true);
			}, 200);
		});
		return false;
	});

	// $("form").submit(function () { //Change
	// 	var th = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", //Change
	// 		data: th.serialize()
	// 	}).done(function () {
	// 		// alert("Thank you!");
	// 		setTimeout(function () {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 	});
	// 	return false;
	// });


	$(document).on('scroll', function () {

		if ($(window).scrollTop() > 1100) {
			$('.scroll-top-wrapper').addClass('show');
		} else {
			$('.scroll-top-wrapper').removeClass('show');
		}
	});

	$('.scroll-top-wrapper').on('click', scrollToTop);


	function scrollToTop() {
		verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
		element = $('body');
		offset = element.offset();
		offsetTop = offset.top;
		$('html, body').animate({
			scrollTop: offsetTop
		}, 500, 'linear');
	}


});