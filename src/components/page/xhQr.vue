<template>
    <div class="box">
        <!-- 激活推广码（add） -->
        <el-button type="primary" size="normal" style="margin-bottom:10px;" @click="activeInfo">点这里激活推广码</el-button>
        <!-- 推广码信息列表 -->
        <el-table :data="QrList" border style="width: 100%">
            <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="300"> </el-table-column>
            <el-table-column prop="alipay_no" label="支付宝账号" width="300"> </el-table-column>
            <el-table-column prop="company" label="单位" width="150"> </el-table-column>
            <el-table-column prop="address" label="单位地址" width="150"> </el-table-column>
            <el-table-column prop="type" label="市场部标识" width="150"> </el-table-column>
            <el-table-column prop="num" label="已推广订单数量" width="150"> </el-table-column>
            <el-table-column prop="status" label="状态" width="150"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="text" size="normal" @click="editInfo(scope.$index)">编辑</el-button>
                    <el-button type="text" size="normal" @click="lock(scope.$index)">锁定</el-button>
                    <el-button type="text" size="normal" @click="reset(scope.$index)">重置</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Table -->
        <el-dialog title="推广码信息" :visible.sync="show">
            <el-form :model="QrMessage" size="medium" :rules="rules" ref="QrMessage">
                <el-form-item label="推广码" v-if="button_type == 'active'" prop="id">
                    <el-input v-model="QrMessage.id" autocomplete="off" maxlength="5"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="QrMessage.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="QrMessage.phone" autocomplete="off" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号" prop="alipay_no">
                    <el-input v-model="QrMessage.alipay_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="QrMessage.company" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位地址">
                    <el-input v-model="QrMessage.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="市场部标识" prop="type" v-if="button_type == 'active'">
                    <el-input v-model="QrMessage.type" autocomplete="off" :disabled="button_type == 'edit' ? true : false"></el-input>
                </el-form-item>
                <!-- <el-form-item label="已推广订单数量" v-if="button_type == 'active'">
                    <el-input v-model="QrMessage.num" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态" v-if="button_type == 'active'">
                    <el-input v-model="QrMessage.status" autocomplete="off" :disabled="true"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="edit('QrMessage')" v-show="button_type == 'edit'">修改</el-button>
                <el-button type="primary" @click="active('QrMessage')" v-show="button_type == 'active'">激活</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    // 定义属性
    data() {
        return {
            // 列表数据
            QrList: [],
            // 要编辑的单条数据
            QrMessage: {},
            show: false,
            baseurl: 'https://www.xiaohulaile.com/xh/p/alipay/Extend',
            button_type: '',
            // 表单验证规则
            rules: {
                id: [{ required: true, message: '请输入推广码', trigger: 'blur' }],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
                alipay_no: [{ required: true, message: '请输入支付宝账号', trigger: 'blur' }],
                type: [{ required: true, message: '请输入市场部标识', trigger: 'blur' }]
            }
        };
    },
    // 计算属性，会监听依赖属性值随之变化
    computed: {},
    // 监控data中的数据变化
    watch: {},

    // 方法集合
    methods: {
        // 获取推广码列表
        async getQrList() {
            try {
                const res = await this.$axios({
                    method: 'get',
                    url: this.baseurl + '/list'
                });
                console.log('推广码列表', res);
                if (res) {
                    this.QrList = res.data;
                }
            } catch (error) {}
        },
        // 弹出编辑页面，查询单条数据
        async editInfo(index) {
            // 切换增加编辑按钮
            this.button_type = 'edit';
            try {
                // 获取到要查询的单条数据id
                const current_id = this.QrList[index].id;
                console.log(current_id);
                const res = await this.$axios({
                    method: 'post',
                    url: this.baseurl + '/index',
                    data: {
                        id: current_id
                    }
                });

                if (res) {
                    console.log('推广码详情信息', res);
                    this.QrMessage = res.data[0];
                    // 打开弹出框
                    this.show = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 修改推广码的信息
        async edit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    try {
                        this.$axios({
                            method: 'post',
                            url: this.baseurl + '/put',
                            data: {
                                ...this.QrMessage
                            }
                        }).then(res => {
                            console.log('修改推广码信息', res);
                            if (res.data.code == 200) {
                                this.show = false;
                                this.$message({
                                    type: 'success',
                                    message: `修改成功`
                                });

                                //重新获取列表
                                this.getQrList();
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 锁定推广码
        lock(index) {
            // 获取到要查询的单条数据id
            const current_id = this.QrList[index].id;
            console.log(current_id);
            this.$alert('确认锁定？', '提示', {
                confirmButtonText: '确定',
                callback: async action => {
                    console.log(action);
                    // this.$axios({});
                    if (action == 'confirm') {
                        console.log('点击确定');
                        const res = await this.$axios({
                            method: 'post',
                            url: this.baseurl + '/cancel',
                            data: {
                                id: current_id
                            }
                        });
                        console.log(res);
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: `锁定成功`
                            });
                            //重新查询
                            this.getQrList();
                        }
                        return;
                    }
                }
            });
        },
        //重置推广码
        reset(index) {
            // 获取到要查询的单条数据id
            const current_id = this.QrList[index].id;
            console.log(current_id);
            this.$alert('确认重置？', '提示', {
                confirmButtonText: '确定',
                callback: async action => {
                    console.log(action);
                    // this.$axios({});
                    if (action == 'confirm') {
                        console.log('点击确定');
                        const res = await this.$axios({
                            method: 'post',
                            url: this.baseurl + '/del',
                            data: {
                                id: current_id
                            }
                        });
                        console.log(res);
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: `重置成功`
                            });
                            //重新查询
                            this.getQrList();
                        }
                        return;
                    }
                }
            });
        },
        //激活推广码(add)
        activeInfo() {
            // 按钮类型转换为active
            this.button_type = 'active';
            // 清空表单数据
            this.QrMessage = {};
            this.show = true;
        },
        //发送激活请求
        async active(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    try {
                        let data = {
                            id: this.QrMessage.id,
                            name: this.QrMessage.name,
                            phone: this.QrMessage.phone,
                            alipay_no: this.QrMessage.alipay_no,
                            company: this.QrMessage.company,
                            address: this.QrMessage.address,
                            type: this.QrMessage.type
                        };
                        console.log(data);
                        this.$axios({
                            method: 'post',
                            url: this.baseurl + '/add',
                            data
                        }).then(res => {
                            console.log('添加推广码:', res);
                            if (res.data.code == 200) {
                                this.show = false;
                                this.$message({
                                    type: 'success',
                                    message: `激活成功`
                                });
                                //重新获取列表
                                this.getQrList();
                                return;
                            }

                            if (res.data.msg == '该推广码已激活') {
                                this.$message({
                                    type: 'info',
                                    message: `该推广码已激活`
                                });
                                return;
                            }
                        });
                    } catch (error) {}
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getQrList();
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>

<style scoped>
.container {
}

.qritem {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    /* background: #ccc; */
}
</style>
