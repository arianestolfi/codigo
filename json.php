<?php
// O Curl irá fazer uma requisição para a API do Vimeo
// e irá receber o JSON com as informações do vídeo.
$curl = curl_init("http://vimeo.com/api/oembed.json?url=http://vimeo.com/13211055");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$json = curl_exec($curl);
curl_close($curl);



?>