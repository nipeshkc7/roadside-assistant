<style>
body {
    background-color: #fff;
}
.wrapper-footer {
    background: #212121;
    color: #fff;
    position: relative;
}
.alert-message {
    margin-top: 20px;
}
.wrapper {
    background: #eee;
}
</style>

<template>
    <div>
        <div class="wrapper">
            <router-view></router-view>
        </div>
        <div class="wrapper-footer"></div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { userService } from '@/_services';
import Navigation from '@/components/Navigation';
import io from 'socket.io-client';

export default {
    name: 'app',
    data () {
        return {
            socket: null
        }
    },
    created () {
        this.socket = io('http://localhost:4000');
    },
};
</script>

