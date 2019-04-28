<template>
    <CodeMirror
        ref="codemirror"
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
import CodeMirrorSocket from '@/classes/CodeMirrorSocket';

export default {
    name: 'Editor',
    components: { CodeMirror },
    props: {
        value: {
            type: String,
            default: '',
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        socketOptions: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            cm: null,
        };
    },
    computed: {
        computedOptions() {
            return this.options;
        },
    },
    mounted() {
        this.cm = this.$refs.codemirror.cminstance;
        if(this.socketOptions) {
            const cmSocket = new CodeMirrorSocket(this.socketOptions, this.cm);

            this.$once('hook:beforeDestroy', () => {
                cmSocket.disconnect();
            });
        }
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
    @import "~codemirror/theme/hopscotch.css";

    .CodeMirror {
        height: 100%;
    }
</style>

