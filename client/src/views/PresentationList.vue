<template>
    <section class="section">
        <div class="container">
            <h1 class="title">
                Presentations
            </h1>

            <table class="table is-striped">
                <thead>
                    <tr>
                        <td>Presentation Id</td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="presentation in presentations"
                        :key="presentation.id"
                    >
                        <td>{{ presentation.id }}</td>
                        <td>
                            <div class="action-buttons is-pulled-right">
                                <button class="button is-primary">
                                    Edit
                                </button>
                                <button class="button is-secondary">
                                    Show
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PresentationList',
    data() {
        return {
            presentations: [
                { id: 'aödajdflkjasdlfk44', },
                { id: 'aödajdflkjasdlfk45', },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.action-buttons .button:nth-child(n+2) {
    margin-left: 0.5em;
}
</style>

