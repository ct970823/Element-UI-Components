<template>
  <div class="paging clearfix">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,20,50,100, 200, 300, 400]"
      :page-size="pageNum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      ref="pagination">
    </el-pagination>
  </div>
</template>
<style scoped>
  .el-pagination{
    text-align: right;
    margin-top:20px;
  }
</style>
<script>
  export default {
    props:[
      "total",
      "pageNum",
      "currentPage",
    ],
    data(){
      return{
        totalNum:100,
      }
    },
    created(){
      setTimeout(()=>{
        if(this.total == 0){
          this.totalNum = 0
        }
      },1000)
    },
    watch: {
      total(val) {
        this.totalNum = val
      },
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('listenSize',val)
      },
      handleCurrentChange(val) {
        this.$emit("listenPage",val)
      },
    },
  }
</script>
