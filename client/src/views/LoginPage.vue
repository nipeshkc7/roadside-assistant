<style>
.loginForm {
    padding: 200px 0;
}
</style>

<template>
    <div class="loginForm">
        <Row type="flex" justify="center" align="middle">
            <Col span="6">
                <Form @submit.prevent="onSubmit" label-position="top" :rules="loginRules">
                    <FormItem label="Username" prop="username">
                        <Input type="text" v-model="username" placeholder="Enter your username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem label="Password" prop="password">
                        <Input type="password" v-model="password" placeholder="Enter your password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" :disabled="status.logginIn">Login</Button>
                        <Button type="text" to="/register">Register</Button>
                    </FormItem>
                </Form>    
            </Col>
        </Row>
    </div>
</template>

<script>
import { router } from '@/_helpers';
import { authenticationService } from '@/_services';
import { mapState, mapActions } from 'vuex';

export default {
    data () {
        return {
            username: '',
            password: '',
            loginRules: {
                username: [
                    { required: true, message: 'Username is required.', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Password is required.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 characters', trigger: 'blur' }
                ]
            },
            returnUrl: ''
        };
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        if (authenticationService.currentUserValue) {
            return router.push('/');
        }

        this.returnUrl = this.$route.query.returnUrl || '/';
    },
    methods: {
        ...mapActions('account', ['login']),
        onSubmit (e) {
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        },
    }
};
</script>