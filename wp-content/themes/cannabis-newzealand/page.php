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

get_header();
while(have_posts()):the_post();
?>
	<section class="main-slider innerBanner">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title-outer">
						<h1 data-aos="fade-right" data-aos-duration="3000" class="title text-white"><?php the_title(); ?></h1>
						<ul class="page-breadcrumb" data-aos="fade- " data-aos-duration="3000">
							<li><a href="<?php echo get_site_url(); ?>">Home</a></li>
							<li><?php the_title(); ?></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
<?php endwhile; ?>
<section class="innersecgeneral">
<div class="container">
	

<?php
/* Start the Loop */
while ( have_posts() ) :
	the_post();
	//get_template_part( 'template-parts/content/content-page' );
	the_content();

	// If comments are open or there is at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}
endwhile; // End of the loop.
?>
</div>
</section>
<?php
get_footer();
