<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// -----------------------------------------------------------------------------
// Fast-Drop Shield: Instantly reject bot scans & probes (<0.05ms, 0MB RAM)
// Prevents malicious scanners from waking up Laravel or exhausting PHP workers.
// -----------------------------------------------------------------------------
$rawUri = $_SERVER['REQUEST_URI'] ?? '/';
$rawPath = explode('?', $rawUri, 2)[0];
$path = '/' . ltrim(preg_replace('#/{2,}#', '/', rawurldecode($rawPath)), '/');

if (
    ($path !== '/index.php' && preg_match('/\.(php|asp|aspx|jsp|cgi|env|git|bak|sql|ini|sh|bin)$/i', $path)) ||
    preg_match('#^/(wp-|xmlrpc|\.env|\.git|autoload_classmap|cgi-bin|actuator|telescope|phpmyadmin|pma)#i', $path)
) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not Found';
    exit;
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
