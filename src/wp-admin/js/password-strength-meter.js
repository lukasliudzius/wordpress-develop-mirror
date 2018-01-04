/* global zxcvbn */
window.wp = window.wp || {};

var passwordStrength;
(function($){

	/**
	 * The Password Strength object.
	 *
	 * Contains functions to determine the password strength.
	 *
	 * @since 3.7.0
	 */
	wp.passwordStrength = {
		/**
		 * Determines the strength of a given password.
		 *
		 * @since 3.7.0
		 *
		 * @param {string} password1 The password.
		 * @param {Array} blacklist An array of words that will lower the entropy of the password.
		 * @param {string} password2 The confirmed password.
		 *
		 * @returns {Number} The password strength score.
		 */
		meter : function( password1, blacklist, password2 ) {
			if ( ! $.isArray( blacklist ) )
				blacklist = [ blacklist.toString() ];

			if (password1 != password2 && password2 && password2.length > 0)
				return 5;

			if ( 'undefined' === typeof window.zxcvbn ) {
				// Password strength unknown.
				return -1;
			}

			var result = zxcvbn( password1, blacklist );
			return result.score;
		},

		/**
		 * Builds an array of data that should be penalized.
		 *
		 * Builds an array of data that should be penalized, because it would lower the entropy of a password if it were used.
		 *
		 * @since 3.7.0
		 *
		 * @return {Array} The array of data to be blacklisted.
		 */
		userInputBlacklist : function() {
			var i, userInputFieldsLength, rawValuesLength, currentField,
				rawValues       = [],
				blacklist       = [],
				userInputFields = [ 'user_login', 'first_name', 'last_name', 'nickname', 'display_name', 'email', 'url', 'description', 'weblog_title', 'admin_email' ];

			// Collect all the strings we want to blacklist.
			rawValues.push( document.title );
			rawValues.push( document.URL );

			userInputFieldsLength = userInputFields.length;
			for ( i = 0; i < userInputFieldsLength; i++ ) {
				currentField = $( '#' + userInputFields[ i ] );

				if ( 0 === currentField.length ) {
					continue;
				}

				rawValues.push( currentField[0].defaultValue );
				rawValues.push( currentField.val() );
			}

			// Strip out non-alphanumeric characters and convert each word to an individual entry.
			rawValuesLength = rawValues.length;
			for ( i = 0; i < rawValuesLength; i++ ) {
				if ( rawValues[ i ] ) {
					blacklist = blacklist.concat( rawValues[ i ].replace( /\W/g, ' ' ).split( ' ' ) );
				}
			}

			// Remove empty values, short words and duplicates. Short words are likely to cause many false positives.
			blacklist = $.grep( blacklist, function( value, key ) {
				if ( '' === value || 4 > value.length ) {
					return false;
				}

				return $.inArray( value, blacklist ) === key;
			});

			return blacklist;
		}
	};

	// Backwards compatability.
	passwordStrength = wp.passwordStrength.meter;
})(jQuery);
