<?php
/**
 * The header.
 *
 * This is the template that displays all of the <head> section and everything up until main.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> <?php twentytwentyone_the_html_classes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet">
		<link href="plugins/revolution/css/settings.css" rel="stylesheet" type="text/css"><!-- REVOLUTION SETTINGS STYLES -->
		<link href="plugins/revolution/css/layers.css" rel="stylesheet" type="text/css"><!-- REVOLUTION LAYERS STYLES -->
		<link href="plugins/revolution/css/navigation.css" rel="stylesheet" type="text/css"><!-- REVOLUTION NAVIGATION STYLES -->

		<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

			<link href="<?php echo get_template_directory_uri(); ?>/css/style.css" rel="stylesheet">
		<link href="<?php echo get_template_directory_uri(); ?>/css/responsive.css" rel="stylesheet">

		<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" type="image/x-icon">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" type="image/x-icon">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.0/css/font-awesome.css" integrity="sha512-72McA95q/YhjwmWFMGe8RI3aZIMCTJWPBbV8iQY3jy1z9+bi6+jHnERuNrDPo/WGYEzzNs4WdHNyyEr/yXJ9pA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!---------Fancybox Style------------->

      <!--  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css"/>  -->

<!-- Responsive -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="page-wrapper">
	<!-- Main Header-->	
	<header class="main-header header-style-one">
		<!-- Header Top -->
		<div class="header-top">
			<div class="container">
				<div class="row">
					<div class="top-center col-lg-2 col">
						<div class="logo"><a href="<?php echo get_site_url(); ?>"><img src="<?php echo get_field('logo','option'); ?>" alt="" title="CCNZ"></a></div>
					</div>

					<div class="top-left col-lg-5 col">
						<ul class="social-icon-one">
							<?php 
							$socialmedias = get_field('social_media_contain','option');
							if($socialmedias){
								foreach($socialmedias as $socialmedia){
							 ?>

							<li><a href="<?php echo $socialmedia['social_links']; ?>" target="_blank"><?php echo $socialmedia['social_icons'];  ?></a></li>
							<?php 
							}
							} ?>
							
						</ul>

						<span class="divider"></span>

						<!-- Contact Info Box -->
					<!--	<div class="contact-info-box">
							<i class="icon lnr-icon-phone-handset"></i> 
							<span class="title">Call Now</span>
							<a href="tel: <?php //echo get_field('header_phone_number','option'); ?>"><?php //echo get_field('header_phone_number','option'); ?></a>
						</div> -->
					</div>

					<div class="top-right col-lg-5 col">
						<!-- Contact Info Box -->
						<!--<div class="contact-info-box">
							<span class="icon lnr-icon-envelope1"></span> 
							<span class="title">Send Email</span>
							<a href="mailto:member@cannabisclubnewzealand.com"><?php // echo get_field('email','option'); ?></a>
						</div> -->

						<span class="divider"></span>

						<div class="outer-box">
							<button class="ui-btn ui-btn search-btn">
								<span class="icon lnr lnr-icon-search"></span>
							</button>
							<button class="ui-btn ui-btn search-btn">
								<span class="icon lnr lnr-icon-user"></span>
							</button>

							<div class="ui-btn cart-btn">
								<a href="<?php echo get_site_url(); ?>/cart" class="text-white"><span class="icon lnr-icon-cart"></span>
									<span class="count"><?php echo WC()->cart->get_cart_contents_count(); ?></span></a>
							</div>
						
							<!--Mobile Navigation Toggler-->
							<div class="mobile-nav-toggler"><span class="icon lnr-icon-bars"></span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Header Top -->

		<!-- Header Lower -->
		<div class="header-lower">
			<div class="auto-container">
				<div class="main-box">
					<!--Nav Box-->
					<div class="nav-outer">

						<nav class="nav main-menu">
							<?php wp_nav_menu( array('menu' => 'Header_Menu', 'container' => '', 'items_wrap' => '<ul class="navigation">%3$s</ul>' )); ?>
							<!-- <ul class="navigation">
								<li><a href="index.php">Home</a>
								</li>
								<li><a href="about-us.php">About Us</a></li>
								<li><a href="shop.php">Shop</a></li>
								<li class="dropdown"><a href="#">Membership</a>
									<ul>
										<li><a href="#">Silver Membership</a></li>
										<li><a href="#">Gold Membership</a></li>
										<li><a href="#">Green Membership</a></li>
										<li><a href="#">Platinum Membership</a></li>
									</ul>
								</li>
								<li><a href="#">Sponsorship</a></li>
								<li><a href="contact-us.php">Contact Us</a></li>
							</ul> -->
						</nav>
						<!-- Main Menu End-->
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile Menu  -->
		<div class="mobile-menu">
			<div class="menu-backdrop"></div>
			<nav class="menu-box">
				<div class="upper-box">
					<div class="nav-logo"><a href="index.php"><img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="" title="Fesho"></a></div>
					<div class="close-btn"><i class="icon fa fa-times"></i></div>
				</div>

				<ul class="navigation clearfix"><!--Keep This Empty / Menu will come through Javascript--></ul>
				<ul class="contact-list-one">
					<li>
						<!-- Contact Info Box -->
						<div class="contact-info-box">
							<i class="icon lnr-icon-phone-handset"></i>
							<span class="title">Call Now</span>
							<a href="tel:+64 27 325 8268">+64 27 325 8268</a>
						</div>
					</li>
					<li>
						<!-- Contact Info Box -->
						<div class="contact-info-box">
							<span class="icon lnr-icon-envelope1"></span>
							<span class="title">Send Email</span>
							<a href="mailto:member@cannabisclubnewzealand.com">member@cannabisclubnewzealand.com</a>
						</div>
					</li>
					<li>
						<!-- Contact Info Box -->
						<div class="contact-info-box">
							<span class="icon lnr-icon-clock"></span>
							<span class="title">Send Email</span>
							Mon - Sat 8:00 - 6:30, Sunday - CLOSED
						</div>
					 </li>
				</ul>


				<ul class="social-links">
					<li><a href="#"><i class="fab fa-twitter"></i></a></li>
					<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
					<li><a href="#"><i class="fab fa-pinterest"></i></a></li>
					<li><a href="#"><i class="fab fa-instagram"></i></a></li>
				</ul>
			</nav>
		</div><!-- End Mobile Menu -->

		<!-- Sticky Header  -->
		<div class="sticky-header">
			<div class="auto-container">
				<div class="inner-container">
					<!--Logo-->
					<div class="logo">
						<a href="index.php" title=""><img src="images/logo.png" alt="" title=""></a>
					</div>

					<!--Right Col-->
					<div class="nav-outer">
						<!-- Main Menu -->
						<nav class="main-menu">
							<div class="navbar-collapse show collapse clearfix">
								 <ul class="navigation clearfix"><!--Keep This Empty / Menu will come through Javascript--></ul>
							</div>
						</nav><!-- Main Menu End-->

						<!--Mobile Navigation Toggler-->
						<div class="mobile-nav-toggler"><span class="icon lnr-icon-bars"></span></div>
					</div>
				</div>
			</div>
		</div><!-- End Sticky Menu -->
	</header>
	<!--End Main Header -->