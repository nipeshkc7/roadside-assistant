<style scoped>
.updateForm {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 25px;
}

.alert {
  padding: 20px;
  background-color: #4CAF50;;
  color: white;
  margin-bottom: 15px;
  text-align: center;
  font-size: 18px;
}

</style>

<template>
    <div>
        <Navigation activeName=""></Navigation>
        <div class="content">
            <div>
                <Modal v-model="toggleMsg" title="Alert">        
                    <p>{{modalMsg}}</p>
               </Modal>
                <Row>
                    <update-sidebar class="sidebar" activeName="updateBank"></update-sidebar>
                    <Col span="16" class="updateForm">
                        <Card :padding="30" style="width:600px">
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
import updateDetailsSideNav from '../components/updateDetailsSidebar.vue';

export default{
    data () {
        return {
            bankDets: {
                bsb: '',
                accountNumber: '',
            },
            toggleMsg:false, 
            modalMsg:'',
        }
    },
    components: {
        'Navigation': Navigation,
        'update-sidebar': updateDetailsSideNav,
    },
    methods: {
        onSubmit(){
            const promiseObj=userService.updateBank(this.bankDets, authenticationService.currentUserValue._id);
            promiseObj.then(() => {
                console.log("success");
                this.modalMsg='You have successfully changed your bank details';
                this.toggleMsg=true;
                },
                ()=>{this.toggleMsg=true;
                    this.modalMsg='Failure to update Bank details'
            })
        }
    }
}
</script>