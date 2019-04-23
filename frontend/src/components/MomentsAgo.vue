<template>
    <span>{{ humanDiff }}</span>
</template>

<script>
import moment from 'moment';

export default {
    name: 'MomentsAgo',
    props: {
        date: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            currentTime: new Date(),
        };
    },
    computed: {
        humanDiff() {
            return moment(this.date).from(this.currentTime);
        },
    },
    watch: {
        date() {
            this.updateCurrentTime();
        },
    },
    created() {
        const interval = setInterval(() => {
            this.updateCurrentTime();
        }, 1000);

        // this.$once('hook:destroyed', () => clearInterval(interval));
    },
    methods: {
        updateCurrentTime() {
            this.currentTime = new Date();
        },
    },
}
</script>

