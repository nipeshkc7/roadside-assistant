<style>
p {
    font-size: 12px;
    padding: 0 0 10px 0;
    line-height: 1;
}
.makeRequestForm {
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
                <RequestSide activeName="makeRequest"></RequestSide>
                <Col span="16" class="makeRequestForm">
                    <Card :padding="30" style="width:600px">
                        <p slot="title">Make A Request</p>
                        <Form @submit.prevent="onSubmit" label-position="top" ref="requestForm" :model="requestForm">
                            <FormItem label="Problem type" prop="problemType">
                                <Input type="text" v-model="requestForm.problemType" placeholder="Enter type of problem you need assistance with" name="problemType"></Input>
                            </FormItem>
                            <FormItem label="Plate number" prop="plateNumber">
                                <Input type="text" v-model="requestForm.plateNumber" placeholder="Enter your number plate" name="plateNumber"></Input>
                            </FormItem>
                            <FormItem label="Vehicle model" prop="model">
                                <Input type="text" v-model="requestForm.model" placeholder="Enter your vehicles model type" name="model"></Input>
                            </FormItem>
                            <FormItem label="Vehicle colour" prop="colour">
                                <Input type="text" v-model="requestForm.colour" placeholder="Enter the colour of your vehicle" name="colour"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="onSubmit('requestForm')">Make Request</Button>
                            </FormItem>
                        </Form>
                    </Card>
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

export default {
    data () {
        return {
            requestForm: {
                memberID: null,
                latitude: 0,
                longitude: 0,
                problemType: '',
                plateNumber: '',
                model: null,
                colour: null,
                room: ''
            }
        }
    },
    components: {
        'Navigation': Navigation,
        'RequestSide': RequestSideNav
    },
    computed: {
        ...mapState('requests', ['request'])
    },
    created () {
        this.getLocation();
        this.requestForm.memberID = this.$store.state.account.user._id;
    },
    methods: {
        ...mapActions('requests', ['createRequest']),
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setPosition);
            }
        },
        setPosition(position) {
            this.requestForm.latitude = position.coords.latitude;
            this.requestForm.longitude = position.coords.longitude;
        },
        onSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.requestForm.room = this.$store.state.account.user.username + 'ROOM';
                    this.createRequest(this.requestForm);
                } else {
                    this.$Message.error('Fail!');
                    return;
                }
            })
        }
    }
}
</script>
