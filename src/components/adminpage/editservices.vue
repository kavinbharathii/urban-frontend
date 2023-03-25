
<script>

import { db, db_rt } from "@/views/firebase.js"
import { get, ref } from "@firebase/database";
import { setDoc, doc, getDocs, collection } from "@firebase/firestore";

export default {
    data() {
        return {
            editServiceForm: {
                serviceName: "",
                categoryName: "",
                price: "",
                timing: ""
            },
            servicesData: {},
            
            categories: [
                "Computer",
                "CCTV"
            ],
        }
    },
    methods: {
    
        // edit an existing service
        editService() {

            if (this.editServiceForm.categoryName == "" || this.editServiceForm.serviceName == "") {
                console.log("Invalid form")
            } else {
                if (this.editServiceForm.price == "" || this.editServiceForm.timing == "") {
                    console.log("Nothing to change")
                } else {
                    setDoc(doc(db, this.editServiceForm.categoryName + '/' + this.editServiceForm.serviceName), {
                        rating: "10",
                        rupee: this.editServiceForm.price,
                        timing: this.editServiceForm.timing
                    })
                    .then(() => {
                        for (let i in this.editServiceForm) {
                            this.editServiceForm[i] = ''
                        }
                        console.log('edit successfully')
                    })
                }
            }

            this.getServiceData()
        },

        // update queries of categories and services
        async getServiceData() {
            for (let category of this.categories) {
                const services = await getDocs(collection(db, category))
                this.servicesData[category] = []
                services.forEach(doc => {
                    // adding the services to the specific category
                    this.servicesData[category].push(doc.id)
                })
            }
        },

        async getAllBookedItems() {
            const bookedServices = await get(ref(db_rt, 'Booking'))
            const data = bookedServices.val()
            console.log(data)
            this.bookedData = data

            console.log(this.bookedData)
        },
    },
    async mounted() {
        this.getServiceData()
    }
}


</script>

<template>
    <div>
        <!-- --------------------------------------- edit services --------------------------------------- -->
        <form action="" id="edit-services">
            <h3>Edit service</h3>

            <label for="">
                Category:
                <select required v-model="this.editServiceForm.categoryName">
                    <option value="Computer">Computer</option>
                    <option value="CCTV">CCTV</option>
                </select>
            </label>

            <label for="">
                Services:
                <select required :disabled="this.editServiceForm.categoryName == ''"
                    v-model="this.editServiceForm.serviceName">
                    <option value=""></option>
                    <option :value="servicesUnderCategory"
                        v-for="(servicesUnderCategory, index) in this.servicesData[this.editServiceForm.categoryName]"
                        :key="index">
                        {{ servicesUnderCategory }}
                    </option>
                </select>
            </label>

            <label for="">
                Price:
                <input type="number" v-model="this.editServiceForm.price">
            </label>

            <label for="">
                Timing:
                <input type="text" v-model="this.editServiceForm.timing">
            </label>

            <button @click.prevent="editService">Edit Service</button>
        </form>
    </div>
</template>

<style scoped>

</style>