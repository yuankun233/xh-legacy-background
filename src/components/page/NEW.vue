<template>
    <div>
        <div class="container bb">
            <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            <el-button @click="find" type="primary mgl">搜索</el-button>
            <el-button @click="newOrder" type="danger mgl">新建档案</el-button>
        </div>
        <!-- 建档案 -->
        <div v-show="isShow" class="container aa">
            <div class="form-box">
                <el-form ref="form1" :model="form1" label-width="80px">
                    <el-form-item label="老人姓名">
                        <el-input v-model="form1.name"></el-input>
                    </el-form-item>
                    <el-form-item label="老人年龄">
                        <el-input v-model="form1.old" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="老人地址">
                        <el-input v-model="form1.address"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form1.phone" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form1.sex" placeholder="请选择">
                            <el-option label="男" value="1">男</el-option>
                            <el-option label="女" value="0">女</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit1">新建</el-button>
                        <el-button @click="hideFn">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 选择档案 -->
        <div v-show="isShow_user" class="container aa aa_1">
            <div v-for="(item, index) in list" :key="index" class="container mgt" @click="listFn(index)">
                <div>名字:{{ item.name }}</div>
                <div>手机号:{{ item.phone }}</div>
            </div>
        </div>
        <!-- 下单 -->
        <div class="container aa">
            <div class="text">下单栏: 注意都是必填项!!!!!!</div>
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="老人档案">
                        <!-- <el-input v-model="form.name"></el-input> -->
                        <div>{{ user_name }}</div>
                    </el-form-item>
                    <el-form-item label="服务项目">
                        <el-select v-model="form.order" placeholder="请选择" @click="getList()">
                            <el-option :label="item.title" :value="item.id" v-for="item in lists" :key="item.id">{{item.title}}</el-option>
                            <!-- <el-option label="静脉采血" value="13">静脉采血</el-option>
                            <el-option label="胰岛素注射指导" value="35">胰岛素注射指导</el-option>
                            <el-option label="术后伤口换药" value="16">术后伤口换药</el-option>
                            <el-option label="更换导尿管" value="32">更换导尿管</el-option> 
                            <el-option label="鼻饲管更换" value="15">鼻饲管更换</el-option>
                            <el-option label="造口护理" value="2">造口护理</el-option>
                            <el-option label="腹膜透析" value="3">腹膜透析</el-option>
                            <el-option label="picc导管护理" value="1">picc导管护理</el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单量">
                        <el-input type="number" v-model="form.num"></el-input>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                    </el-form-item>
                    <el-form-item label="时间段">
                        <el-radio-group v-model="form.date2">
                            <el-radio label="1">08:00-12:00</el-radio>
                            <el-radio label="2">13:00-18:00</el-radio>
                            <el-radio label="3">18:00-22:00</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="服务类别">
                        <el-radio-group v-model="form.minute">
                            <el-radio label="1">次</el-radio>
                            <el-radio label="2">疗程</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" rows="5" v-model="form.text"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">下单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'baseform',
    data() {
        return {
            phone: '',
            // 下单
            form: {
                order: '',
                date1: '',
                date2: '',
                text: '',
                minute: '',
                num: ''
            },
            // 建档
            form1: {
                name: '',
                sex: '',
                old: '',
                phone: '',
                address: '',
                minute: ''
            },
            isShow: false,
            isShow_user: false,
            user_id: '',
            user_name: '',
            // 老人列表
            list: '',
            lists:''
        };
    },
    methods: {
        onSubmit() {
            console.log(this.form.date1,'time');
            var _this = this;
            this.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/order',
                data: {
                    project_id: this.form.order,
                    num: this.form.num,
                    archive_id: this.user_id,
                    start_time: this.form.date1,
                    time_slot: this.form.date2,
                    content: this.form.text,
                    minute: this.form.minute
                }
            })
                .then(function (res) {
                    console.log(res, '看下提交');
                    console.log(_this.form.date1,'时间');
                    if (res.data.code == 0) {
                        console.log('走了吗');
                        _this.user_id = '';
                        _this.user_name = '';
                        _this.isShow = false;
                        _this.isShow_user = false;
                        _this.form.order = '';
                        _this.form.date1 = '';
                        _this.form.date2 = '';
                        _this.form.text = '';
                        _this.form.minute = '';
                        _this.form.num = '';
                        _this.$message.success('提交成功！');
                    }
                    // _this.list = res.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
                console.log(_this.lists)
        },
        find() {
            var _this = this;
            console.log('找老人');
            this.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/phone',
                data: {
                    phone: _this.phone
                }
            })
                .then(function (res) {
                    console.log(res);
                    _this.list = res.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            _this.isShow_user = true;
        },
        newOrder() {
            console.log('新建老人档案');
            // console.log(this);
            var _this = this;
            _this.isShow = true;
            // return;
        },
        //新建档案
        onSubmit1() {
            var _this = this;
            console.log('我防卫接口');
            this.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/Archiveadd',
                data: {
                    age: _this.form1.old,
                    sex: _this.form1.sex,
                    address: _this.form1.address,
                    phone: _this.form1.phone,
                    name: _this.form1.name
                }
            }).then(function (res) {
                console.log(res, '成功');
                _this.user_id = res.data.data.id;
                _this.user_name = res.data.data.name;
                _this.isShow = false;
            });
        },
        //选择老人
        listFn(i) {
            console.log(i);
            var _this = this;
            console.log('选择老人');
            console.log(_this.list[i].id);
            console.log(_this.list[i].name);
            _this.user_id = _this.list[i].id;
            _this.user_name = _this.list[i].name;
            _this.isShow_user = false;
        },
        hideFn() {
            var _this = this;
            _this.isShow = false;
        }
    },
     mounted() {
         var that = this
              this.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/getProject',
                data: {
                }
            })
                .then(function (res) {
                    // console.log(res);
                    that.lists = res.data.data;
                    // console.log(that.lists,'ni');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
};
</script>
<style scoped>
.aa {
    margin-top: 80px;
}
.aa_1 {
    display: block;
}
.bb {
    display: flex;
}
.mgl {
    margin-left: 30px;
}
.mgt {
    margin-top: 10px;
}
.text {
    margin-bottom: 30px;
    font-size: 50px;
    color: red;
}
</style>