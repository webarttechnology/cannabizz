<?php /* Template Name: Contact Us */ ?>

<?php get_header();?>



	<!--Main Slider-->

	<section class="main-slider innerBanner">

		<div class="container">

			<div class="row">

				<div class="col-md-12">
					<?php while(have_posts()):the_post(); ?>

					<div class="title-outer">

						<h1 data-aos="fade-down" data-aos-duration="3000" class="title text-white"><?php the_title(); ?></h1>

						<ul class="page-breadcrumb" data-aos="fade-up" data-aos-duration="3000">

							<li><a href="<?php echo get_site_url(); ?>">Home</a></li>

							<li><?php the_title(); ?></li>

						</ul>

					</div>
				<?php endwhile; ?>

				</div>

			</div>

		</div>

	</section>

	<!-- End Main Slider-->

	<div class="commonShap">

		<img src="<?php echo get_template_directory_uri(); ?>/images/shape-7.png">

	</div>



	<!--Contact Details Start-->

	<section class="contact-details">

		<div class="container pt-110 pb-110">

			<div class="row">

				<div class="col-xl-7 col-lg-6">

					<div class="sec-title">

						<span class="sub-title">Send us email</span>

						<h2 data-aos="fade-right" data-aos-duration="3000">Feel free to write</h2>

					</div>

					<?php echo do_shortcode('[contact-form-7 id="81" title="Contact Us Contact Form"]');?>

					<!-- Contact Form -->

				

					<!-- Contact Form Validation-->

				</div>

				<div class="col-xl-5 col-lg-6">

					<div class="contact-details__right">

					<!--	<div class="sec-title mb-30">

							<span class="sub-title">Need any help?</span>

							<h2 data-aos="fade-down" data-aos-duration="3000">Get in touch with us</h2>

							<div class="text" data-aos="fade-right" data-aos-duration="3000">Lorem ipsum is simply free text available dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply free labore dolore magna.</div>

						</div>-->

						<ul class="list-unstyled contact-details__info" >

							<li>

								<div class="icon" data-aos="fade-down" data-aos-duration="3000">

									<span class="lnr-icon-phone-plus"></span>

								</div>

								<div class="text">

									<h6>Business Phone</h6>

									<a href="tel:<?php echo get_field('contact_us_phone_number','option'); ?>"><!--<span>Free</span> --> <?php echo get_field('contact_us_phone_number','option'); ?></a>

								</div>

							</li>
							<li>

								<div class="icon" data-aos="fade-up" data-aos-duration="3000">

									<span class="lnr-icon-location"></span>

								</div>

								<div class="text">

									<h6>If you want to talk to someone about legally accessing cannabis, please go to our Wellness Pages on the main menu.</h6>

									<span><?php echo get_field('address','option'); ?></span>

								</div>

							</li>

							<li>

								<div class="icon" data-aos="fade-right" data-aos-duration="3000">

									<span class="lnr-icon-envelope1"></span>

								</div>

								<div class="text">

									<h6>Business email</h6>

									<a href="mailto:<?php echo get_field('email','option'); ?>"><?php echo get_field('email','option'); ?></a>

								</div>

							</li>

							

						</ul>

					</div>

				</div>

			</div>

		</div>

	</section>

	<!--Contact Details End-->





	<!-- About Section Two -->

	<section class="about-section-two d-none" style="background-image: url(images/background/2.jpg)">

		<div class="auto-container">

			<div class="row">

	

				<!-- Content Column -->

				<div class="content-column col-lg-6 col-md-12 col-sm-12">

					<div class="inner-column wow fadeInRight">

						<div class="sec-title light">

							<span class="sub-title">Get to Know Dispensary</span>

							<h2>CBD Natural Essential Relaxation</h2>

							<span class="divider"></span>

						</div>



						<div class="row g-0">

							<div class="about-block col-lg-6 col-md-6 col-sm-12">

								<div class="inner-box">

									<span class="icon flaticon-cannabis-Marijuana1"></span>

									<span class="title">Our Benefits</span>

									<h5>Marijuana Removes Headache</h5>

								</div>

							</div>



							<div class="about-block col-lg-6 col-md-6 col-sm-12">

								<div class="inner-box">

									<span class="icon flaticon-cannabis-heart-rate"></span>

									<span class="title">Our Benefits</span>

									<h5>Cannabis Relieves Pain</h5>

								</div>

							</div>

						</div>

						<div class="text">Lorem ipsum dolor sit amet nsectetur cing elit. Suspe ndisse suscipit sagittis leo sit met entum estibu dignissim

						posuere cubilia.</div>

						<a href="shop-products.html" class="theme-btn btn-style-one">shop now</a>

					</div>

				</div>



				<!-- Image Column -->

				<div class="image-column col-lg-6 col-md-12 col-sm-12">

					<div class="image-box">

						<figure class="image" data-wow-delay="300ms"><img src="images/resource/image-1.png" alt="" />

						</figure>

						<div class="fact-counter-one bounce-y">

							<h4 class="counter-title">Trusted by</h4>

							<div class="count-box"><span class="count-text" data-speed="3000" data-stop="4890">0</span></div>

						</div>

					</div>

				</div>

			</div>

		</div>

	</section>

	<!-- End About Section Two -->



	<!-- News Section -->

	<section class="news-section d-none">

		<div class="auto-container">

			<div class="sec-title text-center">

				<span class="sub-title">From the Blog</span>

				<h2>News & Articles</h2>

				<span class="divider"></span>

			</div>

	

			<div class="row">

				<!-- News Block -->

				<div class="news-block col-lg-4 col-md-6 col-sm-12">

					<div class="inner-box">

						<span class="date">25 Jul</span>

						<div class="image-box">

							<figure class="image"><a href="news-details.html"><img src="images/resource/news-1.jpg" alt=""></a></figure>

						</div>

						<div class="lower-content">

							<ul class="post-info">

								<li><i class="fa fa-folder"></i> Marijuana</li>

								<li><i class="fa fa-comments"></i> 02 Comments</li>

							</ul>

							<h4><a href="news-details.html">How to lead a healthy & well-balanced life</a></h4>

							<div class="author">

								<figure class="thumb"><img src="images/resource/author-thumb-1.jpg" alt=""></figure>

								<h5 class="name">by <a href="news-details.html">Mike Hardson</a></h5>

							</div>

						</div>

					</div>

				</div>

	

				<!-- News Block -->

				<div class="news-block col-lg-4 col-md-6 col-sm-12">

					<div class="inner-box">

						<span class="date">25 Jul</span>

						<div class="image-box">

							<figure class="image"><a href="news-details.html"><img src="images/resource/news-2.jpg" alt=""></a></figure>

						</div>

						<div class="lower-content">

							<ul class="post-info">

								<li><i class="fa fa-folder"></i> Marijuana</li>

								<li><i class="fa fa-comments"></i> 02 Comments</li>

							</ul>

							<h4><a href="news-details.html">Legalization of marijuana for medicinal use</a></h4>

							<div class="author">

								<figure class="thumb"><img src="images/resource/author-thumb-1.jpg" alt=""></figure>

								<h5 class="name">by <a href="news-details.html">Mike Hardson</a></h5>

							</div>

						</div>

					</div>

				</div>

	

				<!-- News Block -->

				<div class="news-block col-lg-4 col-md-6 col-sm-12">

					<div class="inner-box">

						<span class="date">25 Jul</span>

						<div class="image-box">

							<figure class="image"><a href="news-details.html"><img src="images/resource/news-3.jpg" alt=""></a></figure>

						</div>

						<div class="lower-content">

							<ul class="post-info">

								<li><i class="fa fa-folder"></i> Marijuana</li>

								<li><i class="fa fa-comments"></i> 02 Comments</li>

							</ul>

							<h4><a href="news-details.html">True factors of the modern healthy lifestyle</a></h4>

							<div class="author">

								<figure class="thumb"><img src="images/resource/author-thumb-1.jpg" alt=""></figure>

								<h5 class="name">by <a href="news-details.html">Mike Hardson</a></h5>

							</div>

						</div>

					</div>

				</div>

			</div>

	

		</div>

	</section>

	<!--End News Section -->



	<!-- Clients Section   -->

	<section class="clients-section d-none">

		<div class="auto-container">

			<div class="anim-icons">

				<span class="icon-leaf leaf-1"></span>

				<span class="icon-leaf leaf-2"></span>

				<span class="icon-leaf leaf-3"></span>

			</div>

			

			<!-- Sponsors Outer -->

			<div class="sponsors-outer">

				<!--clients carousel-->

				<ul class="clients-carousel owl-carousel owl-theme">

					<li class="slide-item"> <a href="#"><img src="images/resource/client.png" alt=""></a> </li>

					<li class="slide-item"> <a href="#"><img src="images/resource/client.png" alt=""></a> </li>

					<li class="slide-item"> <a href="#"><img src="images/resource/client.png" alt=""></a> </li>

					<li class="slide-item"> <a href="#"><img src="images/resource/client.png" alt=""></a> </li>

					<li class="slide-item"> <a href="#"><img src="images/resource/client.png" alt=""></a> </li>

					<li class="slide-item"> <a href="#"><img src="images/resource/client.png" alt=""></a> </li>

				</ul>

			</div>

		</div>

	</section>

	<!--End Clients Section -->





<?php get_footer();?>