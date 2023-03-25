<script>


import { collection, getDocs } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth'


import serviceNavbar from './serviceNavbar.vue';
import Router from '@/router'
import { db, auth, db_rt } from '../firebase.js'

export default {
    name: "categoryServices",
    components: {
        serviceNavbar
    },
    props: {
        categoryName: String
    },
    data() {
        return {
            serviceName: [],
            providedServices: [],
            Loading: true,
            userName: "",
            userLoggedIn: false,
            loggedInUserName: ""
        }
    },
    mounted: function () {
        this.getData()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.userLoggedIn = true
                const uid = user.email
                let email_username = uid.split('@')[0]
                let valid_username = email_username.replaceAll(".", "")
                console.log("valid name", valid_username)
                this.userName = valid_username
                console.log(this.userName)
            } else {
                console.log("Can't get user e-mail")
                this.userLoggedIn = false
            }
        })

        console.log("User information")
        console.log(this.userLoggedIn)
    },
    methods: {
        async getData() {

            const querySnapshot = await getDocs(collection(db, this.categoryName));
            querySnapshot.forEach((doc) => {
                this.serviceName.push(doc.id)
                this.providedServices.push(Object(doc.data()))
            });
            this.Loading = false
        },
        subtract(id) {

            let btn = document.querySelector('#cart' + id.toString())

            if (parseInt(btn.innerHTML) != 'Add' && parseInt(btn.innerHTML) >= 1) {

                if (btn.innerHTML == 'Add') {
                    btn.innerHTML = 1
                } else {
                    if (parseInt(btn.innerHTML) == 1) { btn.innerHTML = 'Add'; return }
                    btn.innerHTML = parseInt(btn.innerHTML) - 1
                }
            }

        },
        addition(servicename, id, rupee, timing) {
            this.getUser(servicename, id, rupee, timing)
        },

        getUser(servicename, id, rupee, timing) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.email;
                    let email_username = uid.split('@')[0]
                    let valid_username = email_username.replaceAll(".", "")
                    this.userName = valid_username
                    this.addcart(servicename, id, rupee, timing)
                    this.userLoggedIn = true
                } else {
                    console.log("Can't get user e-mail")
                    setTimeout(() => { Router.push('/signup') }, 500)
                    this.userLoggedIn = false
                }
            })
        },

        addcart(servicename, id, rupee, timing) {
            let btn = document.querySelector('#cart' + id.toString())
            if (btn.innerHTML == 'Add') { btn.innerHTML = 1 }
            else { btn.innerHTML = parseInt(btn.innerHTML) + 1 }

            // realtime database section
            this.writeUserData(servicename, btn.innerHTML, rupee, timing)
        },

        writeUserData(servicename, quantity, rupee, timing) {
            try {
                console.log(this.userName, this.categoryName, quantity, rupee, timing)
                let category = this.categoryName;
                console.log(category, servicename, quantity, rupee, timing)
                set(ref(db_rt, this.userName + '/' + category + '/' + servicename), {
                    quantity: quantity,
                    rupee: rupee,
                    timing: timing,
                    booked: false
                })
                console.log('Added successfully')
            }
            catch (err) {
                console.log("error :", err)
            }
        }
    },
}
</script>


<template>
    <div>
        <serviceNavbar :showOptions="!this.userLoggedIn" :userName="this.userName" />
        <div class="main">
            <div class="name-img">
                <div class="name">
                    <div class="ser-name"> {{ this.categoryName }} Services </div>
                    <div> <strong>✩</strong> 4.86 (456K Booking)</div>
                </div>
                <div>
                    <!-- <img src="./images/computer.png" alt="com"> -->
                </div>
            </div>
            <div class="lin"></div>

            <button class="load-btn" v-if="this.Loading">
                <span class="spinner-border spinner-border-sm" style="color: white"></span>Loading..
            </button>


            <h3 v-if="!this.Loading">Provided Services with Pricing</h3>
            <div class="all-cards" v-if="!this.Loading">

                <div class="cards" v-for="(data, index) in this.providedServices" :key="index">
                    <div class="detail">
                        <div class="servicename">{{ this.serviceName[index] }}</div>
                        <div class="rating"><strong>✩</strong> {{ data.rating }} (456K Booking)</div>
                        <div class="rupee">
                            <strong>₹ {{ data.rupee }}.00</strong>
                            <span> • {{ data.timing }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="add-btn">
                            <span @click="subtract(index)">-</span>
                            <div :id="'cart' + index">Add</div>
                            <span @click="addition(this.serviceName[index], index, data.rupee, data.timing)">+</span>
                        </div>
                    </div>
                </div>

                <div class="free"></div>
            </div>

        </div>

    </div>
</template>

<style scoped>
* {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, "Helvetica Neue", Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif !important
}

.name-img {
    padding: 5em 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.name .ser-name {
    font-size: 36px;
    font-weight: 700;
    line-height: 48px;
}


.lin {
    width: 65%;
    background-color: #d4d4d4;
    height: 0.3em;
    margin: 0 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4em;
}

h3 {
    padding: 0 15%;
    margin-bottom: 2em;
}

.all-cards {
    padding: 0 15%;
    display: flex;
    flex-direction: column;
    row-gap: 2em;
}

.view-btn {
    background: none;
    outline: none;
    border: none;
    padding: 0;
    color: #fc3171bf;
}

.cards {
    padding: 1em;
    background-color: #f5f2f2;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}

.free {
    width: 100%;
    height: 2em;
}

.servicename {
    font-size: 2em;
    font-weight: 600;
}

.rating {
    margin-bottom: 1.3em;
    font-size: 0.8em;
}

.rupee {
    display: flex;
    gap: 1em;
    margin-bottom: 1em;

}

.add-btn {
    display: flex;
    gap: 0.5em;
    align-items: center;
    justify-content: space-between;
    margin: .4em .7em 0 0;
    background-color: hsla(341, 100%, 46%, 0.749);
    color: #fff;
    padding: 0.2em 0.5em;
    border-radius: 8px;
    min-width: 5em;
}

.add-btn span {
    color: #fff;
    cursor: pointer;
}

.load-btn {
    margin-top: 2em;
}

.add-btn button {
    border: none;
    color: #fff;
    background-color: #fc3171bf;
}

.dialogue-box {
    display: flex;
    color: grey;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 50%;
    transform: .35s;
}

.dia-active {
    transform: translateY(1em);
    transition: .35s;
    color: red;
}

@media only screen and (max-width: 600px) {
    .lin {
        width: 90%;
        margin: 0 5%;
    }

    h3 {
        padding: 0 5%;
        margin: 2em 0 2em 0;
    }

    .name-img {
        padding: 7em 0 3em 1.5em;
    }

    .all-cards {
        padding: 0 5%;
    }

    .servicename {
        font-size: 1.5em;
    }
}
</style>
