
<script>

import { db } from "@/views/firebase.js"
import { setDoc, doc } from "@firebase/firestore";

export default {
    data() {
        return {
            addNewCategory: {
                collectionName: "",
                serviceName: "",
                price: "",
                timing: ""
            },
        }
    },
    methods: {

        // add new category 
        async createNewCollection() {

            const collectionName = this.addNewCategory.collectionName;
            const newDocID = this.addNewCategory.serviceName;
            const newData = { rupee: this.addNewCategory.price, timing: this.addNewCategory.timing };
            const newDocRef = doc(db, collectionName, newDocID);

            await setDoc(newDocRef, newData)
            .then(() => {
                console.log('added successfully')
                for (let i in this.addNewCategory) {
                    this.addNewCategory[i] = ''
                }
            })
            .catch((err) => {
                console.log('Error :',err)
            })
        },
    }
}
</script>

<template>
    <div>
        <!-- add new category -->
        <div>
            <form @submit.prevent="createNewCollection()">
                <input type="text" placeholder="categoryname" v-model="addNewCategory.collectionName">
                <input type="text" placeholder="servicename" v-model="addNewCategory.serviceName">
                <input type="text" placeholder="timing" v-model="addNewCategory.timing">
                <input type="number" placeholder="rupee" v-model="addNewCategory.price">
                <input type="submit">
            </form>
        </div>
    </div>
</template>


<style scoped>

</style>