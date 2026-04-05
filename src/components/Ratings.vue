<template>
    <div class="container">
        <BCard header="Ratings" class="my-3">
            <BCardText>
                <BFormGroup id="like" label="Did you like it?">
                    <Like />
                </BFormGroup>

                <BFormGroup id="emotions" description="You can pick more than one." label="Pick you emotions">
                    <EmotionsFa />
                </BFormGroup>

                <BFormGroup id="emotions-emoji" description="You can pick more than one." label="Pick you emotions">
                    <EmotionsEmoji />
                </BFormGroup>

                <BFormGroup id="stars" label="Star Rating">
                    <StarRating />
                </BFormGroup>
            </BCardText>
        </BCard>
    </div>
</template>

<script>

    import { BCard, BCardText, BFormGroup } from 'bootstrap-vue-next'
    import Like from './ratings/Like.vue'
    import EmotionsFa from './ratings/EmotionsFa.vue'
    import EmotionsEmoji from './ratings/EmotionsEmoji.vue'
    import StarRating from './ratings/StarRating.vue'

    export default {
        name: 'Ratings',
        components: {
            BCard,
            BCardText,
            BFormGroup,
            Like,
            EmotionsFa,
            EmotionsEmoji,
            StarRating
        },
    }
</script>

<style scoped>
.btn-group {
    flex-wrap:wrap;
}
</style>