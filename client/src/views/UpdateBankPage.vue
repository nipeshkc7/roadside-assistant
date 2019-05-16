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
            <div v-if="toggleSuccessMsg" class="alert">Successfully changed Bank details.</div>
            <div v-else>
                <Row>
                    <Col span="4"><br></Col>
                    <Col span="16" class="updateForm">
                        <Card :padding="30" style="width:800px">
                            <p slot="title">Update your Bank details</p>
                            <Form @submit.prevent="onSubmit" label-position="top" ref="bankDets" :model="bankDets" >
                                <FormItem label="BSB" prop="bsb">
                                    <Input type="text" v-model="bankDets.bsb" placeholder="Enter your BSB" name="bsb" ></Input>
                                </FormItem>
                                <FormItem label="Account Number" prop="accountNumber">
                                    <Input type="text" v-model="bankDets.accountNumber" placeholder="Enter your Account number" name="accountNumber" ></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="onSubmit('userdata')">Done</Button>
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
    data () {
        return {
            bankDets: {
                bsb: '',
                accountNumber: '',
            },
            toggleSuccessMsg:false,          
        }
    },
    components: {
        'Navigation': Navigation
    },
    methods: {
        onSubmit(){
            const promiseObj=userService.updateBank(this.bankDets, authenticationService.currentUserValue._id);
            promiseObj.then(() => {
                console.log("success");
                this.toggleSuccessMsg=true;                                     
                setTimeout(() => {this.toggleSuccessMsg=false; },3000);
                },
                ()=>{console.log("failiure");
            })
        }
    }
}
</script>