<template>
    <main class="dashboard">
        <nav class="nav">  
            <div class="wrapper">
                <router-link :to="{ name: 'Notifications' }">
                    <button class="icon notifications" aria-label="Notification Settings"></button>
                </router-link>

                <router-link :to="{ name: 'Settings' }">
                    <button class="icon settings" aria-label="General Settings"></button>
                </router-link>

                <hr>
                <button class="icon signout" aria-label="Signout" v-on:click="signout"></button>
            </div>
        </nav>

        <aside class="sidebar">
            <router-link :to="{ name: 'Home' }">
                <div class="avatar"></div>
            </router-link>
        </aside>
        
        <section>    
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </main>
</template>

<script>
import router from '../router'
import HttpHelper from '../common/http-common'
import { getForenameFromName } from '../common/utils'

export default {
    name: 'Dashboard',
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
        if (localStorage.getItem('token') == null) router.push('/')

        this.httpHelper = new HttpHelper();

        this.httpHelper.httpAuth.get('profile')
            .then(response => {
                this.user.forename = getForenameFromName(response.data.name)
                this.user.logins = response.data.Logins
            })
            .catch(e => {})
    },
    methods: {
        signout: function() {
            localStorage.removeItem('token')
            router.push('/')
        }
    }
};
</script>

<style scoped>
.nav {
    position: fixed;
    background: #2193B0;
    width: 4.6875em;
    height: 150vh;
    padding: 1em 1.5em;
}

    .nav .wrapper {
        display: table-cell;
        vertical-align: bottom;
        height: calc(100vh - 2em);
    }

    .nav .icon {
        background: none;
        cursor: pointer;
        width: 2.4375em;
        height: 2.4375em;
        border: 0;
        opacity: .8;
        transition: opacity .2s ease;
        background-size: 100%;
        padding: 0;
    }

        .nav .icon:hover,
        .nav .icon:active,
        .nav .icon:focus {
            opacity: 1;
        }

    .nav hr {
        margin: 1.25em 0 1.5em;
    }

    .nav .notifications {
        background-image: url('./../assets/notifications-icon.svg');
        margin-bottom: 2em;
    }

    .nav .settings {
        background-image: url('./../assets/settings-icon.svg');
    }

    .nav .signout {
        margin-left: 3px;
        background-image: url('./../assets/sign-out-icon.svg');
    }

.sidebar {
    position: fixed;
    background: #61C4E2;
    left: 4.6875em;
    width: 9.375em;
    height: 150vh;
    padding: 1.5em;
}

    .avatar {
        width: 100%;
        height: 6.375em;
        border-radius: 100%;
        background: #505050;
    }

section {
    display: inline-block;
    position: relative;
    left: 14.0675em;
    min-height: 100vh;
    padding: 1.5em;
    width: calc(100% - 14.0675em);
}
</style>
