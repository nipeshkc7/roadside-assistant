<style>
</style>

<template>
    <div>
        <Navigation activeName="Requests"></Navigation>
        <div class="content">
            <Row>
                <Col span="4"><br></Col>
                <Col span="16">
                    <h1>View Requests In Your Area (updated once every minute or upon page refresh)</h1>
                    <Table border :columns="columns12" :data="requests" class="request-table">
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="accept(index)">Accept</Button>
                        </template>
                    </Table>
                </Col>
                <Col span="4"><br></Col>
            </Row>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { requestService } from '@/_services';
import { userService, authenticationService } from '@/_services';
import { router } from '../_helpers';
import Navigation from '@/components/Navigation';

export default {
    data () {
        return {
            requests: [],
            location: {
                lat: 0,
                lon: 0
            },
            columns12: [
                {
                    title: 'Problem Type',
                    key: 'problemType'
                },
                {
                    title: 'Plate Number',
                    key: 'plateNumber'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            socket: null,
            quotePrice: null
        }
    },
    components: {
        'Navigation': Navigation
    },
    created () {
        this.getLocation();
        this.socket = this.$parent.socket;
    },
    methods: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setPosition);
            }
        },
        setPosition(position) {
            this.location.lat = position.coords.latitude;
            this.location.lon = position.coords.longitude;
            const lat = this.location.lat;
            const lon = this.location.lon;
            requestService.getInArea(lat, lon).then(requests => this.requests = requests);
        },
        //* Generalized this method to reduce code, since the only difference was the responder objects fields
        okMethod(index, memberType) {
            var responder = null;

            if (memberType === 'Per-service') {
                responder = {
                    responderID: authenticationService.currentUserValue._id,
                    quote: quotePrice
                };
            } else {
                responder = {
                    responderID: authenticationService.currentUserValue._id,
                };
            }

            const sendParam = {
                username: authenticationService.currentUserValue.username
            }
            const roomId = this.requests[index].room;
            userService.update({room: roomId}, authenticationService.currentUserValue._id);
            requestService.update(responder, this.requests[index]._id);
            this.socket.emit('room', roomId);
            this.socket.emit('acceptRequest', sendParam, roomId);
            this.$Message.info('Service request accepted');
        },
        accept(index) {
            userService.getMembershipType(this.requests[index].memberID).then(membershipType => {
                let quotePrice = null;
                
                //? If the member requesting the service is a per-service customer, ask the professional for a quote(price) to answer the service
                if (membershipType == "Per-service") {
                    this.$Modal.confirm({
                        render: (h) => {
                            return h('Input', {
                                props: {
                                    value: quotePrice,
                                    autofocus: true,
                                    placeholder: 'Please a quote for you to answer this service request...'
                                },
                                on: {
                                    input: (val) => {
                                        quotePrice = parseFloat(val);
                                    }
                                }
                            })
                        },
                        onOk: () => {
                            this.okMethod(index, membershipType);
                        }
                    })
                  //? Else just ask the professional if they want to answer the service since subscription members don't pay a direct fee
                } else if(membershipType == "Subscription") {
                    this.$Modal.confirm({
                        title: 'Accept Service Request',
                        content: '<p>Are you sure you want to accept this service request?</p>',
                        onOk: () => {
                            this.okMethod(index, membershipType);
                        }
                    });
                }
            });
        }
    },
    mounted: function () {
        // Updates location and requests in the area every minute
        this.$nextTick(function () {
            window.setInterval(() => {
                this.getLocation();
            },60000);
        }),
        // If the member accepts this professionals response to their sevice request, notify the professional
        this.socket.on('serviceAccepted', (requestID) => {
            router.push({
                name: 'current-request',
                params: {
                    requestId: requestID
                }
            });
        })
    }
}
</script>
