<?php
// Initialize session data
session_start();
if (isset($_POST["submit"])) {
  // If the form is submitted
  // process/evaluate its data
  $word = $_POST["word"];
  if (strlen($word) > 5) {
    // You can use either SESSION
    // or URL Params to pass messages
    // to the new page
    $_SESSION["message"] = "Your word is longer than 5 chars.";
  } else {
    $_SESSION["message"] = "You nailed it";
  }
  // Redirect the user to the new page
  // in this case it is the same one
  header("Location: good_PRG_code.php");
  // Exit to make sure no more
  // code gets executed
  exit;
}

// If you use SESSION to save the message
// you would have to get it back when
// the page loads on the GET request
if (isset($_SESSION["message"])) {
  echo $_SESSION["message"];
  unset($_SESSION["message"]);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GOOD PRG CODE</title>
</head>

<body>
  <!-- Some form -->
  <form action="good_PRG_code.php" method="POST">
    <label for="word">Word:</label>
    <input type="text" name="word" id="word">
    <button type="submit" name="submit">Submit</button>
  </form>
</body>

</html>