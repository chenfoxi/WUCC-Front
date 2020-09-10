<template>
    <v-carousel v-if="items.length !== 0">
        <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
    import MetaEventService from '@/service/open/meta.event.service';

    export default {
        name: "PhotoGallery",
        props: {
            Id: {
                type: Number,
                require: true
            },
            type: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                items: []
            }
        },
        mounted(){
            let tempArray = [];
            MetaEventService.getPhotos(this.Id, this.type).then(
                data => {
                    if (data.code === 0) {
                        tempArray = data.data;
                        if (tempArray.length !== this.items.length) {
                            this.items = tempArray;
                        }
                    } else {
                       console.log(data.errorMsg);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
</script>

<style scoped>

</style>
