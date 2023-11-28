<?php /* Template Name: Our blog */ ?>
<?php get_header();?>


	<!--Main Slider-->
	<section class="main-slider innerBanner">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title-outer">
						<h1 data-aos="fade-right" data-aos-duration="3000" class="title text-white">Blog</h1>
						<ul class="page-breadcrumb" data-aos="fade- " data-aos-duration="3000">
							<li><a href="index.html">Home</a></li>
							<li>Blog</li>
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


	<section class="blog_page py-5">
         <div class="container">
         	<?php 
         	 $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

         	$allposts = new WP_Query(array('post_type'=>'post','posts_per_page'=>3,'post_status'=>'publish','paged'=>$paged)); ?>
            <div class="row">

            	<?php while($allposts->have_posts()):$allposts->the_post(); ?>

               <div class="col-md-4">
                  <div class="blogbx mb-5">
                     <div class="blogimg">
                        <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" alt="">
                     </div>
                     <div class="blogcnt">
                        <p><?php echo wp_trim_words(get_the_content(),20,'...'); ?></p>
                        <div class="rdmrbn mt-2">
                           <a href="<?php the_permalink(); ?>" class="btnrdm">Read More</a>
                        </div>
                     </div>
                  </div>
               </div>
           <?php endwhile; wp_reset_query(); ?>
         
            </div>
             <?php wp_pagenavi(array('query'=>$allposts)); ?>
         </div>
        
      </section>
	<!--End Clients Section -->


<?php get_footer() ;?>
