import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import categoryServices from '../views/services/categoryServices.vue'
import signIn from '../views/services/signIn.vue'
import signUp from '../views/services/signUp.vue'
import cart from '../views/cartView.vue'
import adminPage from '../components/adminpage/adminPage.vue'
import orders from '../views/order.vue'
import addservices from '../components/adminpage/addservices.vue'
import addcategory from '../components/adminpage/addcategory.vue'
import editservices from '../components/adminpage/editservices.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '',
			component: Home
		},
		{
			path: '/signin',
			component: signIn
		},
		{
			path: '/signup',
			component: signUp
		},
		{
			path: '/cart',
			component: cart,
		},
		{
			path: '/yourorders',
			component: orders,
			props(route) {
				return {  useremail : route.query.useremail }
			}
		},
		{
			path: '/cctv-services',
			component: categoryServices,
			props: {
				categoryName: 'CCTV'
			}
		},
		{
			path: '/computer-services',
			component: categoryServices,
			props: {
				categoryName: 'Computer'
			}
		},
		{
			path: '/electrician-services',
			component: categoryServices,
			props: {
				categoryName: 'Electrician'
			}
		},
		{
			path: '/admin',
			component: adminPage
		},
		{
			path:'/admin/addservices',
			component: addservices
		},
		{
			path:'/admin/addcategory',
			component: addcategory
		},
		{
			path:'/admin/editservices',
			component: editservices
		}
	]
})

export default router
