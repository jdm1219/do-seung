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
            <v-toolbar flat>
            <v-list>
                <v-list-tile>
                <v-list-tile-title class="title">
                    Navigation
                </v-list-tile-title>
                </v-list-tile>
            </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
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
    } 
}
</script>

<style>
    .v-toolbar {
        padding-left: 0 !important;
    }
</style>
