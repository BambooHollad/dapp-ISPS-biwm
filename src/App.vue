<template>
    <f7-app v-bind="f7params">
        <f7-view main url="/" dark v-if="person.isLogin"></f7-view>
        <Login v-else />
    </f7-app>
</template>
<script setup lang="ts">
import userPerson from "@/pinia/person";
import userSystem from "@/pinia/system";
import { onMounted, nextTick } from "vue"
import routes from "./router";
const person = userPerson();
const system = userSystem();
const f7params = {
    name: "f7-empty-template",
    theme: "ios",
    routes,
    router: {
        // 指定使用 hash 模式
        history: 'hash',
    },
    view: {
        iosDynamicNavbar: false,
        stackPages: true,
        browserHistory: true,
        browserHistoryRoot: "/",
        browserHistoryOnLoad: false,
    },
};
system.initTime();
onMounted(async () => {
    await nextTick();
    console.log('person', person)
    person.init();
})
</script>
