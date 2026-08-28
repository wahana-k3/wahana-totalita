<?php
// Test rendering a city page via kota.php
$_GET['kota'] = 'surabaya';
ob_start();
require __DIR__ . '/../public_html/kota.php';
$html = ob_get_clean();

echo "Rendered Surabaya HTML length: " . strlen($html) . "\n";
echo "Preview:\n" . substr($html, 0, 500) . "\n";
