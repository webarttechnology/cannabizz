<?php /* Template Name: Gallery */ ?>
<?php get_header();?>


	<!--Main Slider-->
	<section class="main-slider innerBanner">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title-outer">
						<h1 data-aos="fade-right" data-aos-duration="3000" class="title text-white">Gallery</h1>
						<ul class="page-breadcrumb" data-aos="fade- " data-aos-duration="3000">
							<li><a href="<?php echo get_site_url(); ?>">Home</a></li>
							<li>Gallery</li>
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
	<section class="gallery">
		<div class="auto-container">
			<?php 
                $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

			$allgallery = new WP_Query(array('post_type'=>'our-gallery','posts_per_page'=>4,'post_status'=>'publish','paged'=>$paged)); ?>
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
			 <?php wp_pagenavi(array('query'=>$allgallery)); ?>
		</div>
	</section>
	<!-- End About Section -->

<?php get_footer() ;?>
