(function(){

	// Init global DOM elements, functions and arrays
  	window.app 			 		= {el : {}, fn : {}};
	app.el['window']     		= $(window);
	app.el['document']   		= $(document);
	app.el['back-to-top'] 		= $('.back-to-top');
	app.el['html-body'] 		= $('html,body');
	app.el['animated']   		= $('.animated');
	app.el['loader']        	= $('#loader');
	app.el['mask']          	= $('#mask');
	app.el['header']        	= $('header');

	app.fn.screenSize = function() {
		var size, width = app.el['window'].width();
		if(width < 320) size = "Not supported";
		else if(width < 480) size = "Mobile portrait";
		else if(width < 768) size = "Mobile landscape";
		else if(width < 960) size = "Tablet";
		else size = "Desktop";
		// $('#screen').html( size + ' - ' + width );
		// console.log( size, width );
	};	

	$(function() {	
	    //Preloader
	    app.el['loader'].delay(700).fadeOut();
	    app.el['mask'].delay(1200).fadeOut("slow");   

		// Resized based on screen size
		app.el['window'].resize(function() {
			app.fn.screenSize();
			dimensionInit();
		});	
		
		
		function dimensionInit() {
          var winHeight, winWidth,
              homepage = $('#homepage');
          
          winHeight = app.el['window'].height(),
          winWidth  = app.el['window'].width();
          
          homepage.height(winHeight).width();
        };
    
	    // Full Heigth + Width Page
	    app.el['window'].on('orientationchange', dimensionInit());
	    app.el['window'].on('resize', dimensionInit());
	    app.el['document'].on('ready', dimensionInit());
	    
	    $('#thumbnail').flexslider({
	        animation: 'slide',
	        controlNav: false,
	        animationLoop: false,
	        slideshow: false,
	        itemWidth: 151,
	        itemMargin: 15,
	        asNavFor: '#slider'
	    });
	     
	    $('#slider').flexslider({
	        animation: 'slide',
	        controlNav: false,
	        animationLoop: false,
	        slideshow: false,
	        sync: '#thumbnail'
	    });
    
		// fade in .back-to-top
		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				app.el['back-to-top'].fadeIn();
			} else {
				app.el['back-to-top'].fadeOut();
			}
		});

		// scroll body to 0px on click
		app.el['back-to-top'].click(function () {
			app.el['html-body'].animate({
				scrollTop: 0
			}, 1500);
			return false;
		});

		//Elements animation
		app.el['animated'].appear(function() {
			var element = $(this);
			var animation = element.data('animation');
			var animationDelay = element.data('delay');
			if(animationDelay) {
				setTimeout(function(){
					element.addClass( animation + " visible" );
					element.removeClass('hiding');
				}, animationDelay);
			} else {
				element.addClass( animation + " visible" );
				element.removeClass('hiding');
			}    			
		}, {accY: -150});

	    $('#goto').change(function(e) {
	    	window.location.href = $(this).val();
	    });
	    
	});

})();