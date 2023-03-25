<script>

export default {
    props: {
        categoryName: String,
        description: String
    },
    data() {
        return {

        }
    }
}

</script>

<!-- template -->
<template>
<div id="cardbody">
    <div class="text-area">
        <h1>{{ this.categoryName }}</h1>
        <p class="desc">{{ this.description }}</p>
        <button class="card-action-button">Learn more</button>
    </div>
    <div class="image"></div>
</div>
</template>

<!-- style -->
<style scoped>

#cardbody {
    color: #171717;
    background: #fefefe;
    border-radius: 10px;
    border: 3px solid #fc3171bf;

    width: 25vw;
    aspect-ratio: 1920 / 1080;
    margin: 0.8em;
    padding: 2em;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: relative;
}

.image  {
    position: absolute;
    top: 0;
    right: 0;
    background-image: url('com-ser.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgba(176, 148, 168, 0.4);
    opacity: 0.5;
    border-radius: 10px;
}

.desc {
    color: #464646;
}

.card-action-button {
    z-index: 1 !important;
    border-radius: 5px;
}

.text-area {
    position: relative;
    z-index: 999;
}


</style>