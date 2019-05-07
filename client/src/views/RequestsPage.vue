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
        accept(index) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.quotePrice,
                            autofocus: true,
                            placeholder: 'Please a quote for you to answer this service request...'
                        },
                        on: {
                            input: (val) => {
                                this.quotePrice = parseFloat(val);
                            }
                        }
                    })
                },
                onOk: () => {
                    const roomId = this.requests[index].room;
                    userService.update({room: roomId}, authenticationService.currentUserValue._id);
                    this.socket.emit('room', roomId);
                }
            })
        }
    },
    // Updates location and requests in the area every minute
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.getLocation();
            },60000);
        })
    }
}
</script>
