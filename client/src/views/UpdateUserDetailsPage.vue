<style>
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
</style>

<template>
    <div class="content">
        <Navigation activeName="update-profile"></Navigation>
        <div class="container">
            <Row type="flex" justify="center" align="middle">
                <Col span="10">
                    <Card :padding="30">
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
                            <FormItem label="Password" prop="password">
                                <Input type="password" v-model="userdata.password" placeholder="Enter your password" name="password" :disabled="pwd_toggle"></Input>
                                <span class="edit_btn"  v-on:click="pwd_toggle=!pwd_toggle">Edit</span>
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
    import Navigation from '@/components/Navigation';

    export default{
        data() {
            return{
                userdata: {
                    username: 'Username',
                    password: 'Password',
                    firstName: 'Firstname',
                    lastName: 'Lastname',
                },
                uname_toggle: true,
                lname_toggle:true,
                fname_toggle: true,
                pwd_toggle:true
       }
        },
        components: {
            'Navigation': Navigation
        }
        ,
        computed: {
            // ...mapState({
            //     users:state=>state.users.all
            // })
        },
         created () {
            //  this.getAllUsers();
         },
         methods: {
            //  ...mapActions('users', {
            //      getAllUsers: 'getAll'
            //  }),
            
         }
    }
</script>