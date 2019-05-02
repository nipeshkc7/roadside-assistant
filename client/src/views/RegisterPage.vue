<style>
.container {
    padding: 50px;
}

p {
    font-size: 12px;
    padding: 0 0 10px 0;
    line-height: 1;
}
</style>

<template>
    <div class="container">
        <Row type="flex" justify="center" align="middle">
            <Col span="10">
                <Card :padding="30">
                    <p slot="title">Registration</p>
                    <Form @submit.prevent="onSubmit" label-position="top" ref="registerForm" :model="registerForm" :rules="registerRules">
                        <FormItem label="First name" prop="firstName">
                            <Input type="text" v-model="registerForm.firstName" placeholder="Enter your first name" name="firstName"></Input>
                        </FormItem>
                        <FormItem label="Last name" prop="lastName">
                            <Input type="text" v-model="registerForm.lastName" placeholder="Enter your last name" name="lastName"></Input>
                        </FormItem>
                        <FormItem label="Username" prop="username">
                            <Input type="text" v-model="registerForm.username" placeholder="Enter your username" name="username"></Input>
                        </FormItem>
                        <FormItem label="Password" prop="password">
                            <Input type="password" v-model="registerForm.password" placeholder="Enter your password" name="password"></Input>
                        </FormItem>
                        <FormItem label="Confirm Password" prop="passwdCheck">
                            <Input type="password" v-model="registerForm.passwdCheck" placeholder="Re-enter your password" name="passwdCheck"></Input>
                        </FormItem>
                        <FormItem label="Select User Type" prop="role">
                            <Select v-model="registerForm.role" name="role">
                                <Option v-for="item in registrationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="Select Membership Type" prop="membershipType" v-if="registerForm.role === 'Member'">
                            <Select v-model="registerForm.membershipType" name="membershipType">
                                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="onSubmit('registerForm')">Sign Up</Button>
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
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'));
            } else {
                if (this.registerForm.passwdCheck !== '') {
                    this.$refs.registerForm.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('The two passwords do not match!'));
            } else {
                callback();
            }
        };

        return {
            registrationList: [
                {
                    value: 'Member',
                    label: 'Member'
                },
                {
                    value: 'Professional',
                    label: 'Professional'
                }
            ],
            typeList: [
                {
                    value: 'Per-service',
                    label: 'Per-service'
                },
                {
                    value: 'Subscription',
                    label: 'Subscription'
                }
            ],
            registerForm: {
                username: '',
                password: '',
                passwdCheck: '',
                firstName: '',
                lastName: '',
                membershipType: null,
            },
            submitted: false,
            // Validation rules
            registerRules: {
                username: [
                    { required: true, message: 'Username is required.', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 characters', trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                firstName: [
                    { required: true, message: 'First name is required.', trigger: 'blur' }
                ],
                lastName: [
                    { required: true, message: 'Last name is required.', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: 'Role is required.', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        onSubmit(name) {
            this.$refs[name].validate((valid) => {
                this.submitted = true;
                if (valid) {
                    this.register(this.registerForm);
                } else {
                    this.$Message.error('Fail!');
                    return;
                }
            })
        }
    }
};
</script>
