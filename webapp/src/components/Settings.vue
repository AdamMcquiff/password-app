<template>
    <div class="settings">
        <h1>
            Hi {{ this.user.forename }}.
        </h1>
    </div>
</template>

<script>
import router from '../router'
import HttpHelper from '../common/http-common'
import { isJWTTokenValid } from '../common/auth'
import { getForenameFromName } from '../common/utils'

export default {
    name: 'Settings',
    data: () => {
        return {
            httpHelper: null,
            user: {
                forename: ''
            }
        }
    },
    beforeCreate: function () {
        // Check if the user is signed in, if not, redirect to login
        if (!isJWTTokenValid()) router.push('/login')

        this.httpHelper = new HttpHelper();

        this.httpHelper.httpAuth.get('profile')
            .then(response => {
                this.user.forename = getForenameFromName(response.data.name)
                this.user.logins = response.data.Logins
            })
            .catch(e => {})
    }
};
</script>

<style scoped>
.settings h1 {
    margin-top: 0;
}

.settings h2 {
    font-size: 1.25em;
    font-weight: 500;
}

</style>
