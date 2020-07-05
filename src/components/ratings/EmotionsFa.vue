<template>
    <b-button-group>
        <b-button
            v-for="(btn) in buttonsFa"
            :key="btn.icon[1]"
            :pressed.sync="btn.state"
            variant="light"
            @click="updateFaEmotions(btn.emotion)"
        >
            <font-awesome-icon class="icon" :icon="btn.icon"/>
        </b-button>
    </b-button-group>
</template>


<script>

// Font Awesome 5
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

library.add(
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

const fa = {
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
    name: 'EmotionsFa',
    data: function() {
        return {
            faEmotions: [],
            buttonsFa: [
                { icon: fa.faSurprise, emotion: fa.faSurprise[1], state: false },
                { icon: fa.faSadTear, emotion: fa.faSadTear[1], state: false },
                { icon: fa.faSadCry, emotion: fa.faSadCry[1], state: false },
                { icon: fa.faMehRollingEyes, emotion: fa.faMehRollingEyes[1], state: false },
                { icon: fa.faMeh, emotion: fa.faMeh[1], state: false },
                { icon: fa.faGrinHearts, emotion: fa.faGrinHearts[1], state: false },
                { icon: fa.faGrinAlt, emotion: fa.faGrinAlt[1], state: false },
                { icon: fa.faGrinTears, emotion: fa.faGrinTears[1], state: false },
                { icon: fa.faGrimace, emotion: fa.faGrimace[1], state: false },
                { icon: fa.faAngry, emotion: fa.faAngry[1], state: false },
            ],
        }
    },

    methods: {
        updateFaEmotions: function (value) {
            let index = this.faEmotions.indexOf(value);
            if (index === -1)
                this.faEmotions.push(value);
            else
                this.faEmotions.splice(index,1);
        },
    }
}
</script>

<style>
.icon {
    font-size: 25px;
}
</style>