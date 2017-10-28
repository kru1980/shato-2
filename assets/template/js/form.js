var fadeSpeed = 400;
var animation;
var validateSettings = {
    emtyMessages: {
        email: 'Укажите e-mail',
        phone: 'Укажите телефон',
        name: 'Укажите Ваше имя',
        unknown: 'Это поле обязательно'
    },
    invalidMessages: {
        email: 'Не корректный e-mail',
        phone: 'Не корректный номер',
        name: 'Не корректное имя'
    },
    pregs: {
        email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/,
        phone: /^[0-9\-\(\)\+\s]{6,30}$/i,
        name: /.+/
    }
};

//$(() => {
$(function(){
	$('form input[type=text], form textarea').each(function(){
		$(this).attr('title',$(this).attr('placeholder'));
	});
	/*$('form textarea').each(function(){
		$(this).attr('title',$(this).val());
	});*/
	
	$('form input[type=text], form textarea').bind('click keydown',function(){
		$(this).attr('placeholder','');
	});
	$('form input[type=text], form textarea').bind('blur',function(){
		$(this).attr('placeholder',$(this).attr('title'));
	});

    $('.sendLead').submit(function(e) {
        e.preventDefault();
        var send = true;
        var form = $(this);
        // console.log($(this));
        form.find('input.required').each(function(ind, el) {
            if ($(el).val() === '') {
                setError($(el), 'empty');
                send = false;
            }
            else if ($(el).data('type') && $(el).val() == validateSettings.emtyMessages[$(el).data('type')]) {
                setError($(el), 'empty');
                send = false;
            }
            else if (!checkRegexp($(el), $(el).data('type'))) {
                setError($(el), 'invalid');
                send = false;
            }
        });
        if (send) {
            
            if(form.find('input[type="file"]').length > 0 && form.find('input[type="file"]').val() != ''){
                form.unbind('submit').trigger('submit');
            }
            else
                formSubmit(form);
        }
    });
});

function setError(input, errorType) {
    if (errorType == 'empty') {
        console.log(input);
        input.val(validateSettings.emtyMessages[(input.data('type') != '') ? input.data('type') : 'unknown']).addClass('error').on('focus', function() {
            $(this).val('').removeClass('error').off('focus');
        });
    }
    else {
        input.val(validateSettings.invalidMessages[input.data('type')]).addClass('error').bind('focus', function() {
            $(this).val('').removeClass('error').off('focus');
        });
    }
}

function checkRegexp(o, type) {
    if (type == undefined) {
        return "Некорректно введены данные!";
    }
    var regexp = validateSettings.pregs[type];
    if (!(regexp.test(o.val()))) {
        return false;
    } else {
        return true;
    }
}

function formSubmit(form) {
    var action = '/assets/template/php/submit.php';
    // console.log(form);
    var sendData = form.serialize();
    startLoadingAnimation();
    setTimeout(function() {
        $.post(action, sendData, function(data, textStatus) {
            if (textStatus != 'success') {
                alert(textStatus);
            }
            else {
                form[0].reset();
                stopLoadingAnimation();
                //$.fancybox.close();
                    $.fancybox('#success', {
                        scrolling: 'no',
                        openSpeed: fadeSpeed,
                        minHeight: '5',
                        afterLoad: function() {
                            setTimeout(function() {
                                $.fancybox.close();
                            }, 5000);
                        },
                        padding: 3,
                        helpers: {
                            overlay: {
                                locked: false
                            }
                        }
                    });
                return true;
            }
        });
    }, fadeSpeed * 2);
}


function startLoadingAnimation() {
    $('#overlay-hidden').trigger('click');
    $('#overlay-feedback').css("display","none");
    //$.fancybox.close();
    $.fancybox('#loading', {
        scrolling: 'no',
        openSpeed: fadeSpeed,
        minHeight: '5',
        afterLoad: function() {
            $('#loading').find('#load').animate({width: '100%'}, 1000, function() {
                $('#loading').find('#load').animate({width: '0%'}, 1000)
            });
            animation = setInterval(function() {
                $('#loading').find('#load').animate({width: '100%'}, 1000, function() {
                    $('#loading').find('#load').animate({width: '0%'}, 1000)
                });
            }, 2000);
        },
        padding: 0,
        modal: true,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
}
function stopLoadingAnimation() {
    clearInterval(animation);
} 