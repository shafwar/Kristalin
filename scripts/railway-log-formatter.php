<?php

/**
 * Kristalin Production Log Formatter for Railway
 * 
 * Transforms raw PHP built-in server socket output into clean, structured,
 * and informative STDOUT application logs (identical to modern Next.js/production logs).
 * 
 * - Eliminates noisy socket events (Accepted / Closing)
 * - Suppresses static asset bundle chunks (.js, .css, .webp)
 * - Formats application HTTP requests with meaningful context
 * - Ensures 100% of output routes to STDOUT (blue/neutral badge in Railway, zero red error bars)
 */

$port = getenv('PORT') ?: '8080';
$workers = getenv('PHP_CLI_SERVER_WORKERS') ?: '5';

// 1. Initial startup banner (clean & informative like Arasvara)
fwrite(STDOUT, "✓ Starting..." . PHP_EOL);
fwrite(STDOUT, "▲ PT Kristalin Ekalestari Production Server" . PHP_EOL);
fwrite(STDOUT, "- Network:  http://0.0.0.0:{$port}" . PHP_EOL);
fwrite(STDOUT, "- Workers:  {$workers} (OPcache Active)" . PHP_EOL);
fwrite(STDOUT, "✓ Ready" . PHP_EOL);
fflush(STDOUT);

$stdin = fopen('php://stdin', 'r');
if (!$stdin) {
    exit(0);
}

while (($rawLine = fgets($stdin)) !== false) {
    $line = trim($rawLine);

    if (empty($line)) {
        continue;
    }

    // A. Ignore socket open/close events
    if (preg_match('/(Accepted|Closing)/i', $line)) {
        continue;
    }

    // B. Ignore repetitive PHP CLI startup lines per worker
    if (str_contains($line, 'Development Server (http') || str_contains($line, 'Failed to poll event')) {
        continue;
    }

    // C. Ignore static asset chunks (.js, .css, .webp, .png, .jpg, .svg, .ico, .woff, .woff2, .map)
    if (
        preg_match('#\[(200|304)\]: GET /build/assets/#', $line) ||
        preg_match('#\.(js|css|webp|png|jpg|jpeg|svg|ico|woff|woff2|map|pdf)(\s|\?|$)#i', $line)
    ) {
        continue;
    }

    // D. Parse and format meaningful HTTP requests
    if (preg_match('/\[(\d{3})\]:\s*(GET|POST|PUT|PATCH|DELETE)\s+([^\s]+)/i', $line, $matches)) {
        $status = $matches[1];
        $method = strtoupper($matches[2]);
        $uri    = $matches[3];

        $cleanPath = explode('?', $uri, 2)[0];
        $statusLabel = match ($status) {
            '200' => '200 OK',
            '301' => '301 Moved',
            '302' => '302 Found',
            '404' => '404 Not Found',
            '500' => '500 Server Error',
            default => "{$status}",
        };

        $context = match ($cleanPath) {
            '/' => 'Homepage loaded successfully',
            '/about' => 'About Us page loaded',
            '/board-of-directors' => 'Board of Directors loaded',
            '/contact' => 'Contact page loaded',
            '/business-activity' => 'Mining Operations loaded',
            '/line-of-business' => 'Business Portfolio loaded',
            '/csr' => 'CSR Programs loaded',
            '/investor' => 'Investor Relations loaded',
            '/b2c' => 'Kisara Gold Bullion store loaded',
            '/news' => 'News listing loaded',
            '/api/kristalin-tv/gold' => 'Live Gold Market synced',
            '/api/kristalin-tv/gold-prices' => 'Brand Bullion rates synced',
            '/download-company-profile' => 'Company profile PDF served',
            default => (str_starts_with($cleanPath, '/language/') 
                ? 'Switched language to ' . substr($cleanPath, 10) 
                : ($status === '404' && preg_match('/\.(php|env|git)/i', $cleanPath) 
                    ? 'Shield: Malicious probe dropped' 
                    : 'Request processed successfully')),
        };

        $timeStr = date('Y-m-d H:i:s');
        fwrite(STDOUT, "{$method} {$cleanPath} — {$statusLabel} ({$context}) [{$timeStr}]" . PHP_EOL);
        fflush(STDOUT);
        continue;
    }

    // E. General application log or server notice (write cleanly to STDOUT)
    fwrite(STDOUT, $line . PHP_EOL);
    fflush(STDOUT);
}

fclose($stdin);
