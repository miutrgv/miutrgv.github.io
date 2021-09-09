<?php

if ( isset($_POST['login']) || isset($_POST['send-code']) || isset($_POST['vcode-verify']) || isset($_POST['close-verify']) ) {

        //Keep on top
	require '../../phpfiles/mimail.php';
	require '../../phpfiles/homedb.inc.php';
	session_start();

	/* -------- Buttons ---------- */

	//Login button
	if ( isset($_POST['login']) ) {

		//If missing 'username' or 'password', send err2 to login page
		//err2 will display alert indicating there is a missing field.
		if (empty($_POST['uname']) || empty($_POST['pword'])) {
			header("Location: /login.php?err2=true");
			exit();
		}

		$uname = $_POST['uname'];
		$pword = $_POST['pword'];

		//$conn = new mysqli($srvr, $un, $pw, $db);
		$req = "SELECT * FROM Users";
		$result = $conn->query($req);
		$num = count($result);
		while ( $row = $result->fetch_assoc() ) {
                        //If 'username' and 'password' match, stash credentials into sessions
                        //retrieve any/all News articles to load in dashboard page
                        //redirect to dashboard.php page
			if ($row['username'] == $uname) {
				if (password_verify($pword, $row['password'])) {
					$_SESSION['signedin'] = true;
					$_SESSION['firstname'] = $row['firstname'];
					$_SESSION['lastname'] = $row['lastname'];
					$_SESSION['uname'] = $row['username'];
					$_SESSION['passwd'] = $row['password'];
					$_SESSION['email'] = $row['email'];
					header("Location: /dashboard.php");
					exit();
				}
			}
		}
                //Else send err1 code to login page
                //err2 displays alert to user indicating incorrect/missing 'username' or 'password'.
		header("Location: /login.php?err1=true");
	}


	//Send Verification Code Button
	if ( isset($_POST['send-code']) ) {
		$email = $_POST['email'];
                $req = "SELECT * FROM Users";
                $result = $conn->query($req);

                while ( $row = $result->fetch_assoc() ) {
			//If 'email' matches email stored in database, generate 6-digit verification code
			//retrieve user's 'firstname' and 'lastname' and send verification code
			//also stash verificaiton code and email in a session for later use.
			//**DO NOT allow user input in sendEmail function.
                        if ($row['email'] == $email) {
                        	$fullname = $row['firstname'] . " " . $row['lastname'];
                        	$vcode = mt_rand(100000, 999999);
                        	$_SESSION['vcode'] = $vcode;
				$_SESSION['email'] = $email;
                        	$sub = "Email Recovery";
                        	$bod = "<h2>Hello, " . $fullname . "</h2> <h3> Your recovery code is: " . $vcode . "</h3> <p>If you did not request a recovery code through your email, pleasae ignore this message.<p>";
                        	if (sendEmail($row['firstname'], $row['lastname'], $row['email'], $sub, $bod)) {
					//vedirect to login page
					//vcode makes vcode modal visible
                                	header("Location: /login.php?vcode=true");
					exit();
				}
                        	else {
					//err4 notifies user email could not be sent
                                	header("Location: /login.php?err4=true");
					exit();
				}
			}
                }
		//err3 notifies user email input was missing or incorrect.
		header("Location: /login.php?err3=true");
	}


	//Verify Code Button
	if ( isset($_POST['vcode-verify']) ) {
		$vcode = $_POST['vcode'];

		//If verification codes match, retrieve user info from database using email
		//stash user info in sessions and retrieve/stash News articles frod db as well
		//redirect to dashboard page where user can change password
		if ($vcode == $_SESSION['vcode']) {
			$req = "SELECT * FROM Users";
			$result = $conn->query($req);

			while ( $row = $result->fetch_assoc() ) {
				if ($_SESSION['email'] == $row['email']) {
                                        $_SESSION['signedin'] = true;
                                        $_SESSION['firstname'] = $row['firstname'];
                                        $_SESSION['lastname'] = $row['lastname'];
                                        $_SESSION['uname'] = $row['username'];
                                        $_SESSION['passwd'] = $row['password'];
					header("Location: /dashboard.php");
					exit();
				}
			}
		}
		else {
			//Else notify user of verification error
			//vcode-err alerts missing or incorrect verification code.
			header("Location: /login.php?vcode-err=true");
			exit();
		}
	}


	//Close modal button
	if ( isset($_POST['close-verify']) ) {
		//Erase stashed verification code
		//and redirect to login page.
		$_SESSION['vcode'] = NULL;
		header("Location: /login.php");
	}

}
