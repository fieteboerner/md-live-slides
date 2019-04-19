<template>
    <section
        class="section"
        :class="{ 'is-loading': loading }"
    >
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
import PresentationService from '@/services/Presentation';

export default {
    name: 'PresentationList',
    data() {
        return {
            loading: false,
            presentations: [],
        };
    },
    async created() {
        this.loading = true;
        try {
            this.presentations = await PresentationService.list();
        } catch (error) {

        } finally {
            this.loading = false;
        }
    },
};
</script>

<style lang="scss" scoped>
.action-buttons .button:nth-child(n+2) {
    margin-left: 0.5em;
}
</style>

