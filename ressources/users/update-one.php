<?php
parse_str(file_get_contents('php://input'), $dataReceived);
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

if(!array_key_exists('utilisateur', $dataReceived) OR !array_key_exists('passwordhash', $dataReceived))
{
    header($_SERVER['SERVER_PROTOCOL'].' 409 Conflict');
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Champ(s) manquant(s)']);
    exit;
}

$user = trim($dataReceived['utilisateur']);
$password = trim($dataReceived['passwordhash']);

if(empty($user) OR empty($password))
{
    header($_SERVER['SERVER_PROTOCOL'].' 409 Conflict');
    
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Champ(s) vide(s)']);
    exit;
}


$query =
'
    SELECT
        COUNT(*) > 0
    FROM
        Utilisateurs
    WHERE
       utilisateur = :utilisateur
        AND
        id != :id
';
$sth = $dbh->prepare($query);
$sth->bindValue(':utilisateur', $user, PDO::PARAM_STR);
$sth->bindValue(':id', $_GET['id'], PDO::PARAM_INT);
$sth->execute();
$alreadyExistingUtilisateur = boolval($sth->fetchColumn());

if($alreadyExistingUtilisateur)
{
    header($_SERVER['SERVER_PROTOCOL'].' 409 Conflict');
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Utilisateur déjà existant']);
    exit;
}

$query =
'
    UPDATE
        Utilisateurs
    SET
        utilisateur = :utilisateur,
        passwordhash = :passwordhash
    WHERE
        id = :id
';
$sth = $dbh->prepare($query);
$sth->bindValue(':utilisateur', $user, PDO::PARAM_STR);
$sth->bindValue(':passwordhash', password_hash($password, PASSWORD_BCRYPT), PDO::PARAM_STR);
$sth->bindValue(':id', $_GET['id'], PDO::PARAM_INT);
$sth->execute();

if($sth->rowCount() == 0)
{
    header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found');
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Utilisateur inexistant']);
    exit;
}

$user =
[
    'id' => $_GET['id'],
    'utilisateur' => $user
];

header($_SERVER['SERVER_PROTOCOL'].' 200 OK');
header('Content-Type: application/json');
echo json_encode($user);
exit;


