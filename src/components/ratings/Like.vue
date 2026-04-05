<template>
    <BButtonGroup>
        <BButton class="border-0" @click="toggleLike(true)" :class="{ 'btn-success': like === true }"><font-awesome-icon class="icon" :icon="['fas', 'check']" /></BButton>
        <BButton class="border-0" @click="toggleLike(false)" :class="{ 'btn-danger': like === false }"><font-awesome-icon class="icon" :icon="['fas', 'times']" /></BButton>
    </BButtonGroup>
</template>


<script>

import { BButton, BButtonGroup } from 'bootstrap-vue-next'
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
    components: {
        BButton,
        BButtonGroup
    },
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

<style scoped>
.icon {
    font-size: 25px;
}
</style>