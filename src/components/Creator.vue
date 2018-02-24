<template>
	<div>
		<!-- <input type="text" v-model="name" placeholder="Nombre" class="player__name"> -->
		<div class="habilities" v-for="(item,index) in CATEGORIES[step].items" :key="index">
			<h2 class="habilities__title">{{item.name}}</h2>
			<div class="habilities__desc">{{item.desc}}</div>
			<slider v-model="item.value" v-on:increment="decrementPoints" v-on:decrement="incrementPoints"></slider>
		</div>
		<h2 class="center">
			Quedan <span :class="{ 'is-invalid' : invalidPoints, 'is-valid' : validPoints }">{{CATEGORIES[step].pointsToAdd}}</span> puntos
		</h2>
		<div class="navbar">
			<button @click="prevStep" :disabled="!canMoveBackwards" class="navbar__item navbar__item--prev">Anterior</button>
			<button @click="nextStep" :disabled="!canMoveForwards" class="navbar__item navbar__item--next">Siguiente</button>
		</div>
	</div>
</template>

<style scoped>
	.habilities {
		margin-top: 20px;
		background: #fff;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
	}
	.habilities__title {
		text-align: center;
	}
	.habilities__desc {
		color: #555;
		padding: 0 .83em .83em .83em;
		text-align: center;
	}
	.slider {
		border-top: 1px solid #999;
	}
	.is-invalid { color: #FF4136; }
	.is-valid { color: #2ECC40; }
	.center { text-align: center; }

	.navbar {
		display: flex;
		flex-direction: row;
	}

	.navbar__item {
		flex: 1;
		margin: 0;
		display: block;
		border: none;
		padding: 10px;
		color: #fff;
	}
	.navbar__item--prev { background: #FF4136 }
	.navbar__item--next { background: #2ECC40}
	.navbar__item:disabled {
		background: #999;
		color: #333;
	}
</style>

<script>
import Slider from '@/components/Slider.vue'

export default {
	props: {
		CURRENT_STEP : {
			type: Number,
			required: true,
			default: 0
		}
	},
	components: { Slider },
	methods : {
		decrementPoints : function(){
			this.CATEGORIES[this.step].pointsToAdd--;
		},
		incrementPoints : function(){
			this.CATEGORIES[this.step].pointsToAdd++;
		},
		nextStep : function(){
			var nextID = this.CURRENT_STEP + 1;
			if( nextID < this.STEPS.length ){
				this.CATEGORIES[ this.STEPS[nextID] ].items.forEach(function(item){
					item.value = this.stats[ this.STEPS[nextID] ];
				}, this);
				this.$router.push({ name:'create', params:{ CURRENT_STEP: nextID } });
			}else{
				var FinalData = {};
				var stats = this.stats;
				for( var key in stats ){
					if( !FinalData.hasOwnProperty(key) ){
						FinalData[key] = { value : stats[key], habilities : this.CATEGORIES[key].items };
					}
				}
				this.$emit('created', FinalData);
			}
		},
		prevStep : function(){
			if( this.CURRENT_STEP > 0 ){
				this.$router.go(-1);
			}
		}
	},
	computed : {
		step : function(){
			return this.STEPS[this.CURRENT_STEP];
		},
		invalidPoints : function(){
			return this.CATEGORIES[this.step].pointsToAdd < 0;
		},
		validPoints : function(){
			return this.CATEGORIES[this.step].pointsToAdd > 0;
		},
		canMoveForwards : function(){
			return this.CATEGORIES[ this.step ].pointsToAdd === 0 && this.CURRENT_STEP < this.STEPS.length;
		},
		canMoveBackwards : function(){
			return this.CURRENT_STEP > 0;
		},
		stats : function(){
			return this.CATEGORIES.GENERAL.items.reduce(function(prev,curr){
				if( !prev.hasOwnProperty( curr.name ) ){
					prev[ curr.name.toUpperCase() ] = curr.value;
				}
				return prev;
			}, {});
		}
	},
	data : function(){
		return {
			// name : '',
			CATEGORIES : {
				GENERAL : {
					pointsToAdd: 1,
					items : [
						{ name: "Fisico", value : 3, desc : "Fuerza, estado de forma, resistencia, salud en general" },
						{ name: "Agilidad", value : 3, desc: "Flexibilidad, velocidad, reflejos, coordinacion ojo-mano, destreza"},
						{ name: "Inteligencia", value : 3, desc: "Mente racional y conocimientos" },
						{ name: "Espiritu", value : 3, desc: "Cualidades mentales no racionales, sensibilidad, intuicion, voluntad"}
					]
				},
				FISICO : {
					pointsToAdd: 0,
					items : [
						{ name: "Pelea desarmado", value : 0, desc: "Lucha cuerpo a cuerpo sin armas" },
						{ name: "Pelea con armas", value : 0, desc: "Lucha cuerpo a cuerpo con armas u objetos contundentes como extintores, sillas" },
						{ name: "Resistencia", value : 0, desc: "A fatiga, venenos, enfermedades" }
					]
				},
				AGILIDAD : {
					pointsToAdd: 0,
					items: [
						{ name : "Conducir", value : 0, desc: "Llevar vehiculos a motor, mecanica basica y maniobrar en situaciones de riesgo" },
						{ name : "Punteria", value : 0, desc: "Para disparos o lanzamientos en general" },
						{ name : "Sigilo", value : 0, desc: "Moverse sin ser detectado" }
					]
				},
				INTELIGENCIA : {
					pointsToAdd: 0,
					items: [
						{ name : "Manitas", value : 0, desc: "Engloba de manera general los conocimeintos de mecanica, electricidad, carpinteria" },
						{ name : "Arramplar", value : 0, desc : "Habla de lo avispado que es el personaje cada vez que pasa por un lugar para equiparse y coger cosas que puedan resultar utiles." },
						{ name : "Ocultar/Encontrar", value : 0, desc : "Quien sabe encontar un buen lugar para esconder algo, sabe donde buscar lo que otro haya querido esconder, es la misma habilidad para ambos usos, y tambien para esconderse uno mismo." },
						{ name : "Primeros Auxilios", value : 0, desc: "Atencion medica basica e inmediata con el objetivo de estabilizar a un herido." }
					]
				},
				ESPIRITU : {
					pointsToAdd: 0,
					items: [
						{ name : "Intimidar", value : 0, desc: "Con palabras o amenazas fisicas busca lograr que alguien haga lo que el jugador le ordena. No sirve contra otros PJs" },
						{ name : "Atencion", value : 0, desc : "Cuan alerta esta el personaje de su entorno"},
						{ name : "Convencer", value : 0, desc : "El resultado es similar al de intimadr, pero esta vez se utilizan explicaciones racionales" },
						{ name : "Orientacion", value : 0, desc : "Capacidad del personaje de suponer una direccion adecuada en funcion de sus recuerdos de por donde ha pasado, las posciones relativas del sol o de los edificios." }
					]
				}
			},
			STEPS : ["GENERAL", "FISICO", "AGILIDAD", "INTELIGENCIA", "ESPIRITU"]
		}
	}
}
</script>
