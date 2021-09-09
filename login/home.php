<?php
	//Keep on top
	include '../../phpfiles/homedb.php';
	include '../../phpfiles/miemail.php';
	session_start();


	//Alert for errors
	class Alert {
		public $msg;
		function message($input) {
			$this->msg = $input;
		}
		function show_message() {
			if (!empty($this->msg)) {
				$html = '<div class="alert alert-danger" role="alert">' . $this->msg . '</div>';
				return $html;
			}
			else {return ' ';}
		}
	}
	//Session holding alerts
	if (empty($_SESSION['alerts'])) {
		$_SESSION['alerts'] = new Alert();
	}
	$_SESSION['alerts']->message('');


	/* ------- Buttons ------- */

        //Logout button
        if ( isset($_POST['logout']) ) {
                $_SESSION["signedin"] = false;
                header("Location: /");
        }


	//Add News + button
	if ( isset($_POST['post-news']) ) {
		//Insert new News article
		if ( isset($_POST['post-title']) && isset($_POST['post-body']) ) {
			$news_title = $_POST['post-title'];
			$news_body = $_POST['post-body'];
			$author = $_SESSION['firstname'];
			//Insert into db
			$stmt = $conn->prepare("INSERT INTO News (title, body, author) VALUES (?, ?, ?)");
			$stmt->bind_param("sss", $news_title, $news_body, $author);
			$stmt->execute();
		}
		else {
			$_SESSION['alerts']->message('Missing news title and/or body');
		}
		header("Location: /dashboard.php");
	}


	//Remove button
	if ( isset($_POST['remove-news']) ) {
		//Remove selected
		$news_id = $_POST['remove-news'];
		$news_date = $news[(int)$news_id]->date;
		$stmt = $conn->prepare("DELETE FROM News WHERE date = ?");
		$stmt->bind_param("s", $news_date);
		$stmt->execute();
		header("Location: /dashboard.php");
	}


	//Edit button
	if ( isset($_POST['edit-news']) ) {
		//Remove previous
		$news_id = $_POST['edit-news'];
		$news_date = $news[(int)$news_id]->date;
		$stmt = $conn->prepare("DELETE FROM News WHERE date = ?");
		$stmt->bind_param("s", $news_date);
		$stmt->execute();
		//Insert edited version
		$news_title = $_POST["title-" . $news_id];
		$news_body = $_POST["body-" . $news_id];
		$author = 'Joselito';
		$stmt = $conn->prepare("INSERT INTO News (title, body, author, date) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("ssss", $news_title, $news_body, $author, $news_date);
		$stmt->execute();
		header("Location: /dashboard.php");
	}


	//Credentials - Change button
	if ( isset($_POST['change-cred']) ) {
		$cntrl = true;
		$new_uname = '';
		$new_hash = '';
		//Get new username if any
		if ( isset($_POST['new-un']) && !empty($_POST['new-un']) ) {
			$new_uname = $_POST['new-un'];
		}
		//Get new password if any
		if ( isset($_POST['new-pw']) && !empty($_POST['new-pw']) ) {
			$new_pw = $_POST['new-pw'];
			//If password is too short
			if ( strlen($new_pw) < 8 ) {
				$cntrl = false;
				$_SESSION['alerts']->message('Password is too short.');
			}
			//encrypt new password
			else { $new_hash = password_hash($new_pw, PASSWORD_BCRYPT, ['cost' => 10]); }
		}
		//Get confirmation password
		if ($cntrl === true && isset($_POST['confirm-pw']) ) {
			$confirm_pw = $_POST['confirm-pw'];
			//If password is empty
			if ( empty($confirm_pw) ) { $alerts->message('Missing confirmation password. Please try again.'); }
			//If password matches new or current password
			else if ( password_verify($confirm_pw, $new_hash) || password_verify($confirm_pw, $passwd) ) {
				//Remove old credentials
				$stmt = $conn->prepare("DELETE FROM Users WHERE username = ? AND lastname = ?");
				$stmt->bind_param("ss", $uname, $lastname);
				$stmt->execute();
				//Insert new credentials
				if ( !empty($new_uname) ) {
					$_SESSION['uname'] = $new_uname;
					$uname = $new_uname;
				}
				$passwd = password_hash($confirm_pw, PASSWORD_BCRYPT, ['cost' => 10]);
				$_SESSION['passwd'] = $passwd;
	                        $stmt = $conn->prepare("INSERT INTO Users (firstname, lastname, username, password, email) VALUES (?, ?, ?, ?, ?)");
        	                $stmt->bind_param("sssss", $firstname, $lastname, $uname, $passwd, $email);
                	        $stmt->execute();
			}
			else {
				$_SESSION['alerts']->message('Passwords did not match. Please try again.');
			}
		}
		header("Location: /dashboard.php");
	}


	//Close My Modal button
	if ( isset($_POST['close-verify']) ) {
		$_SESSION['my-modal'] = '<script type="text/javascript"> $("#my-modal").hide(); $("#cvc-alert").hide(); </script>';
		header("Location: /dashboard.php");
	}


	//Send Code / Resend Code buttons
	if ( isset($_POST['send-code']) || isset($_POST['resend']) ) {

		if ( isset($_POST['email']) && $_POST['email'] == $_POST['confirm-email'] ) {

			$_SESSION['email'] = $_POST['email'];
			$vcode = mt_rand(100000, 999999);
			$_SESSION['vcode'] = $vcode;
			$sub = "Email Verification";
			$bod = "<h2>Hello, " . $fullname . "</h2> <h3> Your verification code is: " . $vcode . "</h3> <p>If you did not request to verify your email, pleasae ignore this message.</p>";
			if (sendEmail($_SESSION['firstname'], $_SESSION['lastname'], $_SESSION['email'], $sub, $bod)) {
				$_SESSION['my-modal'] = '<script type="text/javascript"> $("#my-modal").show(); $("#cvc-alert").hide(); </script>';
			}
			else {
			    	$_SESSION['alerts']->message('Verification code could not be sent. Please try again.');
			}

		}
		else {
			$_SESSION['alerts']->message('Emails do not match. Please try again.');
		}
		header("Location: /dashboard.php");
	}


	//Verification Code - Submit button
	if ( isset($_POST['vcode-verify']) ) {
		$vcode = $_POST['vcode'];
		if ($vcode == $_SESSION['vcode']) {
			//Remove old credentials
                        $stmt = $conn->prepare("DELETE FROM Users WHERE username = ? AND lastname = ?");
                        $stmt->bind_param("ss", $uname, $lastname);
                        $stmt->execute();
                        //Insert new credentials
			$email = $_SESSION['email'];
                        $stmt = $conn->prepare("INSERT INTO Users (firstname, lastname, username, email, password) Values (?, ?, ?, ?, ?)");
                        $stmt->bind_param("sssss", $firstname, $lastname, $uname, $email, $passwd);
                        $stmt->execute();
			$_SESSION['my-modal'] = '<script type="text/javascript"> $("#my-modal").hide(); $("#cvc-alert").hide(); </script>';
		}
		else {
			$_SESSION['my-modal'] = '<script type="text/javascript"> $("#my-modal").show(); $("#cvc-alert").show(); </script>';
		}
		header("Location: /dashboard.php");
	}


	//User Info - Change button
	if ( isset($_POST['change-ui']) ) {
		$fname = $_POST['firstname'];
		$lname = $_POST['lastname'];
		if ( !empty($fname) && !empty($lname) ) {
			$stmt = $conn->prepare("DELETE FROM Users WHERE firstname = ? AND username = ?");
			$stmt->bind_param("ss", $firstname, $uname);
			$stmt->execute();
			$_SESSION['firstname'] = $fname;
			$_SESSION['lastname'] = $lname;
			$stmt = $conn->prepare("INSERT INTO Users (firstname, lastname, username, password, email) VALUES (?, ?, ?, ?, ?)");
			$stmt->bind_param("sssss", $fname, $lname, $uname, $passwd, $email);
			$stmt->execute();
		}
		else {
			$_SESSION['alerts']->message('Missing firstname and/or lastname.');
		}
		header("Location: /dashboard.php");
	}


	//Close db connection.
	$conn->close();

