<?php
 
 $dbh = new PDO
 (
     'mysql:host=localhost;dbname=petitesannonces;charset=utf8',
     'root',
     '',
     [
         PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
         PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
     ]
 );


        $sql = "DELETE FROM utilisateurs WHERE id = ?";
        $sth = $dbh->prepare($sql);
        $sth->bindValue(1,($_GET['id']), PDO::PARAM_INT);
        $sth->execute();

        if($sth->rowCount() == 0)
        {
            header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found');
            header('Content-Type: application/json');
            echo json_encode(['message' => 'Utilisateur inexistant']);
            exit;
        }

        header($_SERVER['SERVER_PROTOCOL'].' 204 No Content');

        exit;


