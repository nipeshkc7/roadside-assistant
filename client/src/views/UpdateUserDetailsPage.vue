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
</style>

<template>
    <div>
        <Navigation activeName="update-profile"></Navigation>
        <div class="content">
            <div>
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
            pwd_toggle:true           
        }
    },
    components: {
        'Navigation': Navigation
    },
    methods: {
        onSubmit(name) { // name is the name of the data we want to update
            this.$refs[name].validate((valid) => { // Checks if the data is valid
                if (valid) {
                    //* Since we want to update the local storage we need to grab all of the existing users object, as we overide the local storage with a new object
                    const userDetails = authenticationService.currentUserValue; // Gets the user object from the authentication service (without the changes)
                    userDetails.username = this.userdata.username; // NOTE: Arpan you must use this.userdata as userdata is a variable of this vue instance not a global
                    userDetails.firstName = this.userdata.firstName;
                    userDetails.lastName = this.userdata.lastName;

                    localStorage.setItem('currentUser', JSON.stringify(userDetails)); // Commit the users updated details to the local storage (also updates vues store)

                    userService.update(this.userdata, authenticationService.currentUserValue._id);
                } else { // Else return
                    // TODO: Add an error message here, saying that details were unable to be updated
                    return;
                }
            })
        }
    }
}
</script>