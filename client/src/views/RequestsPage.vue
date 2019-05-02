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
                            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">Accept</Button>
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
            ]
        }
    },
    components: {
        'Navigation': Navigation
    },
    created () {
        this.getLocation();
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
