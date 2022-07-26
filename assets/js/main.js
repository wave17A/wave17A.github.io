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
		var input1 = document.getElementById("txtInput1");
		output1.innerText = slider1.value; // Display the default slider value
		input1.value = slider1.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider1.addEventListener("change", function() {
			const slider1Value = this.value;
			output1.innerText = slider1Value;
			input1.value = slider1Value;
		});
		slider1.oninput = function() {
		output1.innerHTML = this.value;
		} 
	// Slide 2
		var slider2 = document.getElementById("myRange2");
		var output2 = document.getElementById("demo2");
		var input2 = document.getElementById("txtInput2");
		output2.innerText = slider2.value; // Display the default slider value
		input2.value = slider2.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider2.addEventListener("change", function() {
			const slider2Value = this.value;
			output2.innerText = slider2Value;
			input2.value = slider2Value;
		});
		slider2.oninput = function() {
		output2.innerHTML = this.value;
		} 
	// Slide 3
		var slider3 = document.getElementById("myRange3");
		var output3 = document.getElementById("demo3");
		var input3 = document.getElementById("txtInput3");
		output3.innerText = slider3.value; // Display the default slider value
		input3.value = slider3.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider3.addEventListener("change", function() {
			const slider3Value = this.value;
			output3.innerText = slider3Value;
			input3.value = slider3Value;
		});
		slider3.oninput = function() {
		output3.innerHTML = this.value;
		} 
	// Slide 4
		var slider4 = document.getElementById("myRange4");
		var output4 = document.getElementById("demo4");
		var input4 = document.getElementById("txtInput4");
		output4.innerText = slider4.value; // Display the default slider value
		input4.value = slider4.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider4.addEventListener("change", function() {
			const slider4Value = this.value;
			output4.innerText = slider4Value;
			input4.value = slider4Value;
		});
		slider4.oninput = function() {
		output4.innerHTML = this.value;
		} 
	// Slide 5
		var slider5 = document.getElementById("myRange5");
		var output5 = document.getElementById("demo5");
		var input5 = document.getElementById("txtInput5");
		output5.innerText = slider5.value; // Display the default slider value
		input5.value = slider5.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider5.addEventListener("change", function() {
			const slider5Value = this.value;
			output5.innerText = slider5Value;
			input5.value = slider5Value;
		});
		slider5.oninput = function() {
		output5.innerHTML = this.value;
		} 
	// Slide 6
		var slider6 = document.getElementById("myRange6");
		var output6 = document.getElementById("demo6");
		var input6 = document.getElementById("txtInput6");
		output6.innerText = slider6.value; // Display the default slider value
		input6.value = slider6.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider6.addEventListener("change", function() {
			const slider6Value = this.value;
			output6.innerText = slider6Value;
			input6.value = slider6Value;
		});
		slider6.oninput = function() {
		output6.innerHTML = this.value;
		} 
	// Slide 7
		var slider7 = document.getElementById("myRange7");
		var output7 = document.getElementById("demo7");
		var input7 = document.getElementById("txtInput7");
		output7.innerText = slider7.value; // Display the default slider value
		input7.value = slider7.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider7.addEventListener("change", function() {
			const slider7Value = this.value;
			output7.innerText = slider7Value;
			input7.value = slider7Value;
		});
		slider7.oninput = function() {
		output7.innerHTML = this.value;
		}  
	// Slide 8
		var slider8 = document.getElementById("myRange8");
		var output8 = document.getElementById("demo8");
		var input8 = document.getElementById("txtInput8");
		output8.innerText = slider8.value; // Display the default slider value
		input8.value = slider8.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider8.addEventListener("change", function() {
			const slider8Value = this.value;
			output8.innerText = slider8Value;
			input8.value = slider8Value;
		});
		slider8.oninput = function() {
		output8.innerHTML = this.value;
		} 
	// Slide 9
		var slider9 = document.getElementById("myRange9");
		var output9 = document.getElementById("demo9");
		var input9 = document.getElementById("txtInput9");
		output9.innerText = slider9.value; // Display the default slider value
		input9.value = slider9.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider9.addEventListener("change", function() {
			const slider9Value = this.value;
			output9.innerText = slider9Value;
			input9.value = slider9Value;
		});
		slider9.oninput = function() {
		output9.innerHTML = this.value;
		}  
	// Slide 10
		var slider10 = document.getElementById("myRange10");
		var output10 = document.getElementById("demo10");
		var input10 = document.getElementById("txtInput10");
		output10.innerText = slider10.value; // Display the default slider value
		input10.value = slider10.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider10.addEventListener("change", function() {
			const slider10Value = this.value;
			output10.innerText = slider10Value;
			input10.value = slider10Value;
		});
		slider10.oninput = function() {
		output10.innerHTML = this.value;
		} 
	// Slide 11
		var slider11 = document.getElementById("myRange11");
		var output11 = document.getElementById("demo11");
		var input11 = document.getElementById("txtInput11");
		output11.innerText = slider11.value; // Display the default slider value
		input11.value = slider11.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider11.addEventListener("change", function() {
			const slider11Value = this.value;
			output11.innerText = slider11Value;
			input11.value = slider11Value;
		});
		slider11.oninput = function() {
		output11.innerHTML = this.value;
		} 
	// Slide 12
		var slider12 = document.getElementById("myRange12");
		var output12 = document.getElementById("demo12");
		var input12 = document.getElementById("txtInput12");
		output12.innerText = slider12.value; // Display the default slider value
		input12.value = slider12.value;	
		// Update the current slider value (each time you drag the slider handle)
		slider12.addEventListener("change", function() {
			const slider12Value = this.value;
			output12.innerText = slider12Value;
			input12.value = slider12Value;
		});
		slider12.oninput = function() {
		output12.innerHTML = this.value;
		} 

})(jQuery);