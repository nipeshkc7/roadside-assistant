<style>
.map {
  position: absolute;
  width: 1200px;
  height: 800px;
}
</style>

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
        }
    },
    beforeRouteEnter (to, from, next) {
        //console.log(to.params.id);
        /*this.getRequest(to.params.id, (err, post) => {
            next(vm => vm.setData(err, post))
        })*/
    },
    methods: {
        ...mapActions('requests', {
            getRequest: 'getById',
            getMembersRequest: 'getMembersRequest'
        }),
        setData (err, post) {
            if (err) {
                this.error = err.toString()
            } else {
                this.post = post
            }
        }
    },
    mounted () {
        var map = L.map('map');

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.Routing.control({
            waypoints: [
                L.latLng(57.74, 11.94),
                L.latLng(57.6792, 11.949)
            ],
            routeWhileDragging: false
        }).addTo(map);
    }
}
</script>
