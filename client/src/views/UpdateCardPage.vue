<style scoped>
.updateForm {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 25px;
}
</style>

<template>
    <div>
        <Navigation activeName=""></Navigation>
        <div class="content">
            <div v-if="toggleSuccessMsg" class="alert">Successfully changed Card details.</div>
            <div v-else>
                <Row>
                    <Col span="4"><br></Col>
                    <Col span="16" class="updateForm">
                        <Card :padding="30" style="width:800px">
                            <p slot="title">Update your Card details</p>
                            <Form @submit.prevent="onSubmit" label-position="top" ref="cardDets" :model="cardDets" >
                                <FormItem label="First Name" prop="firstName">
                                    <Input type="text" v-model="cardDets.firstName" placeholder="Enter your First Name" name="firstName" ></Input>
                                </FormItem>
                                <FormItem label="Last Name" prop="lastName">
                                    <Input type="text" v-model="cardDets.lastName" placeholder="Enter your Last Name" name="lastName" ></Input>
                                </FormItem>

                                <FormItem label="Card Number" prop="cardNumber">
                                    <Input type="number" v-model="cardDets.cardNumber" placeholder="Card Number" name="cardNumber" ></Input>
                                </FormItem>
                                <FormItem label="Expiry date" prop="expDate">
                                    <DatePicker v-model="cardDets.expDate" type="month" format="MM/yy" placeholder="Select expiration date" name="expDate" style="width: 100%"></DatePicker>
                                </FormItem>
                                <FormItem label="CVV" prop="CVV">
                                    <Input type="text" v-model="cardDets.CVV" placeholder="Enter your CVV" name="CVV" ></Input>
                                </FormItem>

                                <FormItem>
                                    <Button type="primary" @click="onSubmit('cardDets')">Done</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                    <Col span="4"></Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { userService,authenticationService } from '@/_services';
import Navigation from '@/components/Navigation';
export default{
    data() {
        return{
            cardDets: {
                firstName: '',
                lastName: '',
                cardNumber: '',
                expDate: '',
                CVV: ''
            },
            toggleSuccessMsg: false,          
        }
    },
    components: {
        'Navigation': Navigation
    },
    methods: {
        onSubmit(){
            const promiseObj=userService.updateCard(this.cardDets, authenticationService.currentUserValue._id);
            console.log(promiseObj);
            promiseObj.then(() => {
                console.log("success");
                this.toggleSuccessMsg=true;                                     
                setTimeout(() => {this.toggleSuccessMsg=false; },3000);
            },
            ()=>{ console.log("failure"); })
        }
    }
}
</script>