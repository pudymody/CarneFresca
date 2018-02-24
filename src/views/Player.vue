<template>
	<div>
		<div class="habilities">
			<h2 class="habilities__title">Daño</h2>
			<slider v-model="damage" :min="0" :max="6"></slider>
		</div>
		<div class="habilities">
			<h2 class="habilities__title">Tension</h2>
			<slider v-model="tension" :min="0" :max="6"></slider>
		</div>
		<div class="habilities" v-for="(value,key) in playerData" :key="key">
			<h2 class="habilities__title">{{key}}</h2>
			<slider :editing="false" v-model="value.value"></slider>
			<div v-for="h in value.habilities" :key="h.name">
				<h4 class="habilities__title">{{h.name}}</h4>
				<div class="habilities__desc">{{h.desc}}</div>
				<slider :editing="false" v-model="h.value"></slider>
			</div>
		</div>
	</div>
</template>
<style>
	.habilities {
		margin-top: 20px;
		background: #fff;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
	}
	.habilities__title {
		text-align: center;
		margin-bottom: 0;
	}
	.habilities__desc {
		color: #555;
		padding: 0 .83em;
		text-align: center;
	}
</style>

<script>
import Slider from '@/components/Slider.vue'

export default {
	components: { Slider },
	name: 'player',
	data: function(){
		return {
			playerData : JSON.parse(localStorage.getItem('playerData')),
			damage : 0,
			tension : 0
		}
	}
}

</script>
