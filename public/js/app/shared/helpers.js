define([
    'jquery',
], function ($) {

    return {
        showValidationErrors: function (element, errors) {
            $.each(errors, function (index, errorObj) {
                var fieldObj = element.find('#' + errorObj.field);

                if ($(fieldObj).siblings('.error').length > 0) {
                    return;
                }

                $('<p class="error">' + errorObj.message + '</p>').insertAfter(fieldObj);

                fieldObj.on('focus', function () {
                    $(this).next('.error').remove();
                });
            });
        },

        showNotificationMessage: function (type, message) {
            if ($('.notification').length > 0) {
                return;
            }

            $('body').prepend('<div class="notification notification-' + type + '">' + message + '</div>');
            $('.notification').animate({
                top: '10px',
            }, 300, function () {
                setTimeout(function () {
                    $('.notification').animate({
                        top: '-50px',
                    }, 300, function () {
                        $(this).remove();
                    });
                }, 5000);
            });
        }
    };
});