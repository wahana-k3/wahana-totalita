<?php
// Script to extract the full $cities array from public_html/kota.php

$content = file_get_contents(__DIR__ . '/../public_html/kota.php');

// Extract the $cities definition
if (preg_match('/\$cities\s*=\s*\[(.*?)\];\s*(\/\/ Helper|\$city_key|\$current_month|\$kota|function)/s', $content, $matches)) {
    $cities_code = '$gallery_pool = array_fill(0, 50, "/images/galeri/PELATIHAN DAMKAR.JPG"); $cities = [' . $matches[1] . '];';
    eval($cities_code);
    
    file_put_contents(__DIR__ . '/../src/data/cities.json', json_encode($cities, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    echo "Extracted " . count($cities) . " cities into src/data/cities.json\n";
} else {
    echo "Could not match \$cities array\n";
}
