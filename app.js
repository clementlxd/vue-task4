//import bar from './bar'; 
import Vue from "vue"
import AV from 'leancloud-storage'

var APP_ID = 'DpSeImnNgSEpOH4fskuCN81M-gzGzoHsz';
var APP_KEY = '9VI6aw7iqnDgt1Ba6PL4sQ4f';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});



var app=new Vue({
	el:"#app",
	data:{
		actionType:"signUp",
		newTodo:"",
		todoList:[],
		formData:{
			username:'',
			password:''
		},
		currentUser:null

	},
	created:function(){
		window.onbeforeunload=()=>{
			let dataString=JSON.stringify(this.todoList)
			window.localStorage.setItem("myTodos",dataString)
		}

		let oldDataString=window.localStorage.getItem("myTodos")
		let oldData=JSON.parse(oldDataString)
		this.todoList=oldData ||[]

	},
	methods:{
		addTodo:function(){
			this.todoList.push({
				title:this.newTodo,
				createdAt:new Date(),
				done:false
			})
			this.newTodo=""//输入结束后为空
		},
		removeTodo:function(todo){
			let index=this.todoList.indexOf(todo)
			this.todoList.splice(index,1)
		},
		signUp:function(){
			let user=new AV.User()

			user.setUsername(this.formData.username)
			user.setPassword(this.formData.password)
			user.signUp().then((loginedUser)=>{
				this.currentUser=this.getCurrentUser()
				console.log(loginedUser)
			},(error)=>{
				alert("注册失败")

			} )
		},
		login: function(){
			AV.User.logIn(this.formData.username,this.formData.password).then((longinedUser)=>{
				this.currentUser=this.getCurrentUser()
				console.log(loginedUser)
			},function(error){
				alert("登录失败")

			})
		},
		getCurrentUser:function(){
			//let {id, createdAt,attributes:{username}}=AV.User.current()
			//return {id, username,createdAt}
			let current=AV.User.current()
			if(current){
				let {id, createdAt,attributes:{username}}=current
				return {id,username,createdAt}
			}else{
				return null
			}
		},
		logout: function(){
			AV.User.logOut()
			this.currentUser=null
			window.location.reload()
		}
	}
})