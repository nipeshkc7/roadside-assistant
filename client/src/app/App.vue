<template>
    <div class="wrapper">
        <div class="container">
            <Row type="flex" justify="center" align="middle">
                <Col span="6">
                    <Alert v-if="alert.message" :type="`${alert.type}`" show-icon>{{alert.message}}</Alert>
                </Col>
            </Row>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
    },
    watch: {
        $route (to, from) {
            // When the route is changed the alert will be cleared
            this.clearAlert();
        }
    }
};
</script>

