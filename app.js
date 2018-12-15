const express=require("express");
const app=express();
const bodyparser=require("body-Parser");
const Db=require("./js/db-ysp.js");
const db=new Db("yuekao");
app.use(bodyparser.urlencoded({extended:false}));
app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})

//后台接受添加数据请求
app.post("/add",function(req,res){
	var obj=req.body;
	db.insertOne("wjl",obj,function(err){
		if(err){
			res.send("添加失败")
		}else{
			res.send("添加成功")
			}
	})
	
})

//后台接受获取数据请求
app.get("/getdata",function(req,res){
	var obj={
		query:{},
		limit:10
	}
	db.find("wjl",obj,function(err,data){
		if(err){
			res.send("获取数据失败")
		}else{
			res.send(data)
		}
	})
})

//后台接受删除一条数据请求
app.post("/dels",function(req,res){
	var id=req.body.id;
	db.deleteById("wjl",id,function(err){
		if(err){
			res.send("删除失败")
		}else{
			res.send("删除成功")
		}
	})
})

//后台接受修改一条数据先查询的请求
app.post("/unp/:id",function(req,res){
	var id=req.params.id;
	console.log(id)
	db.findById("wjl",id,function(err,data){
		if(err){
			res.send("获取数据失败2")
		}else{
			res.send(data)
		}
	})
})

//后台完成修改的过程
app.post("/xiu",function(req,res){
	var obj=req.body;
	db.updateById("wjl",obj.id,obj,function(err){
		if(err){
			res.send("修改失败1")
		}else{
			res.send("已修改")
		}
	})
})


app.listen(8080,function(){
	console.log("服务已开启")
})