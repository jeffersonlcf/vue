<template>
    <b-button-group>
        <b-button variant="outline-success border-0" @click="toggleLike(true)" :class="{ active: like === true }"><font-awesome-icon class="icon" :icon="['fas', 'check']" /></b-button>
        <b-button variant="outline-danger border-0" @click="toggleLike(false)" :class="{ active: like === false }"><font-awesome-icon class="icon" :icon="['fas', 'times']" /></b-button>
    </b-button-group>
</template>


<script>


// Font Awesome 5
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faCheck,
    faTimes
);

export default {
    name: 'Like',
    data: function() {
        return {
            like: null,
        }
    },

    methods: {
        toggleLike: function (value) {
            if (this.like === value){
                this.like = null;
            } else {
                this.like = value;
            }
        },
    }
}
</script>

<style>
.icon {
    font-size: 25px;
}
</style>