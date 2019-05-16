<style>

</style>

<template>
    <div class="content">
        <Navigation activeName="update-bank"></Navigation>
        <div v-if="toggleSuccessMsg" class="alert">Successfully changed Bank details.</div>
        <div v-else class="container">
            <Row type="flex" justify="center" align="middle">
                <Col span="15">
                    <Card :padding="25">
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
            </Row>
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
                promiseObj.then(()=>{console.log("success");
                                     this.toggleSuccessMsg=true;                                     
                                     setTimeout(() => {this.toggleSuccessMsg=false; },3000);    },
                                ()=>{console.log("failiure");})
            }
         }
    }
</script>