var path        	= require( 'path' ),
	webpack       	= require( 'webpack' ),
	manual_packages = {},
	npm_packages  	= {},
	admin_files   	= {},
	include_files 	= {};

manual_packages = {
	// @see https://github.com/mattfarina/farbtastic
	'src/wp-admin/js/farbtastic.js': ['./js/enqueues/wp-vendor/farbtastic.js'],
	// @see https://github.com/Automattic/Iris
	'src/wp-admin/js/iris.min.js': ['./js/enqueues/wp-vendor/iris.min.js'],
	// @see http://www.mattkruse.com/javascript/colorpicker/
	'src/wp-includes/js/colorpicker.js': ['./js/enqueues/wp-vendor/colorpicker.js'],
	// @see https://github.com/tzuryby/jquery.hotkeys
	'src/wp-includes/js/jquery/jquery.hotkeys.js': ['./js/enqueues/wp-vendor/jquery.hotkeys.js'],
	'src/wp-includes/js/jquery/jquery.hotkeys.min.js': ['./js/enqueues/wp-vendor/jquery.hotkeys.min.js'],
	// @see Old version for BC purposes, can't include two versions with NPM.
	'src/wp-includes/js/jquery/jquery.masonry.js': ['./js/enqueues/wp-vendor/jquery.masonry.js'],
	'src/wp-includes/js/jquery/jquery.masonry.min.js': ['./js/enqueues/wp-vendor/jquery.masonry.min.js'],
	// @see https://github.com/blairmitchelmore/jquery.plugins/blob/master/jquery.query.js
	'src/wp-includes/js/jquery/jquery.query.js': ['./js/enqueues/wp-vendor/jquery.query.js'],
	// @see Origin unknown.
	'src/wp-includes/js/jquery/jquery.schedule.js': ['./js/enqueues/wp-vendor/jquery.schedule.js'],
	// @see https://github.com/cowboy/jquery-misc/blob/master/jquery.ba-serializeobject.js
	'src/wp-includes/js/jquery/jquery.serialize-object.js': ['./js/enqueues/wp-vendor/jquery.serialize-object.js'],
	// @see Origin unkown.
	'src/wp-includes/js/jquery/jquery.table-hotkeys.js': ['./js/enqueues/wp-vendor/jquery.table-hotkeys.js'],
	'src/wp-includes/js/jquery/jquery.table-hotkeys.min.js': ['./js/enqueues/wp-vendor/jquery.table-hotkeys.min.js'],
	// @see https://github.com/furf/jquery-ui-touch-punch/blob/master/jquery.ui.touch-punch.js
	'src/wp-includes/js/jquery/jquery.ui.touch-punch.js': ['./js/enqueues/wp-vendor/jquery.ui.touch-punch.js'],
	// @see Origin unknown.
	'src/wp-includes/js/jquery/suggest.js': ['./js/enqueues/wp-vendor/deprecated/suggest.js'],
	'src/wp-includes/js/jquery/suggest.min.js': ['./js/enqueues/wp-vendor/deprecated/suggest.min.js'],
	// @see https://github.com/douglascrockford/JSON-js
	'src/wp-includes/js/json2.js': ['./js/enqueues/wp-vendor/json2.js'],
	// @see https://github.com/swfobject/swfobject
	'src/wp-includes/js/swfobject.js': ['./js/enqueues/wp-vendor/swfobject.js'],
	// @see https://github.com/abritinthebay/simpleajaxcodekit
	'src/wp-includes/js/tw-sack.js': ['./js/enqueues/wp-vendor/tw-sack.js'],
};

npm_packages = {
	'src/wp-includes/js/backbone.js': ['./node_modules/backbone/backbone.js'],
	'src/wp-includes/js/backbone.min.js': ['./node_modules/backbone/backbone-min.js'],
	'src/wp-includes/js/hoverIntent.js': ['./node_modules/jquery-hoverintent/jquery.hoverIntent.js'],
	'src/wp-includes/js/imagesloaded.min.js': ['./node_modules/imagesloaded/imagesloaded.pkgd.min.js'],
	'src/wp-includes/js/jquery/jquery-migrate.js': ['./node_modules/jquery-migrate/dist/jquery-migrate.js'],
	'src/wp-includes/js/jquery/jquery-migrate.min.js': ['./node_modules/jquery-migrate/dist/jquery-migrate.min.js'],
	'src/wp-includes/js/jquery/jquery.color.min.js': ['./node_modules/jquery-color/dist/jquery.color.plus-names.min.js'],
	'src/wp-includes/js/jquery/jquery.form.js': ['./node_modules/jquery-form/src/jquery.form.js'],
	'src/wp-includes/js/jquery/jquery.form.min.js': ['./node_modules/jquery-form/dist/jquery.form.min.js'],
	'src/wp-includes/js/jquery/jquery.js': ['./node_modules/jquery/dist/jquery.min.js'],
	'src/wp-includes/js/jquery/ui/accordion.js': ['./node_modules/jquery-ui/ui/accordion.js'],
	'src/wp-includes/js/jquery/ui/autocomplete.js': ['./node_modules/jquery-ui/ui/autocomplete.js'],
	'src/wp-includes/js/jquery/ui/button.js': ['./node_modules/jquery-ui/ui/button.js'],
	'src/wp-includes/js/jquery/ui/core.js': ['./node_modules/jquery-ui/ui/core.js'],
	'src/wp-includes/js/jquery/ui/datepicker.js': ['./node_modules/jquery-ui/ui/datepicker.js'],
	'src/wp-includes/js/jquery/ui/dialog.js': ['./node_modules/jquery-ui/ui/dialog.js'],
	'src/wp-includes/js/jquery/ui/draggable.js': ['./node_modules/jquery-ui/ui/draggable.js'],
	'src/wp-includes/js/jquery/ui/droppable.js': ['./node_modules/jquery-ui/ui/droppable.js'],
	'src/wp-includes/js/jquery/ui/effect-blind.js': ['./node_modules/jquery-ui/ui/effect-blind.js'],
	'src/wp-includes/js/jquery/ui/effect-bounce.js': ['./node_modules/jquery-ui/ui/effect-bounce.js'],
	'src/wp-includes/js/jquery/ui/effect-clip.js': ['./node_modules/jquery-ui/ui/effect-clip.js'],
	'src/wp-includes/js/jquery/ui/effect-drop.js': ['./node_modules/jquery-ui/ui/effect-drop.js'],
	'src/wp-includes/js/jquery/ui/effect-explode.js': ['./node_modules/jquery-ui/ui/effect-explode.js'],
	'src/wp-includes/js/jquery/ui/effect-fade.js': ['./node_modules/jquery-ui/ui/effect-fade.js'],
	'src/wp-includes/js/jquery/ui/effect-fold.js': ['./node_modules/jquery-ui/ui/effect-fold.js'],
	'src/wp-includes/js/jquery/ui/effect-highlight.js': ['./node_modules/jquery-ui/ui/effect-highlight.js'],
	'src/wp-includes/js/jquery/ui/effect-puff.js': ['./node_modules/jquery-ui/ui/effect-puff.js'],
	'src/wp-includes/js/jquery/ui/effect-pulsate.js': ['./node_modules/jquery-ui/ui/effect-pulsate.js'],
	'src/wp-includes/js/jquery/ui/effect-scale.js': ['./node_modules/jquery-ui/ui/effect-scale.js'],
	'src/wp-includes/js/jquery/ui/effect-shake.js': ['./node_modules/jquery-ui/ui/effect-shake.js'],
	'src/wp-includes/js/jquery/ui/effect-size.js': ['./node_modules/jquery-ui/ui/effect-size.js'],
	'src/wp-includes/js/jquery/ui/effect-slide.js': ['./node_modules/jquery-ui/ui/effect-slide.js'],
	'src/wp-includes/js/jquery/ui/effect-transfer.js': ['./node_modules/jquery-ui/ui/effect-transfer.js'],
	'src/wp-includes/js/jquery/ui/effect.js': ['./node_modules/jquery-ui/ui/effect.js'],
	'src/wp-includes/js/jquery/ui/menu.js': ['./node_modules/jquery-ui/ui/menu.js'],
	'src/wp-includes/js/jquery/ui/mouse.js': ['./node_modules/jquery-ui/ui/mouse.js'],
	'src/wp-includes/js/jquery/ui/position.js': ['./node_modules/jquery-ui/ui/position.js'],
	'src/wp-includes/js/jquery/ui/progressbar.js': ['./node_modules/jquery-ui/ui/progressbar.js'],
	'src/wp-includes/js/jquery/ui/resizable.js': ['./node_modules/jquery-ui/ui/resizable.js'],
	'src/wp-includes/js/jquery/ui/selectable.js': ['./node_modules/jquery-ui/ui/selectable.js'],
	'src/wp-includes/js/jquery/ui/selectmenu.js': ['./node_modules/jquery-ui/ui/selectmenu.js'],
	'src/wp-includes/js/jquery/ui/slider.js': ['./node_modules/jquery-ui/ui/slider.js'],
	'src/wp-includes/js/jquery/ui/sortable.js': ['./node_modules/jquery-ui/ui/sortable.js'],
	'src/wp-includes/js/jquery/ui/spinner.js': ['./node_modules/jquery-ui/ui/spinner.js'],
	'src/wp-includes/js/jquery/ui/tabs.js': ['./node_modules/jquery-ui/ui/tabs.js'],
	'src/wp-includes/js/jquery/ui/tooltip.js': ['./node_modules/jquery-ui/ui/tooltip.js'],
	'src/wp-includes/js/jquery/ui/widget.js': ['./node_modules/jquery-ui/ui/widget.js'],
	'src/wp-includes/js/masonry.min.js': ['./node_modules/masonry-layout/dist/masonry.pkgd.min.js'],
	'src/wp-includes/js/twemoji.js': ['./node_modules/twemoji/2/twemoji.js'],
	'src/wp-includes/js/underscore.js': ['./node_modules/underscore/underscore.js'],
	'src/wp-includes/js/underscore.min.js': ['./node_modules/underscore/underscore-min.js'],
	'src/wp-includes/js/zxcvbn.min.js': ['./node_modules/zxcvbn/dist/zxcvbn.js'],
}

admin_files = {
	'src/wp-admin/js/accordion.js': ['./js/enqueues/lib/accordion.js'],
	'src/wp-admin/js/code-editor.js': ['./js/enqueues/wp/code-editor.js'],
	'src/wp-admin/js/color-picker.js': ['./js/enqueues/lib/color-picker.js'],
	'src/wp-admin/js/comment.js': ['./js/enqueues/scripts/admin/comment.js'],
	'src/wp-admin/js/common.js': ['./js/enqueues/scripts/admin/common.js'],
	'src/wp-admin/js/custom-background.js': ['./js/enqueues/scripts/admin/custom-background.js'],
	'src/wp-admin/js/custom-header.js': ['./js/enqueues/scripts/admin/custom-header.js'],
	'src/wp-admin/js/customize-controls.js': ['./js/enqueues/wp/customize/controls.js'],
	'src/wp-admin/js/customize-nav-menus.js': ['./js/enqueues/wp/customize/nav-menus.js'],
	'src/wp-admin/js/customize-widgets.js': ['./js/enqueues/wp/customize/widgets.js'],
	'src/wp-admin/js/dashboard.js': ['./js/enqueues/wp/dashboard.js'],
	'src/wp-admin/js/edit-comments.js': ['./js/enqueues/scripts/admin/edit-comments.js'],
	'src/wp-admin/js/editor-expand.js': ['./js/enqueues/wp/editor/dfw.js'],
	'src/wp-admin/js/editor.js': ['./js/enqueues/wp/editor/base.js'],
	'src/wp-admin/js/gallery.js': ['./js/enqueues/lib/gallery.js'],
	'src/wp-admin/js/image-edit.js': ['./js/enqueues/lib/image-edit.js'],
	'src/wp-admin/js/inline-edit-post.js': ['./js/enqueues/scripts/admin/inline-edit-post.js'],
	'src/wp-admin/js/inline-edit-tax.js': ['./js/enqueues/scripts/admin/inline-edit-tax.js'],
	'src/wp-admin/js/language-chooser.js': ['./js/enqueues/lib/language-chooser.js'],
	'src/wp-admin/js/link.js': ['./js/enqueues/scripts/admin/link.js'],
	'src/wp-admin/js/media-gallery.js': ['./js/enqueues/deprecated/media-gallery.js'],
	'src/wp-admin/js/media-upload.js': ['./js/enqueues/scripts/admin/media-upload.js'],
	'src/wp-admin/js/media.js': ['./js/enqueues/scripts/admin/media.js'],
	'src/wp-admin/js/nav-menu.js': ['./js/enqueues/lib/nav-menu.js'],
	'src/wp-admin/js/password-strength-meter.js': ['./js/enqueues/wp/password-strength-meter.js'],
	'src/wp-admin/js/plugin-install.js': ['./js/enqueues/scripts/admin/plugin-install.js'],
	'src/wp-admin/js/post.js': ['./js/enqueues/scripts/admin/post.js'],
	'src/wp-admin/js/postbox.js': ['./js/enqueues/scripts/admin/postbox.js'],
	'src/wp-admin/js/revisions.js': ['./js/enqueues/wp/revisions.js'],
	'src/wp-admin/js/set-post-thumbnail.js': ['./js/enqueues/scripts/admin/set-post-thumbnail.js'],
	'src/wp-admin/js/svg-painter.js': ['./js/enqueues/wp/svg-painter.js'],
	'src/wp-admin/js/tags-box.js': ['./js/enqueues/scripts/admin/tags-box.js'],
	'src/wp-admin/js/tags-suggest.js': ['./js/enqueues/scripts/admin/tags-suggest.js'],
	'src/wp-admin/js/tags.js': ['./js/enqueues/scripts/admin/tags.js'],
	'src/wp-admin/js/theme-plugin-editor.js': ['./js/enqueues/wp/theme-plugin-editor.js'],
	'src/wp-admin/js/theme.js': ['./js/enqueues/wp/theme.js'],
	'src/wp-admin/js/updates.js': ['./js/enqueues/wp/updates.js'],
	'src/wp-admin/js/user-profile.js': ['./js/enqueues/scripts/admin/user-profile.js'],
	'src/wp-admin/js/user-suggest.js': ['./js/enqueues/lib/user-suggest.js'],
	'src/wp-admin/js/widgets/custom-html-widgets.js': ['./js/enqueues/wp/widgets/custom-html.js'],
	'src/wp-admin/js/widgets/media-audio-widget.js': ['./js/enqueues/wp/widgets/media-audio.js'],
	'src/wp-admin/js/widgets/media-gallery-widget.js': ['./js/enqueues/wp/widgets/media-gallery.js'],
	'src/wp-admin/js/widgets/media-image-widget.js': ['./js/enqueues/wp/widgets/media-image.js'],
	'src/wp-admin/js/widgets/media-video-widget.js': ['./js/enqueues/wp/widgets/media-video.js'],
	'src/wp-admin/js/widgets/media-widgets.js': ['./js/enqueues/wp/widgets/media.js'],
	'src/wp-admin/js/widgets/text-widgets.js': ['./js/enqueues/wp/widgets/text.js'],
	'src/wp-admin/js/widgets.js': ['./js/enqueues/scripts/admin/widgets.js'],
	'src/wp-admin/js/word-count.js': ['./js/enqueues/wp/utils/word-count.js'],
	'src/wp-admin/js/wp-fullscreen-stub.js': ['./js/enqueues/deprecated/fullscreen-stub.js'],
	'src/wp-admin/js/xfn.js': ['./js/enqueues/admin/scripts/xfn.js'],
};

include_files = {
	'src/wp-includes/js/admin-bar.js': ['./js/enqueues/admin-bar.js'],
	'src/wp-includes/js/api-request.js': ['./js/enqueues/wp/api-request.js'],
	'src/wp-includes/js/autosave.js': ['./js/enqueues/wp/autosave.js'],
	'src/wp-includes/js/comment-reply.js': ['./js/enqueues/lib/comment-reply.js'],
	'src/wp-includes/js/customize-base.js': ['./js/enqueues/wp/customize/base.js'],
	'src/wp-includes/js/customize-loader.js': ['./js/enqueues/wp/customize/loader.js'],
	'src/wp-includes/js/customize-models.js': ['./js/enqueues/wp/customize/models.js'],
	'src/wp-includes/js/customize-preview-nav-menus.js': ['./js/enqueues/wp/customize/preview-nav-menus.js'],
	'src/wp-includes/js/customize-preview-widgets.js': ['./js/enqueues/wp/customize/preview-widgets.js'],
	'src/wp-includes/js/customize-preview.js': ['./js/enqueues/wp/customize/preview.js'],
	'src/wp-includes/js/customize-selective-refresh.js': ['./js/enqueues/wp/customize/selective-refresh.js'],
	'src/wp-includes/js/customize-views.js': ['./js/enqueues/wp/customize/views.js'],
	'src/wp-includes/js/heartbeat.js': ['./js/enqueues/wp/heartbeat.js'],
	'src/wp-includes/js/mce-view.js': ['./js/enqueues/wp/mce-view.js'],
	'src/wp-includes/js/media-audiovideo.js': ['./js/enqueues/wp/media/audiovideo.js'],
	'src/wp-includes/js/media-editor.js': ['./js/enqueues/wp/media-editor.js'],
	'src/wp-includes/js/media-grid.js': ['./js/enqueues/wp/media/grid.js'],
	'src/wp-includes/js/media-models.js': ['./js/enqueues/wp/media/models.js'],
	'src/wp-includes/js/media-views.js': ['./js/enqueues/wp/media/views.js'],
	'src/wp-includes/js/quicktags.js': ['./js/enqueues/lib/quicktags.js'],
	'src/wp-includes/js/shortcode.js': ['./js/enqueues/wp/shortcode.js'],
	'src/wp-includes/js/utils.js': ['./js/enqueues/lib/cookies.js'],
	'src/wp-includes/js/wp-a11y.js': ['./js/enqueues/wp/a11y.js'],
	'src/wp-includes/js/wp-ajax-response.js': ['./js/enqueues/lib/ajax-response.js'],
	'src/wp-includes/js/wp-api.js': ['./js/enqueues/wp/api.js'],
	'src/wp-includes/js/wp-auth-check.js': ['./js/enqueues/lib/auth-check.js'],
	'src/wp-includes/js/wp-backbone.js': ['./js/enqueues/wp/backbone.js'],
	'src/wp-includes/js/wp-custom-header.js': ['./js/enqueues/wp/custom-header.js'],
	'src/wp-includes/js/wp-embed-template.js': ['./js/enqueues/lib/embed-template.js'],
	'src/wp-includes/js/wp-embed.js': ['./js/enqueues/wp/embed.js'],
	'src/wp-includes/js/wp-emoji-loader.js': ['./js/enqueues/lib/emoji-loader.js'],
	'src/wp-includes/js/wp-emoji.js': ['./js/enqueues/wp/emoji.js'],
	'src/wp-includes/js/wp-list-revisions.js': ['./js/enqueues/lib/list-revisions.js'],
	'src/wp-includes/js/wp-lists.js': ['./js/enqueues/lib/lists.js'],
	'src/wp-includes/js/wp-pointer.js': ['./js/enqueues/lib/pointer.js'],
	'src/wp-includes/js/wp-sanitize.js': ['./js/enqueues/wp/sanitize.js'],
	'src/wp-includes/js/wp-util.js': ['./js/enqueues/wp/util.js'],
	'src/wp-includes/js/wpdialog.js': ['./js/enqueues/lib/dialog.js'],
	'src/wp-includes/js/wplink.js': ['./js/enqueues/lib/link.js'],
	'src/wp-includes/js/zxcvbn-async.js': ['./js/enqueues/lib/zxcvbn-async.js']
};

//
// include_dirs = {
// 	'src/wp-includes/js/codemirror': ['./js/enqueues/codemirror'],
// 	'src/wp-includes/js/crop': ['./js/enqueues/crop'],
// 	'src/wp-includes/js/imgareaselect': ['./js/enqueues/imgareaselect'],
// 	'src/wp-includes/js/jcrop': ['./js/enqueues/jcrop'],
// 	'src/wp-includes/js/jquery': ['./js/enqueues/jquery'],
// 	'src/wp-includes/js/mediaelement': ['./js/enqueues/mediaelement'],
// 	@see https://www.npmjs.com/package/plupload
// 	'src/wp-includes/js/plupload': ['./js/enqueues/plupload'],
// 	'src/wp-includes/js/swfupload': ['./js/enqueues/swfupload'],
// 	'src/wp-includes/js/thickbox': ['./js/enqueues/thickbox'],
// 	'src/wp-includes/js/tinymce': ['./js/enqueues/tinymce'],
// }

module.exports = [
	{
		cache: true,
		watch: true,
		entry: Object.assign( npm_packages, admin_files, include_files ),
		output: {
			filename: '[name]',
		}
	},
	{
		cache: true,
		watch: true,
		entry: {
			'src/wp-includes/js/wp-a11y.js': ['@wordpress/a11y']
		},
		output: {
			filename: 'src/wp-includes/js/wp-a11y.js',
			library: [ 'wp', 'a11y', 'speak' ],
		}
	}
];
