<template>
    <div>
        <h1>新增护士</h1>
                <!-- 建档案 -->
        <div class="container aa">
            <div class="form-box">
                <el-form ref="form1" :model="form1" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="form1.name"  type="name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="form1.phone" type="phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form1.password"  type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form1.end_password" type="password"></el-input>
                        </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form1.sex" placeholder="请选择">
                            <el-option label="男" value="1">男</el-option>
                            <el-option label="女" value="2">女</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form1.age" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form1.address"></el-input>
                    </el-form-item>
                     <el-form-item label="职业">
                        <el-select v-model="form1.type" placeholder="请选择">
                            <el-option label="护士" value="0">护士</el-option>
                            <el-option label="医疗照护护理员" value="1">医疗照护护理员</el-option>
                            <el-option label="养老护理员" value="2">养老护理员</el-option>
                            <el-option label="康复师" value="3">康复师</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit1">新建</el-button>
                    </el-form-item>
                </el-form>
                <div v-show="flag" class="warn">第一次输入密码与第二次输入密码不符</div>
                <div v-show="flag1" class="warn">有未填项</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          form1: {
              name:'',//姓名
              phone:'',//手机号
              password:'',//密码
              end_password:'',//确认密码
              sex:'',//性别
              age:'',//年龄
              address:'',//地址
              type:'',//职业
          },
          flag:false,
          flag1:false
        };
    },
    methods: {
            //提交护士信息
            onSubmit1() {
                if(this.form1.password != this.form1.end_password){
                    this.flag = true
                    return
                }else{
                    this.flag = false
                }
                let flagIf = Object.values(this.form1).every(function(item) {
                        return item != ''
                })
                if(!flagIf){
                    this.flag1 =true
                    return
                }else{
                    this.flag1 =false
                }
                console.log(this.flag1,'判断条件');
                let _this = this
                let form1 = _this.form1
                _this.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/attend_save',
                data: {
                    ...form1
                }
            }).then(function (res) {
                alert(res.data.msg)
            })
             .catch(function (error) {
                    alert(error)
                });
                console.log(this.form1,'信息');
            }
        }
};
</script>
<style scoped>
.warn{
    color: red;
}
</style>