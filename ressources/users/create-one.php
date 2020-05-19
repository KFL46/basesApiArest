<?php
// on accède à la BDD
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

$utilisateur = trim($_POST['utilisateur']);
$passwordhash = trim($_POST['passwordhash']);
$query = 'INSERT INTO utilisateurs (utilisateur, passwordhash) VALUES (?, ?)';
$sth = $dbh->prepare($query);
$sth->bindValue(1, trim($_POST['utilisateur']), PDO::PARAM_STR);
$sth->bindValue(2, password_hash(trim($_POST['passwordhash']), PASSWORD_BCRYPT), PDO::PARAM_STR);
$sth->execute();
$users=['nom'=>$utilisateur, 'MDP'=>$passwordhash];
//var_dump($_POST);

header('Content-Type: application/json');
echo json_encode($users);
