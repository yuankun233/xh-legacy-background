<template>
    <div class="container">
        <div class="container aa" v-for="item in orderList" :key="item.id">
            <div>
                <div>用户姓名:{{ item.appointInfo.userName }}</div>
                <div>用户地址:{{ item.appointInfo.district }}{{ item.appointInfo.address }}</div>
                <div>用户联系方式:{{ item.appointInfo.userMobile }}</div>
                <div v-for="(item,index) in item.serviceInfo.serverList" :key="index">项目:{{ item.serverName }}</div>
            </div>
            <el-button @click="PdFn(item.id, item.orderId)" type="success">派单</el-button>
        </div>
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :page-size="5"> </el-pagination>
        <div v-show="isShow" class="container bb">
            <el-button @click="isShowNull()" type="warning gb">关闭</el-button>
            <div v-for="(item, index) in nurseList" :key="index" @click="bloodFn(item.id, item.name, item.phone)" class="container aa_1">
                <div>名字:{{ item.name }}</div>
                <div>手机号:{{ item.phone }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Qs from 'qs';
export default {
    data() {
        return {
            orderList: [],
            nurseList: [],
            isShow: false,
            // 订单id
            orderId: '',
            orderIdjy: '',
            total: ''
        };
    },
    methods: {
        PdFn(id, orderId) {
            var _this = this;
            _this.isShow = true;
            console.log(id);
            _this.orderId = id;
            _this.orderIdjy = orderId;
        },
        isShowNull() {
            var _this = this;
            _this.isShow = false;
            _this.orderId = '';
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var _this = this;
            _this
                .$axios({
                    method: 'post',
                    url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/orderlist',
                    data: {
                        page: val,
                        status: '3001'
                    }
                })
                .then(function (res) {
                    console.log(res.data.data.data, '订单');
                    _this.orderList = res.data.data.data;
                    _this.total = res.data.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //派单护士
        bloodFn(id, name, phone) {
            console.log(id);
            console.log(name);
            console.log(phone);
            var jsonp = JSON.stringify({
                name,
                mobile: phone
            });
            var jsp = {
                name,
                mobile: phone
            };
            console.log(jsonp);
            // return;
            this.$confirm('是否派单', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$axios({
                        method: 'post',
                        url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/buteorder',
                        data: {
                            orderId: this.orderIdjy,
                            docid: id,
                            status: '3201',
                            // nurseInfo: jsp
                            nurseInfo: jsonp
                        }
                    }).then((res) => {
                        console.log(res.data, '123');
                        var data1 = res.data.data;
                        data1.orderId = this.orderIdjy;
                        data1.status = '3201';
                        data1.nurseInfo = jsonp;
                        console.log(data1, '看下数据');
                        // return;
                        if (res.data.code == 200) {
                            this.$axios({
                                method: 'post',
                                url: 'https://km2c-uat.kingmed.com.cn/km2c-api/rest/sample/syncStatus',
                                data: data1
                            }).then((res) => {
                                console.log(res.data.errno, '金域');
                                if (res.data.errno == '0') {
                                    this.$message({
                                        type: 'info',
                                        message: '派单成功'
                                    });
                                    location.reload();
                                }
                            });
                            return;
                            this.$message({
                                type: 'info',
                                message: '派单成功'
                            });
                            location.reload();
                        } else {
                            this.$message({
                                type: 'info',
                                message: '派单失败'
                            });
                            // location.reload();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        }
    },
    created() {
        var _this = this;
        //护士
        _this
            .$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/attend',
                data: {}
            })
            .then(function (res) {
                console.log(res.data.data, '护士列表');
                _this.nurseList = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        // 订单
        _this
            .$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/orderlist',
                data: {
                    status: '3001'
                }
            })
            .then(function (res) {
                console.log(res.data.data.data, '订单');
                _this.orderList = res.data.data.data;
                _this.total = res.data.data.total;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
</script>

<style scoped>
.aa {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.bb {
    position: fixed;
    left: 38%;
    top: 25%;
    width: 300px;
    overflow-y: auto;
    height: 500px;
}
.gb {
    position: absolute;
    top: 0;
    right: 0;
}
.aa_1 {
    margin-top: 10px;
}
</style>