<style>
.wrapper-header {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
}
.wrapper-header-nav {
    width: 95%;
    margin: 0 auto;
}
.wrapper-header-nav-list {
    float: right;
}
.logoutLink {
    color: #515a6e;
}
</style>

<template>
    <div class="wrapper-header">
        <Menu mode="horizontal" theme="light" :active-name="activeName">
            <div class="wrapper-header-nav">
                <div class="wrapper-header-nav-list">
                    <MenuItem name="Home" to="/">
                    Home
                    </MenuItem>
                    <MenuItem name="Admin" v-if="account.user.role === 'Admin'" to="/admin">
                    Admin
                    </MenuItem>
                    <MenuItem name="Requests" v-if="account.user.role === 'Professional'" to="/requests">
                    Requests
                    </MenuItem>
                    <MenuItem name="Make Request" v-if="account.user.role === 'Member'" to="/make-request">
                    Make Request
                    </MenuItem>
                    <Submenu name="Account">
                        <template slot="title">
                            <Icon type="ios-person" size="24" />
                        </template>
                        <MenuItem name="Account-1">Settings</MenuItem>
                        <MenuItem name="Account-2">Help</MenuItem>
                        <MenuItem name="Account-3"><a @click="logout()" class="logoutLink">Logout</a></MenuItem>
                    </Submenu>
                </div>
            </div>
        </Menu>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Navigation',
    props: ['activeName'],
    computed: {
        ...mapState({
            account: state => state.account
        }),
    },
    methods: {
        ...mapActions('account', {
            logout: 'logout'
        })
    }
};
</script>
