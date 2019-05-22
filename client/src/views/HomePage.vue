<style>
.content {
    display: block;
    margin: 15px auto 15px;
    background: #fff;
}
.alertNotification {
    padding: 10px 0px 10px 0px;
}
</style>

<template>
    <div>
        <Navigation activeName="Home"></Navigation>
        <div class="content">
            <Modal v-model="membershipModal" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>Subscription Expired</span>
                </p>
                <div style="text-align:center">
                    <p>Unfortunately your subscription has expired!</p>
                    <br>
                    <p>Please confirm below if you wish to renew your membership. Your saved payment details will be used for renewal.</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long>Renew Subscription</Button>
                </div>
            </Modal>
            <Row>
                <Col span="4"><br></Col>
                <Col span="16">
                    <div class="alertNotification" v-if="showCardAlert">
                        <Alert show-icon closable>
                            No Credit Card
                            <template slot="desc">You do not currently have a credit card saved in the system, please <router-link to="/update-card">add your credit card details</router-link> to your account so you can make service requests!</template>
                        </Alert>
                    </div>
                    <div class="alertNotification" v-if="showBankAlert">
                        <Alert show-icon closable>
                            No Bank Account
                            <template slot="desc">You do not currently have your bank account details saved in the system, please <router-link to="/update-bank">add your bank details</router-link> otherwise you will not be able to receive payment for completing service requests!</template>
                        </Alert>
                    </div>
                    <div class="alertNotification" v-if="showMembershipAlert">
                        <Alert show-icon closable>
                            Membership Subscription
                            <span slot="desc">Your current subscription will expire in {{daysLeft}} days, please renew it before the expiration date! <br><br><Button type="text">renew</Button></span>
                        </Alert>
                    </div>
                </Col>
                <Col span="4"></Col>
            </Row>
            <h1>HomePage</h1>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { userService } from '@/_services';
import Navigation from '@/components/Navigation';
import io from 'socket.io-client';
import dayjs from 'dayjs';

export default {
    data () {
        return {
            cardDetails: null,
            bankDetails: null,
            showCardAlert: false,
            showBankAlert: false,
            showMembershipAlert: false,
            modal_loading: false,
            membershipModal: false,
            daysLeft: null
        }
    },
    components: {
        'Navigation': Navigation
    },
    computed: {
        ...mapState({
            account: state => state.account
        }),
    },
    methods: { // TODO: Generalize getCard and getBank methods into one
        getCard () {
            if (this.account.user.role == 'Member') {

                userService.getCardDetails(this.account.user._id)
                    .then(
                        cardDetails => { 
                            this.cardDetails = cardDetails;
                            
                            if (this.cardDetails == "") { this.showCardAlert = true; }
                            else {
                                if (this.account.user.expirationDate == null || dayjs().isAfter(dayjs(this.account.user.expirationDate))) {
                                    this.membershipModal = true;
                                }
                                else if (dayjs(this.account.user.expirationDate).diff(dayjs(), 'day') < 30) {
                                    this.showMembershipAlert = true;
                                    this.daysLeft = dayjs(this.account.user.expirationDate).diff(dayjs(), 'day');
                                }
                            }
                        }
                    );
            } else {
                return;
            }
        },
        getBank () {
            if (this.account.user.role == 'Professional') {

                userService.getBankDetails(this.account.user._id)
                    .then(
                        bankDetails => {
                            this.bankDetails = bankDetails;

                            if (this.bankDetails == null) { this.showBankAlert = true; }
                        }
                    );
            } else {
                return;
            }
        },
        hello() {
            this.$Message.info('You click ok');
        }
    },
    created () {
        this.getCard(),
        this.getBank()
    },
};
</script>