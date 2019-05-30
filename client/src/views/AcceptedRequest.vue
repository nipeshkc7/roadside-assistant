<style scoped>
.acceptedUsers {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 25px;
}
li {
    list-style: none;
}
</style>

<template>
    <div>
        <Navigation activeName="Make Request"></Navigation>
        <div class="content">
            <Row>
                <RequestSide activeName="viewAccepted"></RequestSide>
                <Col span="16" class="acceptedUsers">
                    <div v-if="userList.length">
                        <div v-for="user in userList" :key="user.professionalID">
                            <Card style="width:600px">
                                <p slot="title">
                                    {{user.username}}
                                </p>
                                <p><strong>Name:</strong> {{user.firstName + " " + user.lastName}}</p>
                                <p v-if="user.quote"><strong>Quote for service:</strong> ${{user.quote}}</p>
                                <br>
                                <Button @click="selectPro(user.username)">Select this professional</Button>
                                <Divider orientation="left">Reviews</Divider>
                                <ul v-if="user.reviews.length">
                                    <li v-for="item in user.reviews" :key="item.memberID">
                                        <Card>
                                            <p slot="title">
                                                {{item.username}}
                                            </p>
                                            <Rate disabled slot="extra" v-model="item.rating" />
                                            <p>{{item.comment}}</p>
                                        </Card>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>
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
            getMembersRequest: 'getMembersRequest',
            updateRequestStatus: 'updateRequest'
        }),
        // TODO: Add an emit event that sends the usernames of the other responders so they can be notified of the rejection
        selectPro(username) {
            const sendData = {
                status: 'in-progress',
                id: this.$store.state.requests.request._id
            }
            this.updateRequestStatus(sendData);
            this.socket.emit('chooseProfessional', username, this.$store.state.requests.request._id);
        }
    },
    mounted: function() {
        this.socket.on('activeUsers', (username) => {
            this.getRequest(this.$store.state.requests.request[0]._id);

            requestService.getResponders(this.$store.state.requests.request[0]._id).then(responders => this.userList = responders);
            this.$Notice.info({
                title: username + ' has accepted your request!'
            });
        })
    }
}
</script>
