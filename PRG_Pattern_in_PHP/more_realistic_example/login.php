<?php
session_start();
if (isset($_SESSION["username"])) {
  // Redirect to home page if logged in
  header("Location: home.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>

<body>
  <?php
  if (isset($_SESSION["error"])) {
    // Display login error message
    // if found, and unset it to not
    // show on reload
    echo $_SESSION["error"];
    unset($_SESSION["error"]);
  }
  ?>

  <!-- Login Form -->
  <form action="auth.php" method="post">
    <label for="username">Username:</label>
    <input type="text" name="username" id="username">
    <label for="password">Password:</label>
    <input type="password" name="password" id="password">
    <button type="submit" name="submit">Login</button>
  </form>
</body>

</html>