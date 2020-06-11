<?php
session_start();
if (!isset($_SESSION["username"])) {
  // Redirect to login page if
  // not logged in
  header("Location: login.php");
  exit;
}

echo "Welcome, " . $_SESSION["username"];
