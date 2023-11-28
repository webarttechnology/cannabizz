<?php

/**

 * The base configuration for WordPress

 *

 * The wp-config.php creation script uses this file during the installation.

 * You don't have to use the web site, you can copy this file to "wp-config.php"

 * and fill in the values.

 *

 * This file contains the following configurations:

 *

 * * Database settings

 * * Secret keys

 * * Database table prefix

 * * ABSPATH

 *

 * @link https://wordpress.org/support/article/editing-wp-config-php/

 *

 * @package WordPress

 */



// ** Database settings - You can get this info from your web host ** //

/** The name of the database for WordPress */

define( 'DB_NAME', 'cannabis' );



/** Database username */

define( 'DB_USER', 'root' );



/** Database password */

define( 'DB_PASSWORD', '' );



/** Database hostname */

define( 'DB_HOST', 'localhost' );



/** Database charset to use in creating database tables. */

define( 'DB_CHARSET', 'utf8mb4' );



/** The database collate type. Don't change this if in doubt. */

define( 'DB_COLLATE', '' );



/**#@+

 * Authentication unique keys and salts.

 *

 * Change these to different unique phrases! You can generate these using

 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.

 *

 * You can change these at any point in time to invalidate all existing cookies.

 * This will force all users to have to log in again.

 *

 * @since 2.6.0

 */

define( 'AUTH_KEY',         'D%h}a<MCt&Ao8`%>z~17Qxn+5F X(qpER-7+Y^lDv05tMzVypas`W3~-t-r!oja[' );

define( 'SECURE_AUTH_KEY',  'B%)[T@EV`74$7!B9)Wx+EyR>#+-/*bH*wIR-}`fQ13Yy!$L|(7{KSZ-:*{,8*WOI' );

define( 'LOGGED_IN_KEY',    'SX]vpvUMx+v7bF}rAh~8jlYaO2j:>=1:LiI#ZR5(j>vBi`XO{2N2t~lR~m* VM[y' );

define( 'NONCE_KEY',        'qrf2Z/NauXgLb7ecAC/jAl<uF9Y5F :4jTeLv2G!}AA2ief?fDD~lt SI5I{0~3(' );

define( 'AUTH_SALT',        'T{I%xg twaTak7#ywi2(>AI8)n|f42kr.GX[<H6T{[`GI8vvT?j@?67@2C_)Z~a<' );

define( 'SECURE_AUTH_SALT', '_Ci;O-K?hA)I*yOG`o<8w|Cw9&A<z2j0]{a`pM(D|VL=+!~]HZVK&)`d_G$5#_:+' );

define( 'LOGGED_IN_SALT',   'U>IWAwwXpthLkewtP~#^)W)S=T<RVOLeSCk5  F|bsKWB maA<-~+C1/_zPw5b?j' );

define( 'NONCE_SALT',       '#v!C)Ee==t[9_4{V$Ss@<r9h_F`} j12MF9c0qhad`Yowyz._~gobpbrhHTUh d5' );



/**#@-*/



/**

 * WordPress database table prefix.

 *

 * You can have multiple installations in one database if you give each

 * a unique prefix. Only numbers, letters, and underscores please!

 */

$table_prefix = 'wp_';



/**

 * For developers: WordPress debugging mode.

 *

 * Change this to true to enable the display of notices during development.

 * It is strongly recommended that plugin and theme developers use WP_DEBUG

 * in their development environments.

 *

 * For information on other constants that can be used for debugging,

 * visit the documentation.

 *

 * @link https://wordpress.org/support/article/debugging-in-wordpress/

 */

define( 'WP_DEBUG', false );
//define( 'WP_DEBUG', true );



/* Add any custom values between this line and the "stop editing" line. */







/* That's all, stop editing! Happy publishing. */



/** Absolute path to the WordPress directory. */

if ( ! defined( 'ABSPATH' ) ) {

	define( 'ABSPATH', __DIR__ . '/' );

}



/** Sets up WordPress vars and included files. */

require_once ABSPATH . 'wp-settings.php';

