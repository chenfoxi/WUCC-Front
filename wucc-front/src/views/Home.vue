<template>
    <div class="home">
        <iframe class="white--text" width="1920" height="882"
                src="https://www.youtube.com/embed/49i9mG_o5nM?autoplay=1&loop=1&autopause=0&controls=0&playlist=49i9mG_o5nM&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&mute=1&enablejsapi=1"
        >
        </iframe>
        <info-cards></info-cards>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: "Home",
        components: {
            InfoCards: () => import('@/components/InfoCards')
        },
        methods: {
        }
    };
</script>
