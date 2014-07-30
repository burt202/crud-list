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

		showNotificationMessage: function (type, message, removeAfter) {
			var notificationHeight = 40,
				notificationMargin = 10,
				notificationElement = $('<div />', {
					class: 'notification notification-' + type,
					html: message
				});

			if ($('.notification').length >= 1) {
				$('.notification').remove();
			}

			removeAfter = removeAfter || 5000;
			$('body').prepend(notificationElement);

			notificationElement
				.animate({top: notificationMargin + 'px'}, 300)
				.delay(removeAfter)
				.animate({top: '-' + notificationHeight + 'px'}, 300, function () {
					notificationElement.remove();
				});
		}
	};
});
