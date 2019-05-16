<style scoped>
.edit_btn{
    float: right;
    margin-right:20px;
    font-weight: 20px;
    color:#1A0DAB;
    text-decoration: underline;
}
.edit_btn:hover{
    cursor: pointer;
}
.updateForm {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 25px;
}
.alert{
    display: flex;
    justify-content: center;
    margin:30px 0 0 30px;
    font-size: 21px;
    border-radius: 20px;
    background-color: #CFF09E;
    margin: 30px;
    padding:30px;
}
</style>

<template>
    <div>
        <Navigation activeName="update-profile"></Navigation>
        <div class="content">
            <div v-if="show_msg" class="alert">Successfully changed user information, you will be logged out for the changes to take effect.</div>
            <div v-else>
                <Row>
                    <Col span="4"><br></Col>
                    <Col span="16" class="updateForm">
                        <Card :padding="30" style="width:800px">
                            <p slot="title">Update your details</p>
                            <Form @submit.prevent="onSubmit" label-position="top" ref="userdata" :model="userdata" >
                                <FormItem label="First name" prop="firstName">
                                    <Input type="text" v-model="userdata.firstName" placeholder="Enter your first name" name="firstName" :disabled="fname_toggle"></Input>
                                    <span class="edit_btn" v-on:click="fname_toggle=!fname_toggle">Edit</span>
                                </FormItem>
                                <FormItem label="Last name" prop="lastName">
                                    <Input type="text" v-model="userdata.lastName" placeholder="Enter your last name" name="lastName" :disabled="lname_toggle"></Input>
                                <span class="edit_btn" v-on:click="lname_toggle=!lname_toggle">Edit</span>
                                </FormItem>
                                <FormItem label="Username" prop="username">
                                    <Input type="text" v-model="userdata.username" placeholder="Enter your username" name="username" :disabled="uname_toggle"></Input>
                                    <span class="edit_btn" v-on:click="uname_toggle=!uname_toggle">Edit</span>
                                </FormItem>
                                <!-- <FormItem label="Password" prop="password">
                                    <Input type="password" v-model="userdata.password" placeholder="Enter your password" name="password" :disabled="pwd_toggle"></Input>
                                    <span class="edit_btn"  v-on:click="pwd_toggle=!pwd_toggle">Edit</span>
                                </FormItem> -->
                                <FormItem>
                                    <Button type="primary" @click="onSubmit('userdata')">Done</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
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
                userdata: {
                    username: authenticationService.currentUserValue.username,
                    firstName: authenticationService.currentUserValue.firstName,
                    lastName: authenticationService.currentUserValue.lastName,
                },
                uname_toggle: true,
                lname_toggle:true,
                fname_toggle: true,
                pwd_toggle:true,
                show_msg:false,            
       }
        },
        components: {
            'Navigation': Navigation
        },
         methods: {
           ...mapActions('account', ['login', 'logout']),
            
            onSubmit(){
                userService.update(this.userdata, authenticationService.currentUserValue._id);
                console.log(this.show_msg);
                this.show_msg=!this.show_msg;
                setTimeout(() => {this.logout(); },3000);                            //logsout to reset authenticationService.currentUserValue
            }
         }
    }
</script>