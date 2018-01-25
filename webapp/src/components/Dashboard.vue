<template>
    <main class="dashboard">
        <nav class="nav">  
            <div class="wrapper">
                <button class="icon notifications" aria-label="Notiication Settings"></button>
                <button class="icon settings" aria-label="General Settings"></button>
                <hr>
                <button class="icon signout" aria-label="Signout"></button>
            </div>
        </nav>

        <aside class="sidebar">
            <div class="avatar"></div>
        </aside>

        <section>
            <h1>
                Hi {{ this.user.forename }}, welcome back.
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
                <tr v-for="login in user.logins" v-bind:key="login">
                    <td>{{ login.ip }}</td>
                    <td>{{ login.hostname }}</td>
                    <td>{{ login.datetime }}</td>
                </tr>
            </table>
        </section>
    </main>
</template>

<script>
import router from "../router"
import { httpAuth } from "../common/http-common"
import { getForenameFromName } from "../common/utils"

export default {
  name: "Dashboard",
  data: () => {
      return {
          user: {
              forename: ""
          }
      }
  },
  created: function() {
    httpAuth.get('profile')
        .then(response => {
            this.user.forename = getForenameFromName(response.data.name)
            this.user.logins = response.data.Logins
        })
        .catch(e => {
            //
        })
  },
  methods: {
      //
  }
};
</script>

<style scoped>
.nav {
    position: fixed;
    background: #2193B0;
    width: 4.6875em;
    height: 100vh;
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
    height: 100vh;
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

    section h1 {
        margin-top: 0;
    }

    section h2 {
        font-size: 1.25em;
        font-weight: 500;
    }

    section table {
        width: 100%;
        border-collapse: collapse;
    }

    section th {
        text-align: left;
        font-weight: 500;
        padding: 0 1em 0 .25em;
        line-height: 1.75;
    }

    section td {
        color: #505050;
        font-weight: 200;
        padding: .25em 2em .25em .25em;
        line-height: 1.75;
    }
    
    section tr:nth-child(even) {
        background: #E3E3E3;
    }
</style>
