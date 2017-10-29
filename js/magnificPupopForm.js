$(document).ready(function () {

	// Click on the close X to hide the link in the popup

	$('.linkFormPupop_close').click(function () {
		let close = $('.linkFormPupop');
		if (close.css('right') === '0px' || close.css('right') === 0) {
			close.css('right', '-150px');
		} else {
			close.css('right', '0');
		}
	});


	$('#linkFormPupop-inline-popups').click(function (e) {
			let mes = e.target.text;
			setTimeout(function () {
				$('input[name="form_subject"]').val(mes);
			}, 500);
			if (mes === "скидки") {
				$('.formPopup-text--discount').hide();
				$('.formPopup-text--online').show();
			} else {
				$('.formPopup-text--online').hide();
				$('.formPopup-text--discount').show();
			}
		})
		.magnificPopup({
			delegate: 'a',
			removalDelay: 500,
			focus: '#pupopNameSecond',
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true
		});

	// validation checkbox and getting data answers
	// ======================================

	let squaredArea = $('#pupopFormThirdWindow input[name="Площадь участка"]');
	let landscape = $('#pupopFormThirdWindow input[name="Ландшафт"]');

	$('#pupopFormFirstWindow').change(function () {
		$('#pupopButtonNextSecondWindow').attr('disabled', false);
		setTimeout(function () {
			let landAreaInputValue = $('input[name="landArea"]:checked').val();
			squaredArea.val(landAreaInputValue);
		}, 100)
	});

	$('#pupopFormSecondWindow').change(function () {
		$('#pupopButtonNextThirdWindow').attr('disabled', false);
		setTimeout(function () {
			let landScapeInputValue = $('input[name="landscape"]:checked').val();
			landscape.val(landScapeInputValue);
		}, 100)
	});
	// open magnific second window
	$('#pupopButtonNextSecondWindow').magnificPopup({
		items: {
			src: '#pupopFormSecondWindow',
			type: 'inline'
		}
	});
	// open magnific third window
	$('#pupopButtonNextThirdWindow').magnificPopup({
		items: {
			src: '#pupopFormThirdWindow',
			type: 'inline',
		}
	});

	// input mask
	// ==========================================
	$('#pupopPhone, #pupopPhoneSecond').inputmask({
		"mask": "(999) 999-9999"
	});

	// END input mask ===========================

	//E-mail Ajax Send 
	// $("#pupopFormThirdWindow").submit(function () { //Change
	// 	let first = $('#pupopFormFirstWindow');
	// 	let second = $('#pupopFormSecondWindow');
	// 	let third = $(this);

	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", 
	// 		data: third.serialize()
	// 	}).done(function () {
	// 		setTimeout(function () {
	// 			$.magnificPopup.close();
	// 			first.trigger("reset");
	// 			second.trigger("reset");
	// 			third.trigger("reset");
	// 			$('#pupopButtonNextSecondWindow').attr('disabled', true);
	// 			$('#pupopButtonNextThirdWindow').attr('disabled', true);
	// 		}, 200);
	// 	});
	// 	return false;
	// });


	// send four and fifth forms
	// $("#pupopFormFourthWindow").submit(function () { //Change
	// 	let first = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", //Change
	// 		data: first.serialize()
	// 	}).done(function () {
	// 		// alert("Спасибо Вам!");
	// 		setTimeout(function () {
	// 			$.magnificPopup.close();
	// 			first.trigger("reset");
	// 		}, 200);
	// 	});
	// 	return false;
	// });

});