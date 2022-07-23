/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

	// Slider 1
		var slider1 = document.getElementById("myRange1");
		var output1 = document.getElementById("demo1");
		output1.innerHTML = slider1.value; // Display the default slider value
			
		// Update the current slider value (each time you drag the slider handle)
		slider1.oninput = function() {
			output1.innerHTML = this.value;
		} 
	// Slide 2
		var slider2 = document.getElementById("myRange2");
		var output2 = document.getElementById("demo2");
		output2.innerHTML = slider2.value; // Display the default slider value
			
		// Update the current slider value (each time you drag the slider handle)
		slider2.oninput = function() {
			output2.innerHTML = this.value;
		} 
	// Slide 3
	var slider3 = document.getElementById("myRange3");
	var output3 = document.getElementById("demo3");
	output3.innerHTML = slider3.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider3.oninput = function() {
		output3.innerHTML = this.value;
	} 
	// Slide 4
	var slider4 = document.getElementById("myRange4");
	var output4 = document.getElementById("demo4");
	output4.innerHTML = slider4.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider4.oninput = function() {
		output4.innerHTML = this.value;
	}
	// Slide 5
	var slider5 = document.getElementById("myRange5");
	var output5 = document.getElementById("demo5");
	output5.innerHTML = slider5.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider5.oninput = function() {
		output5.innerHTML = this.value;
	}
	// Slide 6
	var slider6 = document.getElementById("myRange6");
	var output6 = document.getElementById("demo6");
	output6.innerHTML = slider6.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider6.oninput = function() {
		output6.innerHTML = this.value;
	} 
	// Slide 7
	var slider7 = document.getElementById("myRange7");
	var output7 = document.getElementById("demo7");
	output7.innerHTML = slider7.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider7.oninput = function() {
		output7.innerHTML = this.value;
	} 
	// Slide 8
	var slider8 = document.getElementById("myRange8");
	var output8 = document.getElementById("demo8");
	output8.innerHTML = slider8.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider8.oninput = function() {
		output8.innerHTML = this.value;
	} 
	// Slide 9
	var slider9 = document.getElementById("myRange9");
	var output9 = document.getElementById("demo9");
	output9.innerHTML = slider9.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider9.oninput = function() {
		output9.innerHTML = this.value;
	} 
	// Slide 10
	var slider10 = document.getElementById("myRange10");
	var output10 = document.getElementById("demo10");
	output10.innerHTML = slider10.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider10.oninput = function() {
		output10.innerHTML = this.value;
	} 
	// Slide 11
	var slider11 = document.getElementById("myRange11");
	var output11 = document.getElementById("demo11");
	output11.innerHTML = slider11.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider11.oninput = function() {
		output11.innerHTML = this.value;
	} 
	// Slide 12
	var slider12 = document.getElementById("myRange12");
	var output12 = document.getElementById("demo12");
	output12.innerHTML = slider12.value; // Display the default slider value
		
	// Update the current slider value (each time you drag the slider handle)
	slider12.oninput = function() {
		output12.innerHTML = this.value;
	} 
	

})(jQuery);