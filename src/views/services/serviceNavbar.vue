
<script>

export default {
    props: {
        showOptions: Boolean,
        userName: String
    },
    data() {
        return {
            userSignedIn: false,
        }
    }
}

</script>

<template>

<div class="navbar">
    <div class="logo">
        <div>IT Arena</div>
    </div>

    <div class="links">
        <router-link to="/cart"><div class="action-button cart-btn"><span class="material-symbols-outlined">shopping_cart</span></div></router-link>
        <router-link to="/signin" v-if="this.showOptions">
            <div class="action-button signin">Sign In</div>
        </router-link>
        <router-link to="/signup" v-if="this.showOptions">
            <div class="action-button signup">Sign Up</div>
        </router-link>
        <div class="name" v-if="this.userName !== ''">{{ this.userName }}</div>
    </div>
</div>

</template>

<style scoped>

.navbar {
    width: 100vw;
    height: 10vh;
    
    background-color: #fefefe;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: fixed;
}


.logo {
    font-size: 2em;
    margin-left: 2em
}

.links {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    gap: 1em;
    margin-right: 2em;
}

.action-button {
    padding: 3px 0.8em;
    border: 1px solid #171717;
    border-radius: 5px;
}

.signin {
    color: #171717;
}

.signup {
    color: #fefefe;
    background-color: #171717;
}

.cart-btn {
    color: #fefefe;
    background-color: #fc3171bf;
    border: none;
    margin-right: 2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.25em 1em;
}

.cart-btn span  {
    font-size: 20px;
}

@media only screen and (max-width: 600px) {
    .logo {
        margin-left: .5em;
    }
    .cart-btn{
        margin-right: 0;
    }
    .links {
        margin: 0 0.5em 0 0;
        gap: .5em;
    }
}

</style>