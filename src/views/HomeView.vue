
<script>
import aboutUs from '../components/homepage/aboutus.vue'
import contactUs from '../components/homepage/contactus.vue'
import CategoryCard from '../components/homepage/CategoryCard.vue'
import homevue from '../components/homepage/Home.vue'

export default {

	data() {
		return {

		};
	},

	components: {
		homevue,
		CategoryCard,
		contactUs,
		aboutUs,
	}
}

</script>

<template>
	<div id="dev">

		<div class="header">
			<div>
				<h1 class="logo">IT Arena</h1>
			</div>
			<div>
				<nav class="nav-bar navbar navbar-expand-sm navbar-dark">	
					<div class="container">
						<button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="navbarNavAltMarkup" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="n_bar">
							<ul class="navbar-nav">
								<li class="nav-item active"><a class="nav-link" href="#home">Home</a></li>
								<li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
								<li class="nav-item"><a class="nav-link" href="#about">About</a></li>
								<li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>

		<div class="full-page">

			<div class="page" id="home">
				<homevue />
			</div>

			<div class="page" id="services">
				<div class="p2 vh-100 vw-100">
					<div class="cards-container">
						<div class="cards-col col-one">
							<router-link to="/computer-services">
								<CategoryCard categoryName="Computer" description="Description." />
							</router-link>
							<router-link to="/laptop-services">
								<CategoryCard categoryName="Laptop" description="Description." />
							</router-link>
						</div>

						<div class="cards-col col-two">
							<router-link to="/cctv-services">
								<CategoryCard categoryName="CCTV" description="Description." />
							</router-link>
							<router-link to="/printer-services">
								<CategoryCard categoryName="Printer" description="Description." />
							</router-link>
							<router-link to="/ups-services">
								<CategoryCard categoryName="UPS" description="Description." />
							</router-link>
						</div>

						<div class="cards-col col-three">
							<router-link to="/electrician-services">
								<CategoryCard categoryName="Electrician" description="Description." />
							</router-link>
							<router-link to="/plumbing-services">
								<CategoryCard categoryName="Plumbing" description="Description." />
							</router-link>
						</div>
					</div>
				</div>
			</div>

			<div class="page vh-100 vw-100" id="about">
				<aboutUs />
			</div>

			<div id="contact">
				<contactUs />
			</div>

		</div>
		<router-view></router-view>
	</div>
</template>

<style scoped>
.nav-bar {
	text-decoration: none;
	z-index: 100;
}


.header {
	margin-top: .3em;
	display: flex;
	justify-content: space-between;
}

.collapse {
	justify-content: end;
}

button {
	background-color: #171717;
}

.logo {
	margin-left: 1.5em;
	margin-top: .2em;
}

.nav-links {
	margin-right: 1.5em;

	display: flex;
	flex-direction: row;
	gap: 0.4em;
}

.nav-link {
	text-decoration: none;
	text-transform: uppercase;

	position: relative;
	z-index: 1;
	color: #171717;
	margin: 0 0.5em 0 0.5em;
}

.nav-link:hover {
	color: #171717;
}

.nav-link::before {
	content: '';
	position: absolute;
	z-index: -1;
	top: 0;
	bottom: 0;
	left: -0.25em;
	right: -0.25em;
	background-color: #fc3171bf;
	transform-origin: center right;
	transform: scaleX(0);
	transition: transform 0.2s ease-in-out;
}

.nav-link:hover::before {
	transform: scaleX(1);
	transform-origin: center left;
}

.p3 {
	background-color: rgb(22, 192, 156);
}

.cards-container {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;

	justify-content: center;
	align-items: center;
	gap: 1.5em;

	min-width: 100vw;
	min-height: 100vh;
}

/* .full-page {
	max-width: 100vw;
	max-height: 100vh;
	overflow: scroll;
	scroll-snap-type: y mandatory;
} */

.page {
	scroll-snap-align: start;
}

a {
	text-decoration: none;
}

@media only screen and (max-width: 600px) {
    .cards-container {
		flex-direction: column;
		width: 100vw;
	}

	.cards-col {
		width: 100vw;
	}
}

</style>
