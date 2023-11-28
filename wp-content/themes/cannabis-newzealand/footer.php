<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

?>


		<!-- Main Footer -->
	<footer class="main-footer" data-aos="fade-right" data-aos-duration="3000">

		<!--Widgets Section-->
		<div class="widgets-section">
			<div class="auto-container">
				<div class="row">
					<!--Footer Column-->
					<div class="footer-column col-lg-3 col-md-6 col-sm-12">
						<div class="footer-widget about-widget">
							<div class="logo"><a href="<?php echo get_site_url(); ?>"><img src="<?php echo get_field('logo','option'); ?>" alt="" /></a></div>
							<div class="text">Established in 2013</div>
							<ul class="contact-list">
								<li>
									<i class="fa fa-phone-square"></i>
									<a href="tel:<?php echo get_field('phone_number','option'); ?>"><?php echo get_field('phone_number','option'); ?></a>
								</li>
								<li>
									<i class="fa fa-envelope"></i>
									<a href="mailto:<?php echo get_field('email','option'); ?>"><?php echo get_field('email','option'); ?></a>
								</li>
								<!--<li>
									<i class="fa fa-map-marker"></i>
									<?php echo get_field('address','option'); ?>
								</li>-->
							</ul>
						</div>
					</div>

					<!--Footer Column-->
					<div class="footer-column col-lg-2 col-md-6 col-sm-12">
						<div class="footer-widget">
							<h5 class="widget-title">Explore</h5>
							<?php wp_nav_menu( array('menu' => 'Footer_Menu', 'container' => '', 'items_wrap' => '<ul class="user-links">%3$s</ul>' )); ?>
							
						</div>
					</div>

					<!--Footer Column-->
					<div class="footer-column col-lg-3 col-md-6 col-sm-12">
						<div class="footer-widget gallery-widget">
							<h5 class="widget-title">Gallery</h5>
							<div class="widget-content">
								<div class="outer clearfix">
									<?php
									$images = get_field('footer_image_gallery','option');
									if($images):
										foreach($images as $image):
									 ?>
									<figure class="image">
										<a href="<?php echo esc_url($image['url']); ?>" class="lightbox-image" title="Image Title Here"><img
												src="<?php echo esc_url($image['url']); ?>" alt=""></a>
									</figure>
									<?php endforeach; 
										endif; ?>
									
								
									<!-- <figure class="image">
										<a href="<?php echo get_template_directory_uri(); ?>/images/gallery/2.html" class="lightbox-image" title="Image Title Here"><img
												src="<?php echo get_template_directory_uri(); ?>/images/resource/insta-2.jpg" alt=""></a>
									</figure>
								
									<figure class="image">
										<a href="<?php echo get_template_directory_uri(); ?>/images/gallery/3.html" class="lightbox-image" title="Image Title Here"><img
												src="<?php echo get_template_directory_uri(); ?>/images/resource/insta-3.jpg" alt=""></a>
									</figure>
								
									<figure class="image">
										<a href="<?php echo get_template_directory_uri(); ?>/images/gallery/4.html" class="lightbox-image" title="Image Title Here"><img
												src="<?php echo get_template_directory_uri(); ?>/images/resource/insta-4.jpg" alt=""></a>
									</figure>
								
									<figure class="image">
										<a href="<?php echo get_template_directory_uri(); ?>/images/gallery/5.html" class="lightbox-image" title="Image Title Here"><img
												src="<?php echo get_template_directory_uri(); ?>/images/resource/insta-5.jpg" alt=""></a>
									</figure>
								
									<figure class="image">
										<a href="<?php echo get_template_directory_uri(); ?>/images/gallery/1.html" class="lightbox-image" title="Image Title Here"><img
												src="<?php echo get_template_directory_uri(); ?>/images/resource/insta-6.jpg" alt=""></a>
									</figure> -->
								</div>
							</div>
						</div>
					</div>

					<!--Footer Column-->
					<div class="footer-column col-lg-4 col-md-6 col-sm-12">
						<div class="footer-widget Newsletter-widget">
							<h5 class="widget-title">Newsletter</h5>
							<div class="widget-content">
								<div class="subscribe-form">
									<div class="text">WEED PUB NZ - Sign up for regular updates.</div>
								<!--	<form method="post" action="#">
										<div class="form-group">
											<input type="email" name="email" class="email" value="" placeholder="Email Address" required="">
											<button type="button" class="theme-btn btn-style-one">GO</button>
										</div>
									</form> -->
									<?php echo do_shortcode('[email-subscribers-form id="1"]'); ?>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!--Footer Bottom-->
		<div class="footer-bottom">
			<div class="auto-container">
				<div class="inner-container">
					 <div class="copyright-text">
						<p>© Copyright <?php echo date('Y'); ?> Designed by <a href="#">Webart Technology</a></p>
					</div>
				</div>
			</div>
		</div>
	</footer>
	<!--End Main Footer -->

</div><!-- End Page Wrapper -->


<!-- Scroll To Top -->
<div class="scroll-to-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></div>


<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/popper.min.js"></script>
<!--Revolution Slider-->
<script src="plugins/revolution/js/jquery.themepunch.revolution.min.js"></script>
<script src="plugins/revolution/js/jquery.themepunch.tools.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.actions.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.carousel.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.migration.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.parallax.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
<script src="plugins/revolution/js/extensions/revolution.extension.video.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/main-slider-script.js"></script>
<!--Revolution Slider-->
<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.fancybox.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/wow.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/appear.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/owl.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/select2.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/script.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<!-----------Fancybox JS------------>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script> -->

<script>
  AOS.init();
</script>
<script>
	// ==== **** WINDOW ON SCROLL **** =====
	$(window).scroll(function () {
	    var sc = $(window).scrollTop()
	    if (sc > 100) {
	        $(".sticky-header").addClass("fixed-header , animated , slideInDown")
	    } else {
	    	
	        $(".sticky-header").removeClass("fixed-header , animated , slideInDown")
	    }
	});
</script>

<script>
	$(document).ready(function() {
		$("input[name$='radioList']").click(function() {
			var test = $(this).val();

			$("div.desc").hide();
			$("#RadioList" + test).show();
		});
	});
</script>


<?php wp_footer(); ?>

</body>
</html>
