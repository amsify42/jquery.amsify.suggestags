<?php
$suggestions 	= ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'];
$data 			= [];

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	foreach($suggestions as $suggestion)
	{
		if(strpos(strtolower($suggestion), strtolower($_POST['term'])) !== false)
		{
			$data[] = $suggestion;	
		}
	}
}
else
{
	foreach($suggestions as $suggestion)
	{
		if(strpos(strtolower($suggestion), strtolower($_GET['term'])) !== false)
		{
			$data[] = $suggestion;	
		}
	}	
}


header('Content-Type: application/json');
echo json_encode(['suggestions' => $data]);


// $suggestions 	= [['tag'=>'India','value'=>34], ['tag'=>'Pakistan','value'=>12], ['tag'=>'Nepal','value'=>43], ['tag'=>'UAE','value'=>11], ['tag'=>'Iran','value'=>21], ['tag'=>'Bangladesh','value'=>22],['tag'=>'Italy','value'=>23], ['tag'=>'Australia','value'=>134]];
// $data 			= [];

// foreach($suggestions as $suggestion)
// {
// 	if(strpos(strtolower($suggestion['tag']), strtolower($_GET['term'])) !== false)	{
// 		$data[] = $suggestion;	
// 	}
// }

// header('Content-Type: application/json');
// echo json_encode(['suggestions' => $data]);


// $suggestions 	= ['India', ['tag'=>'Pakistan','value'=>12], 'Nepal', ['tag'=>'UAE','value'=>11], ['tag'=>'Iran','value'=>21], ['tag'=>'Bangladesh','value'=>22],['tag'=>'Italy','value'=>23], 'Australia'];
// $data 			= [];

// foreach($suggestions as $suggestion)
// {
// 	$value = is_array($suggestion)? $suggestion['tag']: $suggestion;
// 	if(strpos(strtolower($value), strtolower($_GET['term'])) !== false)	{
// 		$data[] = $suggestion;	
// 	}
// }

// header('Content-Type: application/json');
// echo json_encode(['suggestions' => $data]);
 