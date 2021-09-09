<?php
	$verify_modal = '<script type="text/javascript"> $("#my-modal").hide(); $("#cvc-alert").hide(); </script>';
	$err = ' ';

	/* ------ Control code verification modal ------ */

	if (isset($_GET['vcode']))
		$verify_modal = '<script type="text/javascript"> $("#my-modal").show(); $("#cvc-alert").hide(); </script>';

	if (isset($_GET['vcode-err']))
		$verify_modal = '<script type="text/javascript"> $("#my-modal").show(); $("#cvc-alert").show(); </script>';

	/* ------ Error Messages ------- */

	if (isset($_GET['err1']))
		$err = '<div class="alert alert-danger" role="alert">Incorrect username or passowrd</div>';

	if (isset($_GET['err2']))
		$err = '<div class="alert alert-danger" role="alert">Missing username or password field</div>';

	if (isset($_GET['err3']))
		$err = '<div class="alert alert-danger" role="alert">Incorrect/Missing email</div>';

	if (isset($_GET['err4']))
		$err = '<div class="alert alert-danger" role="alert">Oops! Could not send verification email. Please try again.</div>';
?>

<!doctype html>
<html lang="en">
<head>
	<title>Login</title>
	<link rel="icon" href="images/navbar/miutrgv_logo.ico" type="image/x-icon">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<link rel="stylesheet" href="login/static/stylesheet.css">
</head>
<body>
	<style>
		body {background-color: whitesmoke;}
		#outer {
			width: 100%;
			text-align: center;
			padding-top: 125px;
		}
		#login {
			width: 35rem;
			padding: 50px;
			display: inline-block;
			background-color: white;
		}
		#login-input {padding-top: 50px;}
		#login-logo img {cursor: pointer;}
	</style>

	<form method="POST" action="login/login.php">
	<div id="outer">
		<div id="login">
			<div id="login-logo">
				<img src="images/home/miutrgv_home.svg" width="100%;">
			</div>
			<div id="login-input">
				<div class="form-group row">
					<label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
					<div class="col-sm-10">
						<input name="uname" type="text" class="form-control" id="inputEmail3">
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
					<div class="col-sm-10">
						<input name="pword" type="password" class="form-control" id="inputPassword3">
					</div>
				</div>
				<div class="form-group">
					<button type="button" class="btn btn-link" data-toggle="modal" data-target="#recoveryModal">Forgot password?</button>
				</div>
				<div class="form-group">
					<button name="login" type="submit" class="btn btn-dark">Login</button>
				</div>
			</div>

			<?php echo $err; ?>

		</div>
	</div>

	<!-- Modals -->

	<!-- Recovery -->
	<div id="recoveryModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<form method="POST">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Forgot Password?</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>Send recovery code.</p>
					<div class="form-group">
						<label>Email</label>
						<input name="email" type="email" class="form-control">
						<small class="form-text text-muted">We'll send a 6-digit code to your email. Input email to access your account.</small>
					</div>
				</div>
				<div class="modal-footer">
					<button name="send-code" type="submit" class="btn btn-primary">Send Code</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
			</form>
		</div>
	</div>

        <!-- Verification Code -->
        <div id="my-modal">
                <div id="code-verify-container">
                        <div class="form-group">
                                <label>Verification Code</label>
                                <input name="vcode" type="text" class="form-control">
                                <small class="form-text text-muted">Be sure to check your spam folder else <button name="resend" type="submit" class="btn btn-link btn-sm">Resend Code</button></small>
                                <div id="cvc-alert" class="alert alert-danger" role="alert">Codes do not match. Try again or Resend.</div>
                                <button name="vcode-verify" type="submit" class="btn btn-primary">Submit</button>
                                <button name="close-verify" type="submit" class="btn btn-secondary">Close</button>
                        </div>
                </div>
        </div>
	</form>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

	<?php echo $verify_modal; ?>

	<script type="text/javascript">
		$("#login-logo img").on("click", function() {
			window.location.href = "/";
		});
	</script>

</body>
</html>
