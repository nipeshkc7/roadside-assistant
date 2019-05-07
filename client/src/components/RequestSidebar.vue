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
                    <MenuItem name="makeRequest" to="/make-request">
                    Make request
                    </MenuItem>
                    <MenuItem name="viewAccepted" to="/">
                    View accepted
                    </MenuItem>
                </Menu>
            </div>
        </Col>
    </div>
</template>

<script>
export default {
    name: 'RequestSideNav',
    props: ['activeName', 'hasCreated']
};
</script>
