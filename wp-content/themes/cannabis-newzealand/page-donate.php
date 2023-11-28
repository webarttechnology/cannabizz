<?php /* Template Name: Donate Page */ ?>
<?php get_header();?>


	<!--Main Slider-->
	<section class="main-slider innerBanner">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title-outer">
						<h1 data-aos="fade-right" data-aos-duration="3000" class="title text-white">Donate</h1>
						<ul class="page-breadcrumb" data-aos="fade- " data-aos-duration="3000">
							<li><a href="index.html">Home</a></li>
							<li>Donate</li>
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


	<!-- Donate Section -->
	<section class="donateSection">
		<div class="auto-container">
			<div class="row">
				<div class="col-12">
					<h2>Your community donations support:</h2>
					<p>Every day members tap into their networks on Cannabis Club New Zealand website to inspire generosity and support causes that they care about. Here Cannabis Club New Zealand members support the planet by regular donations to Greenpeace.</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<ul class="d_form-tab py-3">
						<li><span>1</span> Your Details</li>
						<li><span>2</span></li>
						<li><span>3</span></li>
					</ul>
					<ul class="radioList pb-3" id="myRadioGroup">
						<li>
							<input type="radio" name="radioList" checked="checked" value="1" id="radioList_1">
							<label for="radioList_1">$15</label>
						</li>
						<li>
							<input type="radio" name="radioList" value="2" id="radioList_2">
							<label for="radioList_2">$30</label>
						</li>
						<li>
							<input type="radio" name="radioList" value="3" id="radioList_3">
							<label for="radioList_3">$60</label>
						</li>
					</ul>
					<div class="row pb-3">
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="First Name*">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Last Name*">
						</div>
					</div>
					<div class="row pb-3">
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Phone Number*">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Email Address*">
						</div>
					</div>
					<div class="row pb-3">
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Address">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Address Line 2">
						</div>
					</div>
					<div class="row pb-3">
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Suburb">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="City">
						</div>
					</div>
					<div class="row pb-3">
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="State">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" name="" placeholder="Postal code">
						</div>
					</div>
					<div class="row pb-3">
						<div class="col-md-12">
							<button class="btn-style-one" type="submit">Next</button>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div id="RadioList1" class="desc">
						<h1>$15</h1>
						<h3>CONGRATULATIONS YOU QUALIFY FOR AN HONARARY MEMBERSHIP</h3>
						<p> </p>
					</div>
					<div id="RadioList2" class="desc" style="display: none;">
						<h1>$30</h1>
						<h3>CONGRATULATIONS YOU QUALIFY FOR AN HONARARY MEMBERSHIP</h3>
						<p></p>
					</div>
					<div id="RadioList3" class="desc" style="display: none;">
						<h1>$60</h1>
						<h3>CONGRATULATIONS YOU QUALIFY FOR AN HONARARY MEMBERSHIP</h3>
						<p></p>
					</div>

				</div>
			</div>
			<div class="row">

				<?php while(have_posts()):the_post(); ?>
				<?php the_content(); ?>
			<?php endwhile; ?>
				<div class="col-md-5">
					<img src="https://webbersunited.com/cms/cannabis-newzealand/wp-content/uploads/2023/03/typical-kiwi-boys-swimming-nzstory-665x443-1.png" />
				</div>
				<div class="col-md-7">
					<h3>
					Can you imagine if your child was one those unfortunate children? 
					</h3>
					<p>
							Knowing that your precious child may not eat today, have a place to sleep today, or even to know if they may be alive by the end of today. 

		That is the sad hard reality of many children in New Zealand, today. 

		New Zealand is ranked as the worst developed country in the OECD for family violence. In NZ only 33% of family violence is reported. On average police attend a family violence episode every 4 minutes. 67% of family violence episodes remain unreported.

					</p>
				</div>

				<!--<div class="col-md-7 mt-4">
					<h3>How many children in New Zealand are diagnosed with Cancer every year?</h3>
				
						<p>
									In Aotearoa, New Zealand, about 150 children (birth to 14 years) are diagnosed with cancer each year.15/12/2022

				 <a href="https://www.healthnavigator.org.nz">https://www.healthnavigator.org.nz</a>
				<strong>Childhood cancer</strong>

				Childhood Cancer is rare and most children are cured as the result of treatment. This page provides information for families/whānau of children with cancer to help you get through this difficult time, and links you to more resources.

				<b>Childhood Cancer Reference</b>
				<a href="https://www.healthnavigator.org.nz/health">https://www.healthnavigator.org.nz/health</a> 

				The statistics in New Zealand for child violence

				887 cases of common assault. 3,077 cases of serious assault without injury. 1,846 cases of serious assault resulting in injury. 1,488 cases of aggravated sexual assault.

				<a href="https://www.childmatters.org.nz">https://www.childmatters.org.nz</a>
				NZ Child Abuse Statistics

						</p>
				</div>
				<div class="col-md-5">
					<img src="https://webbersunited.com/cms/cannabis-newzealand/wp-content/uploads/2023/03/typical-kiwi-boys-swimming-nzstory-665x443-1.png" />
				</div>
				<div class="col-md-5 mt-4">
					<img src="https://webbersunited.com/cms/cannabis-newzealand/wp-content/uploads/2023/03/typical-kiwi-boys-swimming-nzstory-665x443-1.png" />
				</div>
				<div class="col-md-7">
					<h3>
					What are the statistics for child deaths in New Zealand? 
					</h3>
					<p>
						On average, 1 child dies every 5 weeks in New Zealand
					</p>
				</div>
				<div class="col-md-7 mt-4">
					<h3>How many children are neglected in New Zealand? </h3>
				
						<p>
							The number of possible child abuse or neglect cases in New Zealand amounted to 191.3 thousand in 2018. Prevention of child abuse is a high priority for the New Zealand government, as the prevalence of such abuse is relatively high when compared to other developed countries.3/01/2023.
						</p>
				</div>
				<div class="col-md-5 mt-4">
					<img src="https://webbersunited.com/cms/cannabis-newzealand/wp-content/uploads/2023/03/typical-kiwi-boys-swimming-nzstory-665x443-1.png" />
				</div>
				<div class="col-md-5 mt-4">
					<img src="https://webbersunited.com/cms/cannabis-newzealand/wp-content/uploads/2023/03/typical-kiwi-boys-swimming-nzstory-665x443-1.png" />
				</div>
				<div class="col-md-7 mt-4">
					<h3>What is the leading cause of death in children in New Zealand? </h3>
					<p>
						For children and young people overall, the leading causes of death were medical conditions (38.3%), including neoplasms and congenital anomalies. Unintentional injury accounted for 30.6% of deaths overall, with transport crashes being the leading cause of unintentional injury death.
					</p>
				</div>
				<div class="col-md-7 mt-4">
					<h3>How many children are in care in New Zealand? </h3>
					<p>
						Tamariki or children and rangatahi or young people in care as at 30 September 2022: 4,600 children and young people are currently in the Care and Protection custody of the Chief Executive. Gender: 46% Female.10/01/2023
					</p>
				</div>
				<div class="col-md-5 mt-4">
					<img src="https://webbersunited.com/cms/cannabis-newzealand/wp-content/uploads/2023/03/typical-kiwi-boys-swimming-nzstory-665x443-1.png" />
				</div> -->
				
				<p class="mt-4">
					Well, guess what?... You can help them. 
					Regardless of your financial, social or cultural differences. .
					<br/>
					Helping to make this possible is our business community: our Principal Partner, Cannabis Club New Zealand , Major Brand Partners, Associate Brand Partners, our Gold Member Business Supporters and all our members. The financial and in-kind support of our business community enables us reach more children in need, together we help participate in education and learning each year.  
					<br/>
					PARTNER WITH CANNABIS CLUB NEW ZEALAND TODAY 
					Make a difference, because you can. (here)
					<br/>
					Partnering with Cannabis Club New Zealand 
					<br/>
					Our Cannabis Club New Zealand brand partners are truly invested in the education, health and wellbeing of Kiwi's to help break the cycle of poverty, sickness and abuse. They work with us to help children in need and to help maintain mental health in our homes and workplaces. To create meaningful, measurable differences for their teams, customers and community. Their support includes financial and in-kind donations, plus many members are volunteering their time and resources.  
					<br/>
					Our Cannabis Club New Zealand brand partner supporters are businesses who want to make a difference to their communities. They do this by giving an annual donation. 
				</p>
				
				<h3>
					Our principle Social Partners
				</h3>
				<div class="col-md-4">
					<div class="partnerBox">
						<h4>
							Child Cancer Foundation (NZ) 
						</h4>
						<p>
							Aims to ensure children and their families are supported, informed and well cared for on their journey with cancer. 
						</p>
						<strong> Freephone 0800 4 CHILD (0800 4 24453) </strong>
						<a href="mailto:info@childcancer.org.nz">info@childcancer.org.nz </a>
					</div>
				</div>
				<div class="col-md-4">
					<div class="partnerBox">
						<h4>
							I AM HOPE Foundation (NZ) 
						</h4>
						<p>
							Changing attitudes around Mental Health
I AM HOPE aims to promote positive attitudinal societal change around mental health throughout New Zealand, offering hope and a voice to young people.
Free call or text 1737 anytime to talk with a trained counsellor 24/7.
						</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="partnerBox">
						<h4>
							Kidscan Charitable Trust 
						</h4>
						<p>
							KidsCan is Aotearoa New Zealand’s leading charity dedicated to helping Kiwi kids affected by poverty. We help tamariki experiencing hardship by providing food, jackets, shoes and health products to schools and early childhood centres across New Zealand.
						</p>
						<strong>  phone 09 478 1625 </strong>
						<a href="mailto:info@kidscan.org.nz">info@kidscan.org.nz</a>
					</div>
				</div>
				<div class="col-md-4">
					<div class="partnerBox">
						<h4>
							CannaSouth
						</h4>
						<p>
							We are a vertically integrated biopharmaceutical company dedicated to advanced product development and research. 
						</p>
						<strong> Freephone 07 949 8393 </strong>
						<a href="mailto:enquiries@cannasouth.co.nz">enquiries@cannasouth.co.nz</a>
					</div>
				</div>
				<div class="col-md-4">
					<div class="partnerBox">
						<h4>
							Greenpeace 
						</h4>
						<p>
							We act on the knowledge that people are part of nature, on the certainty that a better world is possible, and on the evidence that when we work together, we can make a difference. 
						</p>
						<strong> Freephone 09-6306317 </strong>
						<a href="mailto:info@greenpeace.org.nz">info@greenpeace.org.nz </a>
					</div>
				</div>
				<div class="col-md-4">
					<div class="partnerBox">
						<h4>
							Koru Care 
						</h4>
						<p>
							Koru Care (NZ) is a registered charitable trust. Our volunteer team work for no financial reward, donating time and expertise to make dreams come true for kids who have drawn the short straw.
						</p>
						<strong> phone 09 5232456 </strong>
						<a href="mailto:info@korucare.co.nz">info@childcancer.org.nz </a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End Donate Section -->

	
	<!--End Clients Section -->

	<div class="commonShap proSherp">
		<img src="<?php echo get_template_directory_uri(); ?>/images/proshap.png">
	</div>



	


<?php get_footer() ;?>
