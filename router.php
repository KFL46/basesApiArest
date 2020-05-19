<?php

     //var_dump($_SERVER['REQUEST_METHOD'], $_GET);

    //    GET /{ressources}[/{id}]
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        //    GET /{ressources}/{id}
        if(array_key_exists('id', $_GET))
        {
            $filePath = 'ressources/'.$_GET['resource'].'/read-one.php';
        }
        //    GET /{ressources}
        else
        {
            $filePath = 'ressources/'.$_GET['resource'].'/read-many.php';
        }
    }
    //    POST /{ressources}
    elseif($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $filePath = 'ressources/'.$_GET['resource'].'/create-one.php';
    }
    //    PUT /{ressources}/{id}
    elseif($_SERVER['REQUEST_METHOD'] == 'PUT' AND array_key_exists('id', $_GET))
    {
        $filePath = 'ressources/'.$_GET['resource'].'/update-one.php';
    }
    //    DELETE /{ressources}/{id}
    elseif($_SERVER['REQUEST_METHOD'] == 'DELETE' AND array_key_exists('id', $_GET))
    {
        $filePath = 'ressources/'.$_GET['resource'].'/delete-one.php';
    }

    if(isset($filePath) AND file_exists($filePath))
    {
        include $filePath;
    }
    else
    {
        echo 'KO !';
    }