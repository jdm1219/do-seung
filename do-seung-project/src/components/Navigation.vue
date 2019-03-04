<template>
    <v-navigation-drawer>
        <v-toolbar flat>
        <v-list>
            <v-list-tile>
            <v-list-tile-title class="title">
                Application
            </v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense class="pt-0">
        <v-list-tile
            v-for="item in items"
            :key="item.title"
        >
            <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          sub-group
          no-action
        >
            <v-list-tile slot="activator">
                <v-list-tile-title>Actions</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
                v-for="(crud, i) in cruds"
                :key="i"
            >
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {title: 'home', icon: 'dashboard'},
                { title: 'About', icon: 'question_answer'}
            ],
            cruds: [
                ['Create', 'add'],
                ['Read', 'insert_drive_file'],
                ['Update', 'update'],
                ['Delete', 'delete']
            ],
            years: [

            ],
            right: null
        }
    } 
}
</script>
