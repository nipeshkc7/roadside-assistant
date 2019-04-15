<style>
.container {
    padding: 50px;
}
</style>

<template>
    <div class="container">
        <Row type="flex" justify="center" align="middle">
            <Col span="10">
                <Card :padding="30">
                    <p slot="title">Registration</p>
                    <Form label-position="top" v-if="current === 0">
                        <FormItem label="Username">
                            <Input placeholder="Enter your username"></Input>
                        </FormItem>
                        <FormItem label="Email">
                            <Input placeholder="Enter your e-mail"></Input>
                        </FormItem>
                        <FormItem label="Password">
                            <Input placeholder="Enter your password"></Input>
                        </FormItem>
                        <FormItem label="Confirm Password">
                            <Input placeholder="Re-enter your password"></Input>
                        </FormItem>
                    </Form>
                    <Form label-position="top" v-else>
                        <FormItem label="First name">
                            <Input placeholder="Enter your first name"></Input>
                        </FormItem>
                        <FormItem label="Last name">
                            <Input placeholder="Enter your last name"></Input>
                        </FormItem>
                        <FormItem label="Date of birth">
                            <DatePicker type="date" placeholder="Select date"></DatePicker>
                        </FormItem>
                        <br>
                        <Divider dashed />
                        <FormItem label="Card number">
                            <Input placeholder="Enter your card number"></Input>
                        </FormItem>
                        <FormItem label="CVV">
                            <Input placeholder="Enter your CVV"></Input>
                        </FormItem>
                        <FormItem label="Expiry date">
                            <DatePicker type="date" placeholder="Select date"></DatePicker>
                        </FormItem>
                        <FormItem label="Name on the credit card">
                            <Input placeholder="Enter the name on the card"></Input>
                        </FormItem>
                    </Form>
                    <Steps :current="current">
                        <Step title="Your details">hello</Step>
                        <Step title="Card details"></Step>
                    </Steps>
                    <br>
                    <Button type="primary" v-if="current !== 1" @click="next">Next</Button>
                    <Button type="primary" v-if="current === 1">Sign Up</Button>
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
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                role: 'Member',
                membershipType: '',
            },
            card: {
                cardNumber: '',
                CCV: '',
                expiryDate: '',
                nameOnCard: ''
            },
            current: 0,
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        next () {
            this.current += 1;
        },
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
        }
    }
};
</script>
