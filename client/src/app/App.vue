<style>
.wrapper-footer {
    background: #212121;
    color: #fff;
    position: relative;
}
.alert-message {
    margin-top: 20px;
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
import Navigation from '@/components/Navigation';
import socketIo from 'socket.io-client';

export default {
    name: 'app',
    created () {
        const socket = socketIo('http://localhost:4000');

        //socket.on('hello', (data) => console.log(data));
    },
};
</script>

