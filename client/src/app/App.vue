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
import { userService, authenticationService } from '@/_services';
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

        this.socket.on('connect', () => {

            // If the user is logged in, then we want to send their socketID to the server so messages and notifications can be sent to them.
            // You can think of this like how facebook shows you which one of your friends is online when they are on the app :)
            if (authenticationService.currentUserValue) {
                this.socket.emit('userConnected', authenticationService.currentUserValue.username, this.socket.id);
            }
        })
    }
};
</script>

