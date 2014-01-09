require(['./config'], function(){
	require([
		'app/app'
	], function (App) {
		App.start();
	});
});