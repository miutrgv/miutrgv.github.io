<?php
        //Keep on top
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;
        include '../../phpfiles/minews.php';

        require $req1;
        require $req2;
        require $req3;


	function sendEmail($fname, $lname, $usr_email, $subject, $body) {
	        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
	        try {
	        	//Server settings
	                $mail->SMTPDebug = 2;                                 // Enable verbose debug output
	                $mail->isSMTP();                                      // Set mailer to use SMTP
	                $mail->Host = 'ssl://smtp.gmail.com';                 // Specify main and backup SMTP servers
	                $mail->SMTPAuth = true;                               // Enable SMTP authentication
	                $mail->Username = $uname;    // SMTP username
	                $mail->Password = $pword;                      // SMTP password
	                $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	                $mail->Port = 465;                                    // TCP port to connect to
	                $mail->SMTPDebug = 0;

	                //Recipients
	                $fullname = $fname . " " . $lname;
	                $mail->setFrom($email123, 'MI@UTRGV');  //This is the email your form sends From
	                $mail->addAddress($usr_email, $fullname); // Add a recipient address

	                //Content
	                $mail->isHTML(true);         // Set email format to HTML
	                $mail->Subject = $subject;
	                $mail->Body = $body;

	                //Send
	                $mail->send();
			return TRUE;

		} catch (Exception $e) {
			return FALSE;
		}
	}
