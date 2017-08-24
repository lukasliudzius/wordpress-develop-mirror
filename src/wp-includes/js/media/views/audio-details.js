var MediaDetails = wp.media.view.MediaDetails,
	AudioDetails;

/**
 * This view represents the details of an audio attachment.
 * It allows previewing the audio file, managing multiple sources and setting preload, autoplay and loop settings.
 *
 * @memberOf wp.media.view
 *
 * @class
 * @augments wp.media.view.MediaDetails
 *
 * @property {string} className The class of this element.
 * @property {template} template The template of this view/.
 */
AudioDetails = MediaDetails.extend(/** @lends wp.media.view.AudioDetails.prototype */{
	className: 'audio-details',
	template:  wp.template('audio-details'),

	/**
	 * If the audio element in this view has a source then show it and prepare it's source.
	 * If the audio element does not have a source then hide it.
	 *
	 * @see wp.media.view.MediaDetails.prepareSrc
	 *
	 * @returns {wp.media.view.AudioDetails} This view to allow method chaining.
	 */
	setMedia: function() {
		var audio = this.$('.wp-audio-shortcode');

		if ( audio.find( 'source' ).length ) {
			if ( audio.is(':hidden') ) {
				audio.show();
			}
			this.media = MediaDetails.prepareSrc( audio.get(0) );
		} else {
			audio.hide();
			this.media = false;
		}

		return this;
	}
});

module.exports = AudioDetails;
