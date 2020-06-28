<template>
    <div class="container">
        <b-card header="Ratings" class="my-3">
            <b-card-text>
                <b-form-group id="like" label="Did you like it?">
                    <b-button-group>
                        <b-button variant="outline-success border-0" @click="toggleLike(true)" v-bind:class="{ active: like === true }"><font-awesome-icon class="icon" :icon="['fas', 'check']" /></b-button>
                        <b-button variant="outline-danger border-0" @click="toggleLike(false)" v-bind:class="{ active: like === false }"><font-awesome-icon class="icon" :icon="['fas', 'times']" /></b-button>
                    </b-button-group>
                </b-form-group>
                <b-form-group id="emotions" description="You can pick more than one." label="Pick you emotions">
                    <b-button-group>
                        <b-button
                            v-for="(btn) in buttons"
                            :key="btn.icon[1]"
                            :pressed.sync="btn.state"
                            variant="light"
                            @click="updateEmotions(btn.emotion)"
                        >
                            <font-awesome-icon class="icon" :icon="btn.icon"/>
                        </b-button>
                    </b-button-group>
                </b-form-group>
                <b-form-group id="stars" label="Star Rating" class="w-25">
                    <b-form-rating id="rating-lg-no-border" variant="warning" v-model="starRating" no-border show-clear size="lg"></b-form-rating>
                </b-form-group>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>

    import { library } from '@fortawesome/fontawesome-svg-core'
    import {
        faSurprise,
        faSadTear,
        faSadCry,
        faMehRollingEyes,
        faMeh,
        faGrinHearts,
        faGrinAlt,
        faGrinTears,
        faGrimace,
        faAngry,
    } from '@fortawesome/free-regular-svg-icons'


    import {
        faCheck,
        faTimes,
    } from '@fortawesome/free-solid-svg-icons'

    library.add(
        faCheck,
        faTimes,
        faSurprise,
        faSadTear,
        faSadCry,
        faMehRollingEyes,
        faMeh,
        faGrinHearts,
        faGrinAlt,
        faGrinTears,
        faGrimace,
        faAngry,
    );

    let icons = {
        'faSurprise': ['far', 'surprise'],
        'faSadTear': ['far', 'sad-tear'],
        'faSadCry': ['far', 'sad-cry'],
        'faMehRollingEyes': ['far', 'meh-rolling-eyes'],        
        'faMeh': ['far', 'meh'],
        'faGrinHearts': ['far', 'grin-hearts'],
        'faGrinAlt': ['far', 'grin-alt'],
        'faGrinTears': ['far', 'grin-tears'],
        'faGrimace': ['far', 'grimace'],
        'faAngry': ['far', 'angry'],
    };

    export default {
        data: function() {
            return {
                like: null,
                emotions: [],
                starRating: null,
                buttons: [
                    { icon: icons.faSurprise, emotion: icons.faSurprise[1], state: false },
                    { icon: icons.faSadTear, emotion: icons.faSadTear[1], state: false },
                    { icon: icons.faSadCry, emotion: icons.faSadCry[1], state: false },
                    { icon: icons.faMehRollingEyes, emotion: icons.faMehRollingEyes[1], state: false },
                    { icon: icons.faMeh, emotion: icons.faMeh[1], state: false },
                    { icon: icons.faGrinHearts, emotion: icons.faGrinHearts[1], state: false },
                    { icon: icons.faGrinAlt, emotion: icons.faGrinAlt[1], state: false },
                    { icon: icons.faGrinTears, emotion: icons.faGrinTears[1], state: false },
                    { icon: icons.faGrimace, emotion: icons.faGrimace[1], state: false },
                    { icon: icons.faAngry, emotion: icons.faAngry[1], state: false },
                ],
            };
        },
        methods: {
            updateEmotions: function (value) {
                let index = this.emotions.indexOf(value);
                if (index === -1)
                    this.emotions.push(value);
                else
                    this.emotions.splice(index,1);
            },
            isActive: function (value) {
                return this.emotions.includes(value);;
            },
            toggleLike: function (value) {
                if (this.like === value){
                    this.like = null;
                } else {
                    this.like = value;
                }
            }
        },
        computed: {
            btnStates() {
                return this.buttons.map(btn => btn.state)
            }
        }
    }
</script>

<style scoped>
.icon {
    font-size: 25px;
}

</style>