<style>
.acceptedUsers {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 25px;
}
</style>

<template>
    <div>
        <Navigation activeName="Make Request"></Navigation>
        <div class="content">
            <Row>
                <RequestSide activeName="viewAccepted"></RequestSide>
                <Col span="16" class="acceptedUsers">
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
import { requestService, authenticationService } from '@/_services';
import io from 'socket.io-client';

export default {
    data () {
        return {
            userList: [],
            socket: null,
            room: null
        }
    },
    components: {
        'Navigation': Navigation,
        'RequestSide': RequestSideNav
    },
    computed: {
        ...mapState({
            responders: state => state.requests.request.responders
        })
    },
    created () {
        this.socket = this.$parent.socket;
        this.room = this.$store.state.account.user.username + 'ROOM';
        this.socket.emit('room', this.room);
        this.getMembersRequest(this.$store.state.account.user._id);
    },
    methods: {
        ...mapActions('requests', {
            getRequest: 'getById',
            getMembersRequest: 'getMembersRequest'
        })
    },
    mounted: function() {
        this.socket.on('userList', (username) => {
            this.getRequest(this.$store.state.requests.request[0]._id);

            requestService.getResponders(this.$store.state.requests.request[0]._id).then(responders => this.userList = responders);
            this.$Notice.info({
                title: username + ' has accepted your request!'
            });
        })
    }
}

</script>
