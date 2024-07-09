<template>
    <div class="containerModule">
        <h3>{{ t(`organization.t1`) }}</h3>
        <div class="moduleItemContainer">
            <div>
                <p>{{ t(`organization.t2`) }}</p>
                <a class="btn" v-if="inviteUrl" v-clipboard="{
                    msg: inviteUrl,
                    success: () => showSuccessToast(t(`organization.t4`)),
                }">{{ t(`organization.t3`) }}</a>
                <span v-else>---</span>
            </div>
            <div>
                <p>{{ t(`organization.t5`) }}</p>
                <a>{{ ETH.format_address(person.inviteUserAddress || userinfo.inviteUserAddress) }}</a>
            </div>
            <div>
                <p>{{ t(`organization.t6`) }}</p>
                <span>{{ userinfo.recommendNum }}</span>
            </div>
            <!-- <div>
                <p>{{ t(`organization.t7`) }}</p>
                <span>{{ userinfo.recommendTeamNum }}</span>
            </div> -->
            <!-- <div>
                <p>{{ t(`organization.t8`) }}</p>
                <span>{{ userinfo.userCount }}</span>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { ETH } from "@/tools/contract";
import { showSuccessToast } from "vant";
import userPerson from "@/pinia/person";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const person = userPerson();
const userinfo = $computed(() => person.userinfo);
const inviteUrl = $computed(() => userinfo.inviteUrl && userinfo.LocationList.length !== 0 ? `https://${window.location.host}/#/?inviteCode=-inviteTdh-${userinfo.inviteUrl}-inviteTdh-` : ``,)
</script>
<style lang="less" scoped>
@import "organization";
</style>