<?php /* Template Name: About Us */ ?>
<?php get_header();?>


	<!--Main Slider-->
	<section class="main-slider innerBanner">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title-outer">
						<h1 data-aos="fade-right" data-aos-duration="3000" class="title text-white">About Us</h1>
						<ul class="page-breadcrumb" data-aos="fade- " data-aos-duration="3000">
							<li><a href="index.html">Home</a></li>
							<li>About</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End Main Slider-->
	<div class="commonShap">
		<img src="<?php echo get_template_directory_uri(); ?>/images/shape-7.png">
	</div>


	<!-- About Section -->
	<section class="about-section">
		<div class="auto-container">
			<div class="row">
				<!-- Image Column -->
				<div class="image-column col-lg-6 col-md-12 col-sm-12">
					<div class="about-image-wrapper">
						<figure class="bg-shape zoom-one" data-wow-delay="600ms"><img src="<?php the_field('about_section_image1',5); ?>"
								alt="" /></figure>
						<figure data-aos="zoom-in" data-aos-duration="3000" class="image-1" data-wow-delay="300ms"><img src="<?php the_field('about_section_image2',5); ?>"
								alt="" /></figure>
						<figure data-aos="zoom-in" data-aos-duration="2000" class="image-2 wow zoomIn" data-wow-delay="900ms"><img src="<?php the_field('about_section_image3',5); ?>"
								alt="" /></figure>
					</div>
				</div>
	
				<!-- Content Column -->
				<div class="content-column col-lg-6 col-md-12 col-sm-12">
					<div class="inner-column wow fadeInRight">
						<?php while(have_posts()):the_post(); ?>
						<div class="sec-title">
							
								<?php
								the_content();

								 endwhile; ?>
						</div>
						<div class="info-box">
							

						</div>
						<a href="<?php echo get_site_url(); ?>/shop" class="theme-btn btn-style-one">shop now</a>
						<a href="https://app.joinit.com/o/cannabis-club-new-zealand" class="theme-btn btn-style-one" target="_blank">Join Us</a>
						<a href="https://www.youtube.com/watch?v=LIk09HuSbi4" target="_blank" class="theme-btn btn-style-one">Hemp Resource</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End About Section -->

	<!-- Clients Section   -->
	<section class="clients-section style-two d-none">
		<div class="auto-container">
			<div class="anim-icons">
				<span class="icon-leaf leaf-1"></span>
			</div>

			<!-- Sponsors Outer -->
			<div class="sponsors-outer">
				<!--clients carousel-->
				<ul class="clients-carousel owl-carousel owl-theme">
					<?php
					$clients = get_field('client_contain');
					if($clients){
						foreach($clients as $client){
					 ?>

					<li class="slide-item"> <a href="#"><img src="<?php echo $client['company_image']; ?>" alt=""></a> </li>
					<!-- <li class="slide-item"> <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/resource/client.png" alt=""></a> </li>
					<li class="slide-item"> <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/resource/client.png" alt=""></a> </li>
					<li class="slide-item"> <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/resource/client.png" alt=""></a> </li>
					<li class="slide-item"> <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/resource/client.png" alt=""></a> </li> -->
					<?php }
					}?>
				</ul>
			</div>
		</div>
	</section>
	<!--End Clients Section -->

	<div class="commonShap proSherp">
		<img src="<?php echo get_template_directory_uri(); ?>/images/proshap.png">
	</div>



	<!-- Testimonial Section -->
	<section class="testimonial-section d-none" data-aos="zoom-in" data-aos-duration="2000">
		<div class="auto-container">
			<div class="sec-title text-center">
				<span class="sub-title">More about us</span>
				<h2>What They’re Talking</h2>
				<span class="divider"></span>
			</div>
	
			<div class="outer-box">
				<!-- Testimonial Carousel -->
				<div class="testimonial-carousel owl-carousel owl-theme">
					<?php 
					$testimonialblocks = get_field('testimonial_block');
					if($testimonialblocks){
						foreach($testimonialblocks as $testimonialblock){
					 ?>

					
					<!-- Testimonial Block -->
					<div class="testimonial-block">
						<div class="inner-box">
							<div class="thumb">
								<!--<img src="<?php echo $testimonialblock['client_image']; ?>" alt="">-->
								<span class="icon fa fa-quote-left"></span>
							</div>
							<div class="text"><?php echo $testimonialblock['client_comments']; ?></div>
							<!--<h4 class="name"><?php echo $testimonialblock['client_name']; ?></h4>-->
							<!--<span class="designation"><?php echo $testimonialblock['client_designation']; ?></span>-->
						</div>
					</div>
				<?php }} ?>
		
					<!-- Testimonial Block -->
					<!-- <div class="testimonial-block">
						<div class="inner-box">
							<div class="thumb">
								<img src="<?php echo get_template_directory_uri(); ?>/images/resource/testi-thumb-2.jpg" alt="">
								<span class="icon fa fa-quote-left"></span>
							</div>
							<div class="text">I was very impresed by the osfins service lorem ipsum is simply free text used by copy typing
								refreshing. Neque porro est qui dolorem ipsum.</div>
							<h4 class="name">Jessica Brown</h4>
							<span class="designation">Customer</span>
						</div>
					</div> -->
		
					<!-- Testimonial Block -->
					<!-- <div class="testimonial-block">
						<div class="inner-box">
							<div class="thumb">
								<img src="<?php echo get_template_directory_uri(); ?>/images/resource/testi-thumb-3.jpg" alt="">
								<span class="icon fa fa-quote-left"></span>
							</div>
							<div class="text">I was very impresed by the osfins service lorem ipsum is simply free text used by copy typing
								refreshing. Neque porro est qui dolorem ipsum.</div>
							<h4 class="name">Jessica Brown</h4>
							<span class="designation">Customer</span>
						</div>
					</div> -->

				</div>
			</div>
		</div>
	</section>
	<!-- End Testimonial Section -->

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
						<figure class="image" data-wow-delay="300ms"><img src="<?php echo get_template_directory_uri(); ?>/images/resource/image-1.png" alt="" />
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


<?php get_footer() ;?>
