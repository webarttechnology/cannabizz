<?php /* Template Name: Home */ ?>
<?php get_header();?>



	<!--Main Slider-->
	<section class="main-slider banner" style="background-image: url(<?php echo get_field('banner_image'); ?>);">
		 <div class="bannerContant">
		 	<h1 data-aos="fade-right" data-aos-duration="3000"><?php echo get_field('banner_title'); ?> 
			</h1>
			<p data-aos="fade-right" data-aos-duration="3000" class="text-light text-center">
				<?php echo get_field('banner_heading'); ?>
			</p>
			<a href="<?php echo get_site_url(); ?>/shop" class="commonButton">Shop Now</a>
		 </div>
	</section>
	<!-- End Main Slider-->
	<div class="commonShap">
		<img src="<?php echo get_template_directory_uri(); ?>/images/shape-7.png">
	</div>

<section class="gallery">
	<div class="container">
		<div class="sec-title text-center">
				<span class="sub-title" data-aos="fade-right" data-aos-duration="3000">Our Gallery</span>
				<h2 data-aos="fade-right" data-aos-duration="3000">Gallery</h2>
				<span class="divider"></span>
			</div>
			<?php $allgallery = new WP_Query(array('post_type'=>'our-gallery','posts_per_page'=>4,'post_status'=>'publish')); ?>
		<div class="row" data-aos="fade-down" data-aos-duration="3000">

			<?php while($allgallery->have_posts()):$allgallery->the_post(); ?>

			<div class="col-md-3">
				<div class="card">
					<a href="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" data-fancybox="gallery">
					  <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" />
					</a>
				</div>
			</div>
		<?php endwhile;wp_reset_query(); ?>
		
		
		</div>
		<div class="row" data-aos="fade-down" data-aos-duration="3000">
			<div class="col-md-12 text-center">
				<a href="<?php echo get_site_url(); ?>/gallery" class="commonButton">View more</a>
			</div>
		</div>
	</div>
</section>


	<!-- About Section -->
	<section class="about-section d-none">
		<div class="auto-container">
			<div class="row">
				<!-- Image Column -->
				<div class="image-column col-lg-6 col-md-12 col-sm-12">
					<div class="about-image-wrapper">
						<figure class="bg-shape zoom-one" data-wow-delay="600ms"><img src="<?php echo get_field('about_section_image1'); ?>"
								alt="" /></figure>
						<figure data-aos="zoom-in" data-aos-duration="3000" class="image-1" data-wow-delay="300ms"><img src="<?php echo get_field('about_section_image2'); ?>"
								alt="" /></figure>
						<figure data-aos="zoom-in" data-aos-duration="2000" class="image-2 wow zoomIn" data-wow-delay="900ms"><img src="<?php echo get_field('about_section_image3'); ?>"
								alt="" /></figure>
					</div>
				</div>
	
				<!-- Content Column -->
				<div class="content-column col-lg-6 col-md-12 col-sm-12">
					<div class="inner-column wow fadeInRight">
						<div class="sec-title">

							<h2 data-aos="fade-right" data-aos-duration="3000"><?php echo get_field('about_section_title'); ?></h2>
							<span data-aos="fade-right" data-aos-duration="3000" class="divider"></span>
							<div class="text" data-aos="fade-right" data-aos-duration="3000"><?php echo get_field('about_section_heading'); ?></div>
						</div>
						<div class="info-box" data-aos="fade-right" data-aos-duration="3000">
							<?php echo get_field('about_section_description'); ?>
						
							
							<?php if(get_field('is_it_video_url'))
							{ ?>
							<a href="<?php echo get_field('about_section_video_url'); ?>" class="lightbox-image video-box">
								<img src="<?php echo get_field('about_section_video_image'); ?>" alt="">
								<span class="icon fa fa-play"></span>
							</a>
						<?php }
						else{
							?>
							<a href="<?php echo get_field('about_section_video_link'); ?>" class="lightbox-image video-box">
								<img src="<?php echo get_field('about_section_video_image'); ?>" alt="">
								<span class="icon fa fa-play"></span>
							</a>

						<?php }

						 ?>
						</div>
						<a data-aos="zoom-in" data-aos-duration="3000" href="https://app.joinit.com/o/cannabis-club-new-zealand" class="theme-btn btn-style-one">Become A Member</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End About Section -->

	<!-- Products Section -->
	<!--<section class="products-section pt-0">
		<div class="auto-container">
			<div class="sec-title text-center">
				<span class="sub-title" data-aos="fade-right" data-aos-duration="3000">Our New Products</span>
				<h2 data-aos="fade-right" data-aos-duration="3000">Popular Products</h2>
				<span class="divider"></span>
			</div>
	
			<div class="products-carousel owl-carousel owl-themes" data-aos="fade-down" data-aos-duration="3000">
				<?php
      	$args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'id',
        'order' => 'ASC',
      );

      	$loop = new WP_Query($args);
		while ($loop->have_posts()) : $loop->the_post();
        $image = wp_get_attachment_url(get_post_thumbnail_id($post->ID) );
      ?>
				
				<div class="product-block">
					<div class="inner-box">
						<div class="image-box">
							<div class="image"><a href="<?php the_permalink(); ?>"><img src="<?php echo $image; ?>" alt="" /></a></div>
							<div class="icon-box">
								<a href="<?php the_permalink(); ?>" class="ui-btn"><i class="fa fa-eye"></i></a>
								<a href="<?php echo get_site_url(); ?>/cart" class="ui-btn"><i class="fa fa-shopping-cart"></i></a>
							</div>
						</div>
						<div class="content">
							<span class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span>
							<h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
							<span class="price"><?php echo $product->get_price_html(); ?></span>
						</div>
					</div>
				</div>
				<?php 
				endwhile;
				wp_reset_postdata();
				?>

				
			</div>
		</div>
	</section> -->
	<!-- End Products Section -->

	<div class="commonShap proSherp ">
		<img src="<?php echo get_template_directory_uri(); ?>/images/proshap.png">
	</div>

	<section class="features-section ">
		<div class="large-container">
			<div class="row">
				
				<div class="feature-block col-lg-6 col-md-6 col-sm-12" data-aos="zoom-in" data-aos-duration="3000">
					<div class="inner">
						<span class="icon flaticon-cannabis-card"></span>
						<h5><?php echo get_field('membership_title'); ?></h5>
						<div class="text"><?php echo get_field('membership_heading'); ?></div>
					</div>
				</div>
	
				
				<div class="feature-block col-lg-6 col-md-6 col-sm-12" data-aos="fade-up" data-aos-duration="3000">
					<div class="inner">
						<span class="icon flaticon-cannabis-delivery-truck"></span>
						<h5><?php echo get_field('store_title'); ?></h5>
						<div class="text"><?php echo get_field('store_heading'); ?></div>
					</div>
				</div>

			<!--	<div class="feature-block col-lg-6 col-md-6 col-sm-12" data-aos="zoom-in" data-aos-duration="3000">
					<div class="inner">
						<span class="icon flaticon-cannabis-card"></span>
						<h5><?php echo get_field('return_policy_title'); ?></h5>
						<div class="text"><?php echo get_field('return_policy_heading'); ?></div>
					</div>
				</div>
	
				
				<div class="feature-block col-lg-6 col-md-6 col-sm-12" data-aos="fade-up" data-aos-duration="3000">
					<div class="inner">
						<span class="icon flaticon-cannabis-delivery-truck"></span>
						<h5><?php echo get_field('free_shipping_title'); ?></h5>
						<div class="text"><?php echo get_field('free_shipping_heading'); ?></div>
					</div>
				</div> -->
	
				
				<!--<div class="feature-block col-lg-3 col-md-6 col-sm-12" data-aos="zoom-in" data-aos-duration="3000">
					<div class="inner">
						<span class="icon flaticon-cannabis-store"></span>
						<h5><?php //echo get_field('store_locator_title'); ?></h5>
						<div class="text"><?php //echo get_field('store_locator_heading'); ?></div>
					</div>
				</div>
	
				
				<div class="feature-block col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-duration="3000">
					<div class="inner">
						<span class="icon flaticon-cannabis-certification"></span>
						<h5><?php //echo get_field('secure_payments_title'); ?></h5>
						<div class="text"><?php //echo get_field('secure_payments_heading'); ?></div>
					</div>
				</div> -->
				
			</div>
		</div>


        <div class="frms-section d-none">
		   <div class="sec-title text-center">

			 <h2 class="text-white">Become a Member</h2>
			 <span class="divider"></span>
		   </div>
			<div class="row g-0">
				<!-- FAQ Column -->
				<div class="faq-column col-md-6 col-sm-12">
						<div class="formbyk">
								<form>
								<div class="row">
								  <div class="col-md-12">
                                   <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Your Name">
                                    </div>
                                   </div>
                                   <div class="col-md-12">
                                    <div class="mb-3">
                                     <input type="email" class="form-control" placeholder="Email Address">
                                    </div>
                                   </div>
                                   <div class="col-md-12">
                                    <div class="mb-3">
                                     <input type="tel" class="form-control" placeholder="Phone">
                                    </div>
                                   </div>
                                   <div class="col-md-12">
                                    <textarea class="form-control" rows="5" placeholder="Write a Message"></textarea>  
                                   </div>
                                   <div class="col-md-6">
                                   <div class="text-start">
                                    <a href="#" class="commonButton">Submit</a>
                                   </div>
                                   </div>
								</div>
							</form>
						</div>
				    </div>
	
				<!-- Image Column -->
				<div class="col-md-6 col-sm-12">
					<div class="imgbody">
						<img src="<?php echo get_template_directory_uri(); ?>/images/resource/faq.jpg" alt="">
					</div>	
				</div>
			</div>
	</div>
	</section>

	<!-- FAQ Section -->
	<section class="faqs-section d-none">
		<div class="container">
		
			<div class="row">
				<!-- FAQ Column -->
				<div class="faq-column col-lg-7 col-md-12 col-sm-12 order-4">
					<div class="inner-column">
						<div class="sec-title">
							<span class="title" data-aos="fade-right" data-aos-duration="3000">Frequently Asked Questions</span>
							<h2 data-aos="fade-down" data-aos-duration="3000">You’ve Any Question?</h2>
							<span class="divider"></span>
						</div>
	
						<ul class="accordion-box">
							<!--Block-->
							<li class="accordion block ">
								<div class="acc-btn">How long does medical cannabis treatment take? <div
										class="icon fa fa-angle-right"></div>
								</div>
								<div class="acc-content">
									<div class="content">
										<div class="text">Suspendisse finibus urna mauris, vitae consequat quam vel. ullamcorper vulputate vitae sodales commodo nisl. Nulla facilisi. Pellentesque est metus many of some form.</div>
									</div>
								</div>
							</li>
	
							<!--Block-->
							<li class="accordion block active-block">
								<div class="acc-btn active">How long does medical cannabis treatment take?<div
										class="icon fa fa-angle-right"></div>
								</div>
								<div class="acc-content current">
									<div class="content">
										<div class="text">Suspendisse finibus urna mauris, vitae consequat quam vel. ullamcorper vulputate vitae sodales commodo nisl. Nulla facilisi. Pellentesque est metus many of some form.</div>
									</div>
								</div>
							</li>
	
							<!--Block-->
							<li class="accordion block">
								<div class="acc-btn">How long does medical cannabis treatment take?
									<div class="icon fa fa-angle-right"></div>
								</div>
								<div class="acc-content">
									<div class="content">
										<div class="text">Suspendisse finibus urna mauris, vitae consequat quam vel. ullamcorper vulputate vitae sodales commodo nisl. Nulla facilisi. Pellentesque est metus many of some form.</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
	
				<!-- Image Column -->
				<div class="image-column col-lg-5 col-md-12 col-sm-12">
					<div class="inner-column">
						<figure class="image"><img src="images/resource/faq.jpg" alt=""></figure>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!--End FAQ Section -->


  <!--------Sohom's Part start--------->

  	<!--<section class="frms-section">
		<div class="container">
		   <div class="feature_block_top">
			   	<div class="sec-title text-center">
				 <h2 class="text-white" data-aos="fade-down" data-aos-duration="3000">Become a Member</h2>
				 <span class="divider"></span>
			   </div>
				<div class="row g-0">
					
					<div class="faq-column col-md-12 col-sm-12" data-aos="zoom-in" data-aos-duration="3000">
							<div class="formbyk">
								<iframe src="https://app.joinit.com/embed/cannabis-club-new-zealand/TZ7cBkwJaNF2f6kAL/membership-types" frameBorder="0" width="100%" height="500px"></iframe>
								<?php //echo do_shortcode('[contact-form-7 id="50" title="Contact form 1"]'); ?> 

							</div>
					    </div> 
		
					
					<div class="col-md-6 col-sm-12">
						<div class="imgbody" data-aos="fade-down" data-aos-duration="3000">
					<img src="<?php //echo get_template_directory_uri(); ?>/images/blgnw.png" alt="">
						</div>	
					</div>
				</div>
		   </div>
		</div>
	</section> -->


  <!--------Sohom's Part end--------->

	<!-- Testimonial Section -->
	<section class="testimonial-section d-none">
		<div class="auto-container">
			<div class="sec-title text-center">
				<span class="sub-title">Our Customers Feedbacks</span>
				<h2>What They’re Talking</h2>
				<span class="divider"></span>
			</div>
	
			<div class="outer-box">
				<!-- Testimonial Carousel -->
				<div class="testimonial-carousel owl-carousel owl-theme">
					
					<!-- Testimonial Block -->
					<div class="testimonial-block">
						<div class="inner-box">
							<div class="thumb">
								<img src="images/resource/testi-thumb-1.jpg" alt="">
								<span class="icon fa fa-quote-left"></span>
							</div>
							<div class="text">I was very impresed by the osfins service lorem ipsum is simply free text used by copy typing refreshing. Neque porro est qui dolorem ipsum.</div>
							<h4 class="name">Jessica Brown</h4>
							<span class="designation">Customer</span>
						</div>
					</div>
		
					<!-- Testimonial Block -->
					<div class="testimonial-block">
						<div class="inner-box">
							<div class="thumb">
								<img src="images/resource/testi-thumb-2.jpg" alt="">
								<span class="icon fa fa-quote-left"></span>
							</div>
							<div class="text">I was very impresed by the osfins service lorem ipsum is simply free text used by copy typing
								refreshing. Neque porro est qui dolorem ipsum.</div>
							<h4 class="name">Jessica Brown</h4>
							<span class="designation">Customer</span>
						</div>
					</div>
		
					<!-- Testimonial Block -->
					<div class="testimonial-block">
						<div class="inner-box">
							<div class="thumb">
								<img src="images/resource/testi-thumb-3.jpg" alt="">
								<span class="icon fa fa-quote-left"></span>
							</div>
							<div class="text">I was very impresed by the osfins service lorem ipsum is simply free text used by copy typing
								refreshing. Neque porro est qui dolorem ipsum.</div>
							<h4 class="name">Jessica Brown</h4>
							<span class="designation">Customer</span>
						</div>
					</div>

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


<?php get_footer(); ?>