<template>
    <div class="container">
        <b-card header="Ratings" class="my-3">
            <b-card-text>
                
                <b-form-group id="like" label="Did you like it?">
                    <like></like>
                </b-form-group>

                <b-form-group id="emotions" description="You can pick more than one." label="Pick you emotions">
                    <emotions-fa></emotions-fa>
                </b-form-group>

                <b-form-group id="emotions-emoji" description="You can pick more than one." label="Pick you emotions">
                    <emotions-emoji></emotions-emoji>
                </b-form-group>

                <b-form-group id="stars" label="Star Rating">
                    <star-rating></star-rating>
                </b-form-group>

            </b-card-text>
        </b-card>
    </div>
</template>

<script>

    import Like from './ratings/Like.vue'
    import EmotionsFa from './ratings/EmotionsFa.vue'
    import EmotionsEmoji from './ratings/EmotionsEmoji.vue'
    import StarRating from './ratings/StarRating.vue'

    export default {
        name: 'Ratings',
        components: {
            'like': Like,
            'emotions-fa': EmotionsFa,
            'emotions-emoji': EmotionsEmoji,
            'star-rating': StarRating
        },
    }
</script>