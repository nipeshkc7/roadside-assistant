<style scoped>
.content {
    padding: 200px 0;
}
</style>

<template>
    <div class="content">
        <Row type="flex" justify="center" align="middle">
            <Col span="6">
                <Card :padding="30">
                    <p slot="title">Login</p>
                    <Form @submit.prevent="onSubmit" label-position="top" ref="loginForm" :model="loginForm" :rules="loginRules">
                        <FormItem label="Username" prop="username">
                            <Input type="text" v-model="loginForm.username" placeholder="Enter your username" name="username">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem label="Password" prop="password">
                            <Input type="password" v-model="loginForm.password" placeholder="Enter your password" name="password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" :disabled="status.logginIn" @click="onSubmit('loginForm')">Login</Button>
                            <Button type="text" to="/register">Register</Button>
                        </FormItem>
                    </Form>
                </Card>    
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data () {
        return {
            loginForm: {
                username: '',
                password: '',
            },
            submitted: false,
            // Validation rules
            loginRules: {
                username: [
                    { required: true, message: 'Username is required.', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Password is required.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 characters', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        onSubmit (name) {
            // Checks if the information entered is valid
            this.$refs[name].validate((valid) => {
                this.submitted = true;
                // If valid attempt to login with details else do nothing
                if (valid) {
                    const { username, password } = this.loginForm;
                    if (username && password) {
                        this.login({ username, password });
                    }
                } else {
                    return;
                }
            })
        }
    }
};
</script>