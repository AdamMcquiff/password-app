<template>
    <div class="home"> 
        <h1>
            Hi {{ this.user.forename }}.
        </h1>

        <h2>
            Last Logins
        </h2>

        <table>
            <tr>
                <th>IP Address</th>
                <th>Hostname</th>
                <th>Date/Time</th> 
            </tr>
            <tr v-for="login in user.logins" v-bind:key="login.datetime">
                <td>{{ login.ip }}</td>
                <td>{{ login.hostname }}</td>
                <td>{{ login.datetime }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import router from '../router'
import HttpHelper from '../common/http-common'
import { getForenameFromName } from '../common/utils'

export default {
    name: 'Home',
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
        if (localStorage.getItem('token') == null) router.push('/login')

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
.home h1 {
    margin-top: 0;
}

.home h2 {
    font-size: 1.25em;
    font-weight: 500;
}

.home table {
    width: 100%;
    border-collapse: collapse;
}

.home th {
    text-align: left;
    font-weight: 500;
    padding: 0 1em 0 .25em;
    line-height: 1.75;
}

.home td {
    color: #505050;
    font-weight: 200;
    padding: .25em 2em .25em .25em;
    line-height: 1.75;
}

.home tr:nth-child(even) {
    background: #E3E3E3;
}
</style>
