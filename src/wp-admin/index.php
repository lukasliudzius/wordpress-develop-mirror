<?php

/** Define ABSPATH as this file's directory */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/../' );
}

define( 'WPINC', 'wp-includes' );
require_once( ABSPATH . WPINC . '/load.php' );

// Standardize $_SERVER variables across setups.
wp_fix_server_vars();

require_once( ABSPATH . WPINC . '/functions.php' );
define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );
require_once( ABSPATH . WPINC . '/version.php' );

wp_check_php_mysql_versions();
wp_load_translations_early();

// Die with an error message
$die  = sprintf(
		/* translators: %1$s: WordPress, %2$s: src, %3$s: build */
			__( 'You seem to be running %1$s from the %2$s directory. %1$s needs to be build and run from the %3$s directory before we can get started.' ),
			'WordPress',
			'<code>src</code>',
			'<code>build</code>'
		) . '</p>';
$die .= '<p>' . sprintf(
	/* translators: %s: WordPress */
		__( 'You can build %s by running:' ),
		'WordPress'
	) . '</p>';
$die .= '<p><code>npm install && grunt build</code></p>';
$die .= '<p>' . sprintf(
	/* translators: %1$s: NPM URL, %2$s: Grunt URL */
		__( 'This requires <a href="%1$s">NPM</a> and <a href="%2$s">Grunt</a>. Need more help? <a href="%3$s">We got it</a>.' ),
		'https://www.npmjs.com/',
		'https://gruntjs.com/',
		__( 'https://codex.wordpress.org/' )
	) . '</p>';

wp_die( $die, __( 'WordPress &rsaquo; Error' ) );
