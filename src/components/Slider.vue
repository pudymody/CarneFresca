<template>
	<div class="slider">
		<button @click="decrement" class="slider__button slider__button--less" v-if="editing">-</button>
		<div class="slider__value">
			<svg viewBox="0 0 226 226" preserveAspectRatio="xMidYMid meet" class="slider__star" v-for="n in value" :key="n" :fill="COLORS[value-1]">
				<path d="M 43.680672,226 113,0 182.31933,226 0,86 h 226 z"/>
			</svg>
		</div>
		<button @click="increment" class="slider__button slider__button--more" v-if="editing">+</button>
	</div>
</template>

<style scoped>
	.slider {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.slider__button {
		width: 10%;
		display: block;
		border: none;
		padding: 0;
		align-self: stretch;
	}
	.slider__button--less { background: #FF4136; }
	.slider__button--more { background: #2ECC40; }

	.slider__value {
		padding: 8px;
		flex: 1;
		text-align: center;
	}
	.slider__star {
		display: inline-block;
		height: 24px;
	}
</style>

<script>
export default {
	props : {
		value : {
			type: Number,
			default : 3
		},
		editing : {
			type: Boolean,
			default: true
		},
		min : {
			type: Number,
			default : 1,
			validator: function(value){
				return value >= 0;
			}
		},
		max : {
			type: Number,
			default : 5,
			validator : function(value){
				return value >= 0
			}
		},
		COLORS : {
			default : function(){ return ["#FF4136", "#FF851B", "#FFDC00", "#01FF70", "#2ECC40"]; }
		}
	},
	methods : {
		decrement : function(){
			this.$emit('input', Math.max( this.min, this.value-1 ));
			if( this.value > this.min ){
				this.$emit("decrement");
			}
		},
		increment : function(){
			this.$emit('input', Math.min( this.max, this.value+1 ));
			if( this.value < this.max ){
				this.$emit("increment");
			}
		}
	}
}
</script>