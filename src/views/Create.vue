<template>
	<Creator :CURRENT_STEP="CURRENT_STEP" v-on:created="createPlayer"></Creator>
</template>

<script>
import Creator from '@/components/Creator.vue'
export default {
	name:'create',
	components : { Creator },
	props: {
		CURRENT_STEP : {
			type: Number,
			required: false,
			default: 0
		}
	},
	methods : {
		createPlayer : function(data){
			localStorage.setItem("playerData", JSON.stringify(data));
			this.$router.push('/player');
		}
	}
}
</script>
