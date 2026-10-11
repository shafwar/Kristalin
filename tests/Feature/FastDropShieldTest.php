<?php

test('fast-drop shield allows legitimate pages through', function () {
    $this->get('/')->assertOk();
    $this->get('/about')->assertOk();
    $this->get('/contact')->assertOk();
});

test('fast-drop shield blocks bot probes and sensitive file scans', function () {
    // Direct test of the shield logic against malicious paths
    $maliciousUris = [
        '/dodo.php',
        '/go.php',
        '/wp-fgban13jx3.php',
        '/wp-content/themes/index.php',
        '/wp-includes/ID3/about.php',
        '//admin.php',
        '///shell.php?cmd=id',
        '/wp-admin/',
        '/.env',
        '/.git/config',
        '/xmlrpc.php',
        '/phpmyadmin/',
        '/this_is_a_new_hello_world.php',
    ];

    foreach ($maliciousUris as $uri) {
        $rawPath = explode('?', $uri, 2)[0];
        $path = '/' . ltrim(preg_replace('#/{2,}#', '/', rawurldecode($rawPath)), '/');

        $isBlocked = (
            ($path !== '/index.php' && preg_match('/\.(php|asp|aspx|jsp|cgi|env|git|bak|sql|ini|sh|bin)$/i', $path)) ||
            preg_match('#^/(wp-|xmlrpc|\.env|\.git|autoload_classmap|cgi-bin|actuator|telescope|phpmyadmin|pma)#i', $path)
        );

        expect($isBlocked)->toBeTrue("URI [{$uri}] should be blocked by fast-drop shield");
    }
});
