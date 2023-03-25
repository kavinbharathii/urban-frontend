
<script>

import { db, db_rt } from "@/views/firebase.js"
import { get, ref } from "@firebase/database";
import { setDoc, doc, getDocs, collection } from "@firebase/firestore";

export default {
    data() {
        return {    
            bookedData: {},
        }
    },
    methods: {
        async getAllBookedItems() {
            const bookedServices = await get(ref(db_rt, 'Booking'))
            const data = bookedServices.val()
            console.log(data)
            this.bookedData = data

            console.log(this.bookedData)
        },
    },
    async mounted() {
        this.getAllBookedItems()
    }

}

</script>

<template>
    <div id="dev">
    
        <!-- rendering booked data -->
        <div v-for="(userName, index1) in this.bookedData" :key="index1" class="user-card">
            <h1>{{ index1 }}</h1>
            <div v-for="(date, index2) in userName" :key="index2">
                <h2>{{ index2 }}</h2>
                <div v-for="(time, index3) in date" :key="index3">
                    <h3>{{ index3 }}</h3>
                    <div v-for="(Address, index4) in time.Address" :key="index4"> {{ index4 }}
                        <p> {{ Address }} </p>
                    </div>
                    <div v-for="(services , index5 ) in time.services" :key="index5"> {{index5}}
                        {{services}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#dev {
    width: 100vw;
    height: 100vh;
}



#edit-services {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.user-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: #a9a9a9;
    border-radius: 10px;
    border: 1px solid #c5c5c5;
}
</style>
