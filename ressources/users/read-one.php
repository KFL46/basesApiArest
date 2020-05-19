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
        
    $query= 'SELECT utilisateur, id FROM utilisateurs WHERE id = ?';
    $sth = $dbh->prepare($query);
    $sth -> bindValue(1,trim($_GET['id']), PDO::PARAM_INT);
    //var_dump($_GET);
    $sth -> execute();
    $users = $sth->fetch();

header('Content-Type: application/json');
echo json_encode($users);

