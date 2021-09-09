<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include '../../phpfiles/beemail.php';
require $req1;
require $req2;
require $req3;

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'ssl://smtp.gmail.com';                   // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $uname;              // SMTP username
    $mail->Password = $pword;                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //No parameters missing
    $control = 0;
    if (!isset($_POST['key']))
        $control++;
    if (!isset($_POST['name']))
        $control++;
    if (!isset($_POST['email']))
        $control++;
    if (!isset($_POST['subject']))
        $control++;
    if (!isset($_POST['message']))
        $control++;

    //If key is valid
    if ($control == 0 && password_verify($key, $_POST['key'])) {

	//Recipients
	$mail->setFrom($email, 'eHive');          //This is the email your form sends From
	$mail->addAddress($_POST['email'], $_POST['name']); // Add a recipient address

	//Content
	$mail->isHTML(true);                                  // Set email format to HTML
	$mail->Subject = $_POST['subject'];
	$mail->Body    = $_POST['message'];

	//Send
	$mail->send();
	echo 'Message has been sent';
    }
} catch (Exception $e) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
?>
