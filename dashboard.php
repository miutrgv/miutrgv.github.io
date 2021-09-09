<?php
	session_start();

	if (empty($_SESSION['signedin'])) {

		header("Location: /");
	}


	//User's information
	$firstname = $_SESSION['firstname'];
	$lastname = $_SESSION['lastname'];
	$uname = $_SESSION['uname'];
	$passwd = $_SESSION['passwd'];
	$news = array();
	if (empty($_SESSION['email'])) { $email = ' '; }
	else { $email = $_SESSION['email']; }


        //Controls modal for the code verification input.
        if ( !isset($_SESSION['my-modal']) ) {
		$_SESSION['my-modal'] = '<script type="text/javascript"> $("#my-modal").hide(); $("#cvc-alert").hide(); </script>';
	}


?>

<!doctype html>
<html lang="en">
<head>
	<title>Home - Dashboard</title>
	<link rel="icon" href="images/navbar/miutrgv_logo.ico" type="image/x-icon">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<link rel="stylesheet" href="login/static/stylesheet.css">
	<link rel="stylesheet" href="static/navbar.css">
	<link rel="stylesheet" href="login/static/stylesheet.css">
</head>
<body>

	<nav class="navbar fixed-top navbar-expand-lg ">
		<a class="navbar-brand" href="index.html">
			<img src="images/navbar/miutrgv_navbar.svg" width="190px;">
		</a>
		<img id="reorder" src="images/navbar/reorder.png">
	</nav>

	<form method="POST" action="login/home.php">
	<div id="sidebar">
		<div id="menu">
			<img src="images/home/miutrgv_home.svg" width="310px">
			<div id="menu-user-info">
				<img src="images/people/person.svg">
				<h5><?php echo $firstname . " " . $lastname; ?></h5>
				<div id="user-info" class="form-group">
					<label>Firstname</label>
					<input name="firstname" type="text" class="form-control" value="<?php echo $firstname; ?>">
					<label>Lastname</label>
					<input name="lastname" type="text" class="form-control" value="<?php echo $lastname; ?>">
					<div style="text-align: center; margin-top: 15px;">
						<button name="change-ui" type="submit" class="btn btn-primary">Change</button>
						<button id="cancel-ui" type="button" class="btn btn-secondary">Cancel</button>
					</div>
				</div>
				<button id="edit-ui" type="button" class="btn btn-link btn-sm">Edit</button>
			</div>
			<div class="menu-opt">
				<a href="#news-loc"><h5 class="sidebar-hl">News</h5></a>
			</div>
			<div class="menu-opt">
				<a href="#account-loc"><h5 class="sidebar-hl">Account</h5></a>
			</div>
			<div class="menu-opt">
				<button name="logout" type="submit" class="btn btn-link"><h5>Logout</h5></button>
			</div>
		</div>
	</div>

	<div id="dashboard">

		<?php if (!empty($_SESSION['alerts'])) { echo $_SESSION['alerts']->show_message(); } ?>

		<span type="hidden" id="news-loc"></span>
		<div class="d-title">
			<h2>News</h2>
		</div>
		<div class="d-body">

			<?php
				//News Articles
				for($i=0; $i<count($news); $i++) {
	        	                echo '<div class="article">';
        	        	        	echo '<div class="article-title">';
							echo '<h5>' . $news[$i]->title . '</h5>';
							echo '<input name="title-', $i ,'" class="form-control article-edit" value="', $news[$i]->title ,'">';
						echo '</div>';
                                		echo '<div class="article-body"><p>' . $news[$i]->body . '</p>';
							echo '<textarea name="body-', $i ,'" class="form-control article-edit" rows="5">' . $news[$i]->body . '</textarea>';
							echo '<h5>Author</h5><p>' . $news[$i]->author . '</p>';
							echo '<div class="article-btn">';
								echo '<button name="edit-news" type="submit" value="', $i ,'" class="btn btn-primary btn-sm article-edit-save">Save</button>';
								echo '<button type="button" class="btn btn-secondary btn-sm article-edit-btn">Edit</button>';
								echo '<button name="remove-news" type="submit" value="', $i ,'" class="btn btn-danger btn-sm">Remove</button>';
							echo '</div>';
                                		echo '</div>';
                                		echo '<div class="article-date"><p>' . $news[$i]->date . '</p></div>';
                        		echo '</div>';
				}
			?>

			<button id="add-news" type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#new-news-article"><h4>Add News +</h4></button>
		</div>

		<span type="hidden" id="account-loc"></span>
                <div class="d-title">
                        <h2>Account</h2>
                </div>
		<div class="d-body">
			<div class="article" style="height: auto;">
				<div class="article-title">
					<h5>Credentials</h5>
				</div>
				<div class="article-body">
					<p>Username</p>
					<input class="form-control" type="text" placeholder="<?php echo $uname; ?>" readonly>
					<p>Password</p>
					<h5>********</h5>
					<div class="article-btn">
						<button type="button" class="btn btn-link" data-toggle="modal" data-target="#change-credentials">Change</button>
					</div>
				</div>
			</div>

                        <div class="article" style="height: auto;">
                                <div class="article-title">
                                        <h5>Recovery</h5>
                                </div>
                                <div class="article-body">
					<p>Recovery Email</p>
					<input class="form-control" type="text" placeholder="<?php  echo $email; ?>" readonly>
                                        <div class="article-btn">
                                                <button type="button" class="btn btn-link" data-toggle="modal" data-target="#change-recovery">Add/Change</button>
                                        </div>
				</div>
                        </div>

		</div>
	</div>


	<!-- -----Modals------ -->

	<!-- News -->
	<div class="modal fade" id="new-news-article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">New News Article</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
                                       <div class="form-group">
                                                <label>Title</label>
                                                <input name="post-title" type="text" class="form-control">
                                                <small class="form-text text-muted">Maximum 60 characters.</small>
                                        </div>
                                        <div class="form-group">
                                                <label>Body</label>
                                                <textarea name="post-body" class="form-control" rows="5"></textarea>
                                                <small class="form-text text-muted">Maximum 200 characters.</small>
                                        </div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button name="post-news" type="submit" class="btn btn-primary">POST</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Credentials -->
        <div class="modal fade" id="change-credentials" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Change Credentials</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                       <div class="form-group">
						<label>Username</label>
						<select id="get-un" class="custom-select my-1 mr-sm-2">
							<option id="o-un" selected><?php echo $uname; ?></option>
							<option id="show-un">New Username</option>
						</select>
						<input name="new-un" id="new-un" type="text" class="form-control">
					</div>
                                        <div class="form-group">
                                                <label>New Password</label>
                                                <input name="new-pw" id="new-pw" type="password" class="form-control" readonly>
						<small class="form-text text-muted">Minimum 8 characters</small>
                                        </div>
					<div class="form-group">
						<label>Confirm Password</label>
						<input name="confirm-pw" type="password" class="form-control">
					</div>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button name="change-cred" type="submit" class="btn btn-primary">Change</button>
                                </div>
                        </div>
                </div>
        </div>

	<!-- Recovery -->
        <div class="modal fade" id="change-recovery" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Add/Change Recovery Email</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                       <div class="form-group">
                                                <label>New Email</label>
                                                <input name="email" type="email" class="form-control">
                                                <small class="form-text text-muted">Maximum 60 characters.</small>
                                        </div>
                                        <div class="form-group">
                                                <label>Confirm Email</label>
                                                <input name="confirm-email" type="email" class="form-control">
                                        </div>
					<div class="form-group">
						<label>We'll send you a 6-digit code to confirm we have your right email.</label>
					</div>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button name="send-code" type="submit" class="btn btn-primary">Send Code</button>
                                </div>
                        </div>
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

	<!-- ----------------- -->
	</form>

	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<?php if (isset($_SESSION['my-modal'])) { echo $_SESSION['my-modal']; } ?>

	<script type="text/javascript">

		var rcntrl = 0;
		$("#reorder").on("click", function() {
			if (rcntrl == 0) {
				$("#sidebar").css("width", "0px");
				$("#dashboard").css("padding", "60px 0 100px 0");
				$(this).css("margin", "10px 10px 0 0");
				rcntrl++;
			}
			else {
                                $("#sidebar").css("width", "360px");
                                $("#dashboard").css("padding", "60px 360px 100px 0");
                                $(this).css("margin", "10px 370px 0 0");
				rcntrl = 0;
			}
		});

		$("#user-info").hide();
		$("#edit-ui").on("click", function() { $("#user-info").show(); $(this).hide(); });
		$("#cancel-ui").on("click", function() { $("#user-info").hide(); $("#edit-ui").show(); });

		$(".article-edit").hide();
		$(".article-edit-save").hide();
		$(".article-edit-btn").on("click", function() {
			$(this).closest(".article").find("h5").hide();
			$(this).closest(".article-body").find("p").hide();
			$(this).closest(".article").find(".article-edit").show();
			$(this).closest(".article-btn").find(".article-edit-save").show();
			$(this).hide();
		});

		$("#new-un").hide();
		$("#get-un").change(function() {
			var id = $(this).find("option:selected").attr("id");
			if (id == "show-un") {
				$("#new-un").show();
			} else {
				$("#new-un").hide();
			}
		});
		$("#new-pw").on("click", function() { $(this).attr("readonly", false); });

	</script>
</body>
</html>
