
<script>

import { db, db_rt } from "@/views/firebase.js"
import { get, ref } from "@firebase/database";
import { setDoc, doc, getDocs, collection } from "@firebase/firestore";

export default {
    data() {
        return {
            newServiceForm: {
                serviceName: "",
                categoryName: "",
                price: "",
                timing: ""
            },
            categories: [
                "Computer",
                "CCTV"
            ],
        }
    },
    methods : {

        // add a new service
        addNewService() {
            if (this.newServiceForm.serviceName == "" || this.newServiceForm.categoryName == "" ||
                this.price == "" || this.newServiceForm.timing == "") {
                console.log("Fill it properly da")
            } else {
                console.log(this.newServiceForm)
                setDoc(doc(db, this.newServiceForm.categoryName.category + '/' + this.newServiceForm.serviceName), {
                    rating: "10",
                    rupee: this.newServiceForm.price,
                    timing: this.newServiceForm.timing
                }).then(() => {
                    
                    for (let i in this.newServiceForm) {
                        this.newServiceForm[i] = ''
                    }
                    console.log("New service added successfully")

                }).catch((err) => {
                    console.log(err)
                })
            }
        },
    }
}
</script>

<template>
    <div>
        <form id="add-new-service">
            <h3>Add new service</h3>
            <label for="">
                Service Name:
                <input type="text" v-model="this.newServiceForm.serviceName">
            </label>

            <label for="">
                Category:
                <select required v-model="this.newServiceForm.categoryName" >
                    <option :value="{category}" v-for="(category , index) in this.categories" :key="index">{{ category }}</option>
                </select>
            </label>

            <label for="">
                Price:
                <input type="number" v-model="this.newServiceForm.price">
            </label>

            <label for="">
                Timing:
                <input type="text" v-model="this.newServiceForm.timing">
            </label>

            <button @click.prevent="addNewService">Add Service</button>
        </form>
    </div>
</template>


<style scoped>
#add-new-service {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>