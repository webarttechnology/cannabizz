<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header(); ?>
<section class="main-slider innerBanner">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title-outer">
						<h1 data-aos="fade-right" data-aos-duration="3000" class="title text-white">Blog details</h1>
						<ul class="page-breadcrumb" data-aos="fade- " data-aos-duration="3000">
							<li><a href="index.html">Home</a></li>
							<li>Blog details</li>
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
<section class="blog_details py-5">
	<div class="container">
		<div class="row">
			<?php while(have_posts()):the_post(); ?>
			<div class="col-md-12">
				<h1 class="pb-3 mb-0"><?php the_title(); ?></h1>
				<div class="iconspb py-3">
					<span class="text-new me-2"><i class="fas fa-user mr-2"></i>By  <?php echo get_the_author(); ?></span>
					<span><i class="fas fa-calendar-alt mr-2"></i> <?php echo get_the_date(); ?></span>
				</div>
				<div class="blog_main">
					<div class="blog_left">
						<img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" alt="">
					</div>
					<div class="blog_right">
					   <?php the_content(); ?>
					</div>
				</div>
			</div>
		<?php endwhile; ?>
		</div>
	</div>
</section>


<?php 

get_footer();
