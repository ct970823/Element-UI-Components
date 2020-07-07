# Element-UI-Components

#### 介绍
element-ui封装的组件

#### Uploader(带替换的上传组件)

```javascript
	<Uploader
		:reqUrl="baseUrl"
		:imgLimit="imgLimit"
		:defaultData="defaultData"
		:beforeUpload="beforeUpload"
		:imageRemove="imageRemove"
		:uploadSucc="uploadSucc"
		:warnTxt="warnTxt"/>
		
	methods:{
		//上传前，原上传组件方法
		beforeUpload(file){
			console.log(file)
		},
		//图片移除，index，参数file更改为移除的数组下标
		imageRemove(index){
			console.log(index)
		},
		//上传成功，index,res，参数file更改为上传成功/替换成功图片在列表中的下标
		uploadSucc(index,res){
			this.uploadList[index] = res.data
			//之前的写法应更改为，如：this.goods.goods_pics[index] = res.picUrl;
			console.log(index,res)
		},
	}
```
#### paging(分页组件)

1. 全局引入
```jaavascript
main.js
import paging from "@/components/paging/index";
Vue.use(paging);
```
2. 局部引入
```javascript
import paging from "@/components/paging/index";
```
3. 使用
```javascript
	<paging
			:total="total"
			:pageNum="pageSize"
			:currentPage="pageIndex"
			@listenSize="listenSize"
			@listenPage="listenPage"
	/>
	methods:{
		//修改页面数量
		listenSize(val) {
			this.pageSize = val
			this.getData()
		},
		//修改当前页
		listenPage(val) {
			this.pageIndex = val
			this.getData()
		}
	}
```

