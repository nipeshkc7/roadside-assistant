<style>
.map {
  position: absolute;
  width: 1200px;
  height: 800px;
}
</style>

// TODO: Display the requests details on the left side of the page (problem type, number plate, make, model, colour)
// TODO: Add navbar
// TODO: Add button to complete service request and create a transaction record for both the professional and the member
<template>
    <div>
        <p>{{requestId}}</p>
        <br><br>
        <div id="map" class="map"></div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { requestService } from '@/_services'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
    props: ['requestId'],
    data () {
        return {
            lat: null,
            lon: null
        }
    },
    beforeRouteEnter (to, from, next) {
        //? Why use the request serive when we have the map actions method for getRequest?
        //* Because we cannot access the map actions methods before the page is instansiated (created) as they rely on there being a current state of the page,
        //* however we can access the request service methods since they do not rely upon this :)
        requestService.getById(to.params.requestId).then(request => {
            // If the request exists in the database, set this pages request state to the retrieved request and allow the route to this page
            if(request) {
                next(vm => vm.$store.state.requests.request = request);
            } else { // Else reject access and do not route that user to this page (keeps them on the page they were on before attempting to enter)
                next(false);
            }
        })
    },
    methods: {
        ...mapActions('requests', {
            getRequest: 'getById',
            getMembersRequest: 'getMembersRequest'
        }),
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setPosition);
            }
        },
        setPosition(position) {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;

            var map = L.map('map');
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.Routing.control({
                waypoints: [
                    L.latLng(this.lat, this.lon), // Starting destination
                    L.latLng(this.$store.state.requests.request.latitude, this.$store.state.requests.request.longitude) // Target destination (location of service request)
                ],
                routeWhileDragging: false
            }).addTo(map);
        }
    },
    mounted () {
        this.getLocation();
    }
}
</script>
