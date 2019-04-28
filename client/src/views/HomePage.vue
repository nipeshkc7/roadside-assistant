<style>
.content {
    margin-top: 170px;
}
</style>

<template>
    <div>
        <Navigation activeName="Home"></Navigation>
        <div class="content">
            <h1>HomePage</h1>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Navigation from '@/components/Navigation';

export default {
    components: {
        'Navigation': Navigation
    },
    computed: {
        ...mapState({
            account: state => state.account
        }),
    },
};
</script>