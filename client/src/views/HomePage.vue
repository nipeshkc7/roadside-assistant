<style>
.content {
    display: block;
    margin: 15px auto 15px;
    background: #fff;
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
import io from 'socket.io-client';

export default {
    data () {
        return {
        }
    },
    components: {
        'Navigation': Navigation
    },
    computed: {
        ...mapState({
            account: state => state.account
        }),
    },
    created () {
        /*const socket = this.$parent.socket;
        socket.on('connect', function() {
            socket.emit('room', 'member');
        });

        socket.on('connectToRoom', function(data) {
            console.log(data);
        });*/
    },
};
</script>