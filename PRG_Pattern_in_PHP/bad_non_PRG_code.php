<?php
if (isset($_POST["submit"])) {
  // If the form is submitted
  // process/evaluate its data
  $word = $_POST["word"];
  if (strlen($word) > 5) {
    echo "Your word is longer than 5 chars.";
  } else {
    echo "You nailed it";
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BAD NON PRG CODE</title>
</head>

<body>
  <!-- Some form -->
  <form action="bad_non_PRG_code.php" method="POST">
    <label for="word">Word:</label>
    <input type="text" name="word" id="word">
    <button type="submit" name="submit">Submit</button>
  </form>
</body>

</html>