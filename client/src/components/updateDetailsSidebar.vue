<style>
.navigate {
    padding: 10px 0px 10px 0px;
}
</style>

<template>
    <div>
        <Col span="4" class="wrapper-navigate">
            <div class="navigate">
                <Menu theme="light" :active-name="activeName" width="auto">
                    <MenuItem name="updateDetails" to="/update-details">
                    Update details
                    </MenuItem>
                    <MenuItem name="updateBank" v-if="account.user.role === 'Professional'" to="/update-bank">
                    Update Bank details
                    </MenuItem>
                    <MenuItem name="updateCard" v-if="account.user.role === 'Member'" to="/update-card">
                    Update Card details
                    </MenuItem>
                </Menu>
            </div>
        </Col>
    </div>
</template>

<script>


import { mapState, mapActions } from 'vuex';

export default {
    name: 'updateDetailsSideNav',
    props: ['activeName', 'hasCreated'],
    computed: {
        ...mapState({
            account: state => state.account
        }),
    }
};
</script>
