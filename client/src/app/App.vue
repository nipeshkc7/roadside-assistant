<template>
    <div class="wrapper">
        <div v-if="currentUser" class="wrapper-header">
            <Menu mode="horizontal" theme="light" active-name="1">
                <MenuItem to="/login" name="1">
                    Login
                </MenuItem>
                <MenuItem to="/admin" name="2">
                    Admin
                </MenuItem>
            </Menu>
        </div>
        <div class="container">
            <Row type="flex" justify="center">
                <Col span="6">
                    <Alert v-if="alert.message" :type="`${alert.type}`" show-icon>{{alert.message}}</Alert>
                    <router-view></router-view>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
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
        isAdmin () {
            return this.currentUser && this.currentUser.role === 'Admin';
        }
    },
    created () {
        authenticationService.currentUser.subscribe(x => this.currentUser = x);
    },
    methods: {
        logout () {
            authenticationService.logout();
            router.push('/login');
        }
    }
};
</script>

