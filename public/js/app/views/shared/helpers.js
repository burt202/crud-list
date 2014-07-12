define([
	'jquery'
], function ($) {

	return {
		showValidationErrors: function (element, errors) {
			$.each(errors, function (index, errorObj) {
				var fieldObj = element.find('#' + errorObj.field),
					errorElement;

				if ($(fieldObj).siblings('.error').length > 0) {
					return;
				}

				errorElement = $('<p />', {
					class: 'error',
					html: errorObj.message
				});

				errorElement.insertAfter(fieldObj);

				fieldObj.on('focus', function () {
					$(this).next('.error').remove();
				});
			});
		},

		showNotificationMessage: function (type, message) {
			var notificationHeight = 40,
				notificationMargin = 10,
				maxNumber = 5,
				notificationLength = $('.notification').length,
				pixelsFromTop = ((notificationLength + 1) * (notificationHeight + notificationMargin)) - notificationHeight,
				notificationElement = $('<div />', {
					class: 'notification notification-' + type,
					html: message
				});

			if (notificationLength >= maxNumber) {
				return;
			}

			$('body').prepend(notificationElement);
			notificationElement.animate({
				top: pixelsFromTop + 'px'
			}, 300, function () {
				setTimeout(function () {
					notificationElement.animate({
						top: '-' + notificationHeight + 'px'
					}, 300, function () {
						$(this).remove();
						$('.notification').animate({
							top: '-='+ (notificationHeight + notificationMargin) + 'px'
						}, 300);
					});
				}, 5000);
			});
		}
	};
});