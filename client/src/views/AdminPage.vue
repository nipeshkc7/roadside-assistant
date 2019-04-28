<style>
.content {
    margin-top: 170px;
}
.user-table {
    margin: 10px;
}
</style>

<template>
    <div>
        <Navigation activeName="Admin"></Navigation>
        <div class="content">
            <Row>
                <Col span="4"><br></Col>
                <Col span="16">
                    <h1>Admin Page</h1>
                    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                    <Table border :loading="users.loading" :columns="columns12" :data="users.items" class="user-table">
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                            <Button type="error" size="small" @click="deleteU(index, row.id)">Delete</Button>
                        </template>
                    </Table>
                </Col>
                <Col span="4"><br></Col>
            </Row>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Navigation from '@/components/Navigation';

export default {
    data () {
        return {
            columns12: [
                {
                    title: 'Username',
                    key: 'username'
                },
                {
                    title: 'First Name',
                    key: 'firstName'
                },
                {
                    title: 'Last Name',
                    key: 'lastName'
                },
                {
                    title: 'Role',
                    key: 'role',
                    filters: [
                        {
                            label: 'Admin',
                            value: 'Admin'
                        },
                        {
                            label: 'Member',
                            value: 'Member'
                        },
                        {
                            label: 'Professional',
                            value: 'Professional'
                        }
                    ],
                    filterMethod (value, row) {
                        return row.role.indexOf(value) > -1;
                    }
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ]
        }
    },
    components: {
        'Navigation': Navigation
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),
        deleteU(index, id) {
            this.$Message.info(id);
            this.deleteUser(id);
            this.users.splice(index, 1);
        }
    }
};
</script>