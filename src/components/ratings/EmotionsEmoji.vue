<template>
    <BButtonGroup>
        <BButton
            :title="btn.name"
            v-for="(btn) in buttonsEmojis"
            :key="btn.emotion"
            v-model:pressed="btn.state"
            :class="{ 'icon-grey': btn.state === false }"
            variant="light"
            @click="updateEmojiEmotions(btn.emotion)"
        >
            {{ btn.icon }}
        </BButton>
    </BButtonGroup>
</template>


<script>

import { BButton, BButtonGroup } from 'bootstrap-vue-next'

const emojis = {
    angry: {name: 'Angry', emoji: '😡'},
    confuse: {name: 'Confused', emoji: '😖'},
    pensive: {name: 'Pensive', emoji: '🤔'},
    surprise: {name: 'Surprised', emoji: '😮'},
    sadTear: {name: 'Sad', emoji: '😢'},
    sadCry: {name: 'Crying', emoji: '😭'},
    scare: {name: 'Scared', emoji: '😱'},
    sleepy: {name: 'Sleepy', emoji: '😴'},
    mehRollingEyes: {name: 'Rolling Eyes', emoji: '🙄'},
    meh: {name: 'Meh', emoji: '😐'},
    grinHearts: {name: 'Love', emoji: '😍'},
    grinAlt: {name: 'Smiling', emoji: '🙂'},
    grinTears: {name: 'LOL', emoji: '😂'},
    grimance: {name: 'Cringe', emoji: '😬'},
}

export default {
    name: 'EmotionsEmoji',
    components: {
        BButton,
        BButtonGroup
    },
    mounted: function () {
        for (const [type, emoji] of Object.entries(emojis)) {
            this.buttonsEmojis.push({
                icon: emoji.emoji,
                name: emoji.name,
                emotion: type,
                state: false
            });
        };
    },
    data: function() {
        return {
            emojiEmotions: [],
            buttonsEmojis: [],
        }
    },

    methods: {
        updateEmojiEmotions: function (value) {
            let index = this.emojiEmotions.indexOf(value);
            if (index === -1)
                this.emojiEmotions.push(value);
            else
                this.emojiEmotions.splice(index,1);
        },
    }
}
</script>

<style scoped>
.icon-grey{
    color: grey;
    filter: grayscale(100%);
}
</style>