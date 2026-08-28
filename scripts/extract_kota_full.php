<?php
$code = file_get_contents(__DIR__ . '/../public_html/kota.php');

// Extract gallery pool
$g_start = strpos($code, '$gallery_pool = [');
$g_end = strpos($code, '];', $g_start);
$g_raw = substr($code, $g_start, $g_end - $g_start + 2);
eval($g_raw);

// Extract cities
$c_start = strpos($code, '$cities = [');
$c_end = strpos($code, '];', $c_start);
$c_raw = substr($code, $c_start, $c_end - $c_start + 2);
eval($c_raw);

// Extract programs map
$p_start = strpos($code, '$city_programs_map = [');
$p_end = strpos($code, '];', $p_start);
$p_raw = substr($code, $p_start, $p_end - $p_start + 2);
eval($p_raw);

echo "Extracted " . count($cities) . " cities and " . count($city_programs_map) . " program sets.\n";

$result = [];
foreach ($cities as $key => $city) {
    $slug = 'pelatihan-k3-' . $key;
    $programs = isset($city_programs_map[$key]) ? $city_programs_map[$key] : [];
    
    $result[$slug] = [
        'slug' => $slug,
        'type' => 'city',
        'city_key' => $key,
        'city_name' => $city['name'],
        'province' => $city['province'],
        'title' => $city['title'],
        'desc' => $city['desc'],
        'industries' => $city['industries'],
        'demand' => $city['demand'],
        'highlight' => $city['highlight'],
        'companies' => $city['companies'],
        'nearby' => $city['nearby'],
        'img' => $city['img'],
        'city_type' => $city['type'],
        'programs' => $programs,
        'heading' => "Pelatihan & Sertifikasi K3 {$city['name']}",
        'meta_title' => $city['title'],
        'meta_desc' => $city['desc']
    ];
}

file_put_contents(__DIR__ . '/../src/data/kota_full_data.json', json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
echo "Successfully exported src/data/kota_full_data.json\n";
