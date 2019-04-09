<style>
.loginForm {
    padding: 200px 0;
}
</style>

<template>
    <div class="loginForm">
        <h2>Login Page</h2>
        <br>
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
                <Button type="primary" :disabled="status.logginIn" long>Login</Button>
            </FormItem>
        </Form>
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
            returnUrl: '',
            error: ''
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
        onSubmit () {
        }
    }
};
</script>