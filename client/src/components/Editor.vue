<template>
    <CodeMirror
        :value="value"
        :options="computedOptions"
        @input="onInput"
    />
</template>

<script>
import { debounce } from 'throttle-debounce';
import { codemirror as CodeMirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/markdown/markdown.js';

export default {
    name: 'Editor',
    components: { CodeMirror },
    props: {
        value: String,
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        computedOptions() {
            return this.options;
        },
    },
    methods: {
        onInput(value) {
            this.$emit('input', value);
            this.onUpdate(value);
        },
        onUpdate: debounce(1000, function (value) {
            this.$emit('update', value);
        }),
    },
}
</script>

<style lang="scss">
    @import "~codemirror/lib/codemirror.css";
    @import "~codemirror/theme/monokai.css";

    .CodeMirror {
        height: 100%;
    }
</style>

