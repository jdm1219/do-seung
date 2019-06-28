<template>
    <nav>
        <v-toolbar flat app fixed>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-navigation-drawer
        v-model="drawer"
        app
        fixed
        >


            <v-list dense class="pt-0">
            <v-list-tile v-if="userId">안녕하세요 {{ userId }}님</v-list-tile>
            <v-list-tile v-else>로그인 해주세요</v-list-tile>

            <v-list-tile
                v-for="item in items"
                :key="item.title"
                :to="item.link"
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {title: 'Dashboard', icon: 'dashboard', link: '/'},
                { title: 'Chat', icon: 'widgets', link: 'chat'}
            ],
            drawer: true
        }
    },
    props: {
        userId: String
    }
}
</script>

<style>
    .v-toolbar {
        padding-left: 0 !important;
        display: none;
    }
    @media screen and (max-width: 1200px){
        .v-toolbar {
            display: block;
        }
    }
</style>
