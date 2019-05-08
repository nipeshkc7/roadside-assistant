<style>
</style>

<template>
    <div>
        <Navigation activeName="Make Request"></Navigation>
        <div class="content">
            <Row>
                <RequestSide activeName="viewAccepted"></RequestSide>
                <Col span="16">
                </Col>
                <Col span="4"></Col>
            </Row>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Navigation from '@/components/Navigation';
import RequestSideNav from '@/components/RequestSidebar';
import io from 'socket.io-client';

export default {
    data () {
        return {
            userList: [],
            socket: null
        }
    },
    components: {
        'Navigation': Navigation,
        'RequestSide': RequestSideNav
    },
    created () {
        this.socket = this.$parent.socket;
    },
    mounted: function() {
        this.socket.on('userList', (userList, username) => {
            this.userList = userList;

            this.$Notice.info({
                title: username + ' has accepted your request!'
            });
        })
    }
}

</script>
