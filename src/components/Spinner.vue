<template>
    <div id="loadRingContainer" class="loadringcontainer">
      <div class="loadring"></div>
    </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style scoped>
.loadringcontainer
{
    /* background: rgb(45, 45, 46); */
    height: 100%;
    width: 100%;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 10000;
}

.loadring
{
    position: relative;
    margin: auto;
    border: 3px solid white;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border-left-color: transparent;
    border-right-color: transparent;
    animation: spin 1.2s ease-in-out 0ms infinite;
}

@keyframes spin
{
    0%
    {
        transform: rotate(0deg);
    }

    50%
    {
        border-left-color: white;
        border-right-color: white;
        box-shadow: 0px 0px 15px white, inset 0px 0px 10px white;
    }

    100%
    {
        transform: rotate(1440deg);
    }
}
</style>
