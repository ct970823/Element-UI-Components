<template>
    <div id="uploader_box">
        <div class="uploader_item" v-for="(item,index) in tempImgs" :key="index">
            <img :src="item" class="avatar" />
            <label class="uploader_item_status">
                <i class="el-icon-upload-success el-icon-check"></i>
            </label>
            <div class="uploader_icon">
        <span class="uploader_icon_item">
          <el-upload
                  class="reupload_icon"
                  :headers="headers"
                  :action="reqUrl"
                  :show-file-list="false"
                  :on-success="reUploadSucc"
                  :before-upload="reBefoUpload"
          >
          <i slot="trigger" @click="getIndex(index)" class="el-icon-upload2"></i>
          </el-upload>
        </span>
                <span class="uploader_icon_item" style="margin-left:10px;" @click="previewImage(index)">
          <i class="el-icon-zoom-in"></i>
        </span>
                <span class="uploader_icon_item" style="margin-left:10px;" @click="deleteImage(index)">
          <i class="el-icon-delete"></i>
        </span>
            </div>
        </div>
        <el-upload
                v-if="tempImgs.length<imgLimit"
                class="avatar-uploader"
                :action="reqUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
        >
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="upload_box">
            <el-tooltip style="margin-left:20px;" effect="dark" :content="warnTxt" placement="top">
                <i class="el-icon-question"></i>
            </el-tooltip>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            reqUrl: String,
            imgLimit:Number,
            warnTxt: String,
            defaultData:Array,
            beforeUpload: Function,
            imageRemove: Function,
            uploadSucc:Function,
            headers:Object
        },
        data() {
            return {
                dialogVisible: false,
                dialogImageUrl: "",
                index:0,
                tempImgs: []
            };
        },
        watch:{
            defaultData(val){
                this.tempImgs = val;
            }
        },
        methods: {
            //上传图片之前
            beforeAvatarUpload(file) {
                this.beforeUpload(file);
            },
            //上传图片成功
            handleAvatarSuccess(res, file) {
                console.log(res,file)
                    this.tempImgs.push(URL.createObjectURL(file.raw));
                    this.uploadSucc(this.tempImgs.length-1,res);
            },
            //预览图片
            previewImage(index) {
                this.dialogImageUrl = this.tempImgs[index];
                this.dialogVisible = true;
            },
            //删除图片
            deleteImage(index) {
                this.tempImgs.splice(index, 1);
                this.imageRemove(index);
            },
            //获取重新上传序号
            getIndex(index){
                this.index = index;
            },
            //重新上传前
            reBefoUpload(file) {
                this.beforeUpload(file);
            },
            //重新上传成功
            reUploadSucc(res,file) {
                //替换本地
                this.tempImgs.splice(this.index,1,URL.createObjectURL(file.raw));
                this.uploadSucc(this.index,res);
            }
        },
        mounted(){
            if(this.defaultData.length>0){
                this.tempImgs = this.defaultData;
            }
        }
    };
</script>
<style>
    #uploader_box {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
    }
    .uploader_item {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        margin: 0 8px 8px 0;
        display: inline-block;
        position: relative;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .reupload_icon {
        width: 20px;
        height: 22px;
    }
    .reupload_icon .el-upload {
        width: 20px;
        height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .reupload_icon .el-upload__input {
        width: 20px;
        height: 22px;
    }
    .uploader_item_status {
        display: block;
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
        color: #fff;
        line-height: inherit;
    }
    .uploader_item_status .el-icon-check {
        font-size: 12px;
        padding: 0px 0px 10px 12px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    .avatar-uploader {
        width: 148px;
        height: 148px;
        display: inline-block;
        margin: 0 0 8px 0;
        box-sizing: border-box;
    }
    .avatar-uploader .el-upload {
        width: 148px;
        height: 148px;
        box-sizing: border-box;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }
    .avatar {
        width: 148px;
        height: 148px;
        display: block;
        object-fit: cover;
    }
    .upload_box {
        height: 148px;
        display: flex;
        align-items: flex-end;
    }
    .uploader_icon {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .uploader_icon:hover {
        opacity: 1;
    }
    .uploader_icon::after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
    }
    .uploader_icon_item {
        width: 20px;
        height: 22px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
    }
</style>