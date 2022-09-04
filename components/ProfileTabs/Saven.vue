<template>
    <div>
        <v-data-table :items="items" :headers="headers">
            <template #[`item.delete`]="{item}">
                <v-btn class="button1" :loading="loading" flat depressed @click.prevent="deleteLevel(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data () { 
        return {
            loading:false,
            items:[
            ]
        }/* /return */
    },/* /data */
    computed:{
        headers(){
            return[
                {text:"المرحلة",value:"level"},{text:"الحذف",value:"delete",year : "سنة المرحلة",idStudentLevel:"idStudentLevel"}
        ]/* /return */
        }/* /header */
    },/* /computed */
    mounted() {
       this.getLevels()
    },/* /mounted */
    methods:{
        getLevels(){
            console.log("this.studentId : ",this.$route.params.id)
            this.$axios.get(`getLevels?studentId=${this.$route.params.id}`).then(response=>{
                console.log("response : ",response)
                if(response.data.length>0){
                    response.data.forEach(item=>{
                        this.items.push({
                            level:item.level,delete:"",idStudentLevel:item.idStudentLevel
                        });
                    })
                }/* end of if */
            }).catch(err=>{
                console.log(err)
            })
        },/* /getLevels */
        deleteLevel(item){
            this.loading=true
            this.$axios.delete(`studentLevel/${item.idStudentLevel}`).then(response=>{
                this.loading=false;
                this.$toast.success('تم تحديث الطالب بنجاح', {
              duration: 3000,
              position: 'top-center',
            })/* /tost */
            this.items=this.items.filter(itm=>{
                if(itm.idStudentLevel !==item.idStudentLevel)
                return itm
                return null
            })
            }).catch(err=>{
                console.log(err)
            })
        }/* /item */
    }/* /methods */
}
</script>

<style lang="scss" scoped>
.button1 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center
}
</style>