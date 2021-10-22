var sliders = {};
function emblaCarousel(elem, options){
	options['arrowPrev'] = options['arrowPrev']?options['arrowPrev']:'icon-b-arrow-left2';
	options['arrowNext'] = options['arrowNext']?options['arrowNext']:'icon-b-arrow-right2';
	$(elem).each(function(index, val){
		var _this = $(this);
		if (sliders[elem] && sliders[elem][index]) {
			var embla = sliders[elem][index];
			embla.reInit(options);
			if (embla.scrollSnapList().length > $(this).find('.embla-dot').length) {
				var dots = $(this).find('.embla-dots');
				embla.scrollSnapList().forEach(function(elem, index){
					if (!dots.find('.embla-dot-'+index).length) {
			    	var dot = $('<div class="embla-dot embla-dot-'+index+'" data-index="'+index+'"></div>');
			    	dots.append(dot);
			    	var selectedIndex = embla.selectedScrollSnap();
			    	if (selectedIndex == index) {dot.addClass('active')}
			    	dot.click(function(){
			    		var index = $(this).attr('data-index');
			    		embla.scrollTo(index);
			    	})
					}
		    })
			}
		}else{
			console.log(elem);
			var prevBtn = $('<a class="embla-navs embla-nav-prev" data-index=""><i class="'+options['arrowPrev']+'"></i></a>');
			var nextBtn = $('<a class="embla-navs embla-nav-next"><i class="'+options['arrowNext']+'"></i></a>');
			var dots = $('<div class="embla-dots"></div>');
			_this.wrapInner('<div class="embla__container"></div>');
			_this.wrapInner('<div class="embla__innerWrap"></div>');
			_this.append(dots);
			_this.addClass('embla-carousel');
		  var embla = EmblaCarousel($(this).find('.embla__innerWrap')[0],options);
			if (embla.scrollSnapList().length > 1) {
				_this.append(prevBtn);
				_this.append(nextBtn);
			}
		  if(sliders[elem]){
		  	sliders[elem][index] = embla;
		  }else{
		  	sliders[elem] = { 0 : embla };
		  }

	    // nav buttons
	    if (options['navs']) {
			  prevBtn[0].addEventListener('click', embla.scrollPrev, false);
			  nextBtn[0].addEventListener('click', embla.scrollNext, false);
		    if (embla.canScrollPrev()){ 
		    	prevBtn[0].removeAttribute('disabled');
		    }else {  
		    	prevBtn[0].setAttribute('disabled', 'disabled');
		  	}

		    if (embla.canScrollNext()){ 
		    	nextBtn[0].removeAttribute('disabled');
		    }else{ 
		    	nextBtn[0].setAttribute('disabled', 'disabled');
		    }
	    }
	   	// prevBtn[0].addEventListener('click', clickPrev(), false);
   	 // 	nextBtn[0].addEventListener('click', clickNext(), false);

	   	embla.slideNodes().forEach((slideNode, index) => {
          slideNode.addEventListener('click', () => onSlideClick(index), false)
      })

	    $('.js-mainBannerTabs li:nth-child(1) a').trigger('click');
		  embla.scrollTo(0);

	    $('.js-mainBannerTabs li a').click(function(event) {



			 	var getHref = $(this).data('href');
			
				embla.scrollTo(getHref);
				$(this).closest('ul').find('.active').removeClass('active')
				$(this).closest('li').addClass('active');
			 	return false;

			});

			embla.on("select", function(){
        var selectedIndex = embla.selectedScrollSnap();
        console.log(selectedIndex);
        $('.js-mainBannerTabs li').removeClass('active');
        $('.js-mainBannerTabs li a[data-href="'+selectedIndex+'"]').parent().addClass('active');
      });

		$(document).on('click', '.embla-nav-next', function(event) {
		 	event.preventDefault();
		 
		 	console.log($(this));
		});

		$(document).on('click', '.embla-nav-prev', function(event) {
		 	event.preventDefault();
		
		 	console.log($(this));
		});


	 //    $('#js-mainBannerSlider .embla-nav-next').on('click', embla.scrollNext, function(event) {
		//  	event.preventDefault();
		//  	/* Act on the event */
		//  	console.log($(this));
		// });

	    // dots
	    if (options['dots']) {
		    embla.scrollSnapList().forEach(function(elem, index){
		    	var dot = $('<div class="embla-dot embla-dot-'+index+'" data-index="'+index+'"></div>');
		    	dots.append(dot);
		    	var selectedIndex = embla.selectedScrollSnap();
		    	if (selectedIndex == index) {dot.addClass('active')}
		    	dot.click(function(){
		    		var index = $(this).attr('data-index');
		    		embla.scrollTo(index);
		    	})
		    })
		    embla.on("select", function(){
		    	var selectedIndex = embla.selectedScrollSnap();
		    	_this.find('.embla-dot').removeClass('active');
		    	_this.find('.embla-dot-'+selectedIndex).addClass('active');
		    });
	    }
		}
	})
}

function emblaCarouselWithThumbs(sliderElem, thumbsElem){
	var _this = $(sliderElem);
	if (_this.length) {
		var prevBtn = $('<a class="embla-navs embla-nav-prev"><i class="icon-arrow-left"></i></a>');
		var nextBtn = $('<a class="embla-navs embla-nav-next"><i class="icon-arrow-right"></i></a>');
		_this.wrapInner('<div class="embla__container"></div>');
		_this.wrapInner('<div class="embla__innerWrap"></div>');
		_this.addClass('embla-carousel');
	  var mainCarousel = EmblaCarousel(_this.find('.embla__innerWrap')[0],{
		  selectedClass: "",
		  loop: false
		});
		if (mainCarousel.scrollSnapList().length > 1) {
			_this.append(prevBtn);
			_this.append(nextBtn);
			prevBtn[0].addEventListener('click', mainCarousel.scrollPrev, false);
		  nextBtn[0].addEventListener('click', mainCarousel.scrollNext, false);
	    if (mainCarousel.canScrollPrev()) prevBtn[0].removeAttribute('disabled');
	    else prevBtn[0].setAttribute('disabled', 'disabled');

	    if (mainCarousel.canScrollNext()) nextBtn[0].removeAttribute('disabled');
	    else nextBtn[0].setAttribute('disabled', 'disabled');
		}

		var _thumbsElem = $(thumbsElem);
		_thumbsElem.wrapInner('<div class="embla__container"></div>');
		_thumbsElem.wrapInner('<div class="embla__innerWrap"></div>');
		_thumbsElem.addClass('embla-carousel');
	  var thumbCarousel = EmblaCarousel(_thumbsElem.find('.embla__innerWrap')[0],{
		  selectedClass: "",
		  containScroll: "keepSnaps"
		});

		thumbCarousel.slideNodes().forEach((thumbNode, index) => {
		  thumbNode.addEventListener("click", function(){
		  	onThumbClick(mainCarousel, thumbCarousel, index);
		  });
		});

		const syncThumbCarousel = followMainCarousel(mainCarousel, thumbCarousel);
		mainCarousel.on("select", function(){
			thumbCarousel.scrollTo(mainCarousel.selectedScrollSnap());
		  selectThumbBtn(mainCarousel, thumbCarousel);
		});
		thumbCarousel.on("init", function(){
			thumbCarousel.scrollTo(mainCarousel.selectedScrollSnap());
		  selectThumbBtn(mainCarousel, thumbCarousel);
		});
	}
}

function onThumbClick(mainCarousel, thumbCarousel, index){
  if (!thumbCarousel.clickAllowed()) return;
  mainCarousel.scrollTo(index);
};

function followMainCarousel(mainCarousel, thumbCarousel){
  thumbCarousel.scrollTo(mainCarousel.selectedScrollSnap());
  selectThumbBtn(mainCarousel, thumbCarousel);
};

function selectThumbBtn(mainCarousel, thumbCarousel){
  var previous = mainCarousel.previousScrollSnap();
  var selected = mainCarousel.selectedScrollSnap();
  thumbCarousel.slideNodes()[previous].classList.remove("is-selected");
  thumbCarousel.slideNodes()[selected].classList.add("is-selected");
};