<template>
    <article class="message is-danger">
        <div class="message-body">
            <slot />
        </div>
    </article>
</template>

<script>
export default {
    name: 'ErrorMessage',
};
</script>
