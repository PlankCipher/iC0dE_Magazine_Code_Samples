<?php
session_start();
if (isset($_SESSION["username"])) {
  // Redirect to home page if logged in
  header("Location: home.php");
} else if (isset($_POST["submit"])) {
  // Else if the form is submitted

  // Imagine that this users array
  // is what you got from a database
  // query :)
  $users = [
    "firstuser" => "thewordpassword",
    "seconduser" => "isareallyunique",
    "anotheruser" => "password"
  ];

  // And is the data from the form
  $username = $_POST["username"];
  $password = $_POST["password"];

  // Some non-sense authentication process
  if (array_key_exists($username, $users)) {
    // If the username is in the users array
    if ($users[$username] == $password) {
      // And the password matches that
      // associated with this user
      // assign username to a session variable
      $_SESSION["username"] = $username;
      // redirect to home page
      header("Location: home.php");
      // and exit to make sure no
      // more code executes
      exit;
    }
  }

  // If any of the credentials is
  // incorrect, the code will fall to
  // here, so put some error message
  // in session variable to get it
  // on login page
  $_SESSION["error"] = "Credentials are incorrect.";
  // and redirect to login page
  header("Location: login.php");
  // and exit to make sure no more
  // code executes
  exit;
} else {
  // If not logged in and form
  // is not submitted, redirect
  // to login page
  header("Location: login.php");
  // and exit to make sure no more
  // code executes
  exit;
}
