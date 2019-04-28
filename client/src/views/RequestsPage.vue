<style>
</style>

<template>
    <div>
        <Navigation activeName="Requests"></Navigation>
        <div class="content">
            <Row>
                <Col span="4"><br></Col>
                <Col span="16">
                    <h1>View Requests In Your Area</h1>
                    <ul v-if="requests.length">
                        <li v-for="request in requests" :key="request.id">
                            {{request.problemType}}
                        </li>
                    </ul>
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
            }
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
    }
}
</script>
