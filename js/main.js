const app = Vue.createApp({
    data(){
        return {
            title: "Contador App - Vue",
            count: 0

        };
    },
    methods: {
        // step: es la cantidad a incrementar o decrementar
        modify( prefix = "add", step ){
            prefix === "add" ? this.count += step : this.count -= step;
        }
    }
})