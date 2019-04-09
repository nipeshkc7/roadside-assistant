<template>
    <div class="wrapper">
        <div v-if="currentUser" class="wrapper-header">
            <Menu mode="horizontal" theme="light" active-name="1">
                <MenuItem to="/">
                    Home
                </MenuItem>
                <MenuItem to="/admin" name="2">
                    Admin
                </MenuItem>
                <MenuItem @click="logout()">
                    Logout
                </MenuItem>
            </Menu>
        </div>
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
import { authenticationService } from '@/_services';
import { router } from '@/_helpers';

export default {
    name: 'app',
    data () {
        return {
            currentUser: null
        };
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        }),
        isAdmin () {
            return this.currentUser && this.currentUser.role === 'Admin';
        }
    },
    created () {
        authenticationService.currentUser.subscribe(x => this.currentUser = x);
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

