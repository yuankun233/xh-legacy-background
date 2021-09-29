<template>
    <div>
        <el-button type="success" plain @click="getStatus(0)" class="btn">待服务</el-button>
        <el-button type="success" plain @click="getStatus(1)" class="btn">服务中</el-button>
        <el-button type="success" plain @click="getStatus(2)" class="btn">待评价</el-button>
        <div class="search">
            <div class="bt">请搜索姓名</div>
            <el-input class="inp" placeholder="请输入内容" v-model="text" clearable> </el-input>
            <!-- <button @click="getorder">搜索</button> -->
            <el-button type="success" plain @click="getorder" class="btn">搜索</el-button>
        </div>
        <div v-for="(item, index) in orderList" :key="index" class="container aa">
            <div>
                <div>客服名字:{{ item.archive_text }}</div>
                <div>手机号:{{ item.archive_phone }}</div>
                <div>服务项目:{{ item.body }}</div>
                <div>服务时间:{{ item.start_text }}-----{{ item.time_slot_status }}</div>
                <div>服务地址：{{ item.region }}{{ item.address }}</div>
                <div v-if="item.minute == 1">类别:次数</div>
                <div v-if="item.minute == 2">类别:服务包</div>
                <div>
                    服务次数:{{ item.num }}
                    <!-- 服务价格:{{ item.total_fee }} -->
                </div>
                <div>订单状态：{{ item.status_text }}</div>
                <div>已服务次数：{{ item.order_num }}</div>
            </div>
        </div>
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="tr" :page-size="5"> </el-pagination>
        <!-- 选护士 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            nurseList: '',
            orderList: '',
            name: '',
            //护士id
            attend_id: '',
            id: '',
            // 分页
            tr: '',
            //订单状态
            status: '',
            //搜索信息
            text: ''
        };
    },
    created() {
        console.log(this.text, 'sousuo');
        var _this = this;
        _this
            .$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/list',
                data: {}
            })
            .then(function(res) {
                console.log(res.data.data, '订单列表');
                _this.orderList = res.data.data.datalist;
                _this.tr = res.data.data.page.tr;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {
        //搜索订单
        getorder() {
            var that = this;
            that.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/seach_order',
                data: {
                    name: this.text
                }
            })
                .then(function(res) {
                    console.log(res, '123');
                    that.orderList = res.data.data.datalist;
                    that.tr = res.data.data.page.tr;
                })
                .catch(function(error) {
                    console.log(error, '错误');
                });
        },
        //订单状态
        getStatus(num) {
            console.log(num);
            if (num === 0) {
                this.status = 0;
            }
            if (num === 1) {
                this.status = 1;
            }
            if (num === 2) {
                this.status = 2;
            }
            let that = this;
            that.$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/list',
                data: {
                    order_status: this.status
                }
            })
                .then(function(res) {
                    that.orderList = res.data.data.datalist;
                    that.tr = res.data.data.page.tr;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        PaiFn(id, name) {
            console.log('youdian');
            console.log(id, '订单id');
            var _this = this;
            _this.isShow = true;
            _this.name = name;
            _this.id = id;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var _this = this;
            _this
                .$axios({
                    method: 'post',
                    url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/list',
                    data: {
                        page_no: val,
                        order_status: _this.status
                    }
                })
                .then(function(res) {
                    _this.orderList = res.data.data.datalist;
                    _this.tr = res.data.data.page.tr;
                })
                .catch(function(error) {
                    console.log(error, '错误');
                });
        }
    }
};
</script>

<style scoped>
.aa {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.cc {
    position: fixed;
    left: 38%;
    top: 25%;
    width: 300px;
    overflow-y: auto;
    height: 500px;
}
.bb {
    overflow: auto;
}
.gb {
    position: absolute;
    top: 0;
    right: 0;
}
.search {
    margin: 10px 0px 10px 0px;
}
.bt {
    font-size: 16px Medium;
}
.inp {
    margin-top: 10px;
}
.btn {
    margin-top: 10px;
}
</style>
