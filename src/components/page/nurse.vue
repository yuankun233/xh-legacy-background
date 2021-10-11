<template>
    <div>
        <div v-for="(item, index) in orderList" :key="index" class="container aa">
            <div>
                <div>客户名字:{{ item.archive_text }}</div>
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
                <div>已服务次数：{{ item.order_num }}</div>
                <div>下单时间：{{ item.create_time }}</div>
                <div>备注：{{ item.content }}</div>
                <div>订单来源：{{ orderOrigin(item.long_status) }}</div>
            </div>
            <el-button @click="PaiFn(item.id, item.archive_text)" type="danger">派单</el-button>
        </div>
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="tr" :page-size="5"> </el-pagination>
        <!-- 选护士 -->
        <div v-show="isShow" class="container cc">
            <el-button @click="isShowNull()" type="warning gb">关闭</el-button>
            <div>派单老人===>{{ name }}</div>
            <!-- <div>{{ attend_id }}</div> -->
            <div v-for="(item, index) in nurseList" :key="index" @click="zp_1(item.id)" class="container bb">
                <div>名字:{{ item.name }}</div>
                <div>手机号:{{ item.phone }}</div>
            </div>
        </div>
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
            tr: ''
        };
    },
    created() {
        var _this = this;
        _this
            .$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/get_list',
                data: {}
            })
            .then(function(res) {
                console.log(res.data.data, '订单列表');
                _this.orderList = res.data.data.datalist;
                console.log(_this.orderList, 'time');
                _this.tr = res.data.data.page.tr;
            })
            .catch(function(error) {
                console.log(error);
            });
        //护士
        _this
            .$axios({
                method: 'post',
                url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/attend',
                data: {}
            })
            .then(function(res) {
                console.log(res.data.data, '护士列表');
                _this.nurseList = res.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {
        isShowNull() {
            var _this = this;
            _this.isShow = false;
        },
        PaiFn(id, name) {
            console.log('youdian');
            console.log(id, '订单id');
            var _this = this;
            _this.isShow = true;
            _this.name = name;
            _this.id = id;
        },
        zp_1(arr) {
            var _this = this;
            console.log(arr, '11');
            _this.attend_id = arr;
            _this
                .$axios({
                    method: 'post',
                    url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/attendadd',
                    data: {
                        id: _this.id,
                        attend_id: arr
                    }
                })
                .then(function(res) {
                    console.log(res.data.code, '绑定护士');
                    if (res.data.code == 0) {
                        _this.$message.success('绑定成功');
                        location.reload();
                        _this.isShow = false;
                    } else {
                        _this.$message.success('已绑定,护士');
                        _this.isShow = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var _this = this;
            _this
                .$axios({
                    method: 'post',
                    url: 'https://www.xiaohulaile.com/xh/p/wadmin/admin/get_list',
                    data: {
                        page_no: val
                    }
                })
                .then(function(res) {
                    console.log(res.data.data, '订单列表');
                    _this.orderList = res.data.data.datalist;
                    _this.tr = res.data.data.page.tr;
                })
                .catch(function(error) {
                    console.log(error, '错误');
                });
        },
        // 订单来源筛选
        orderOrigin(val) {
            console.log('订单来源', val);
            let text;
            switch (val) {
                case 0:
                    text = '微信小程序';
                    break;
                case 1:
                    text = '站长下单';
                    break;
                case 2:
                    text = '支付宝小程序';
                    break;
                case 3:
                    text = '阿里健康';
                    break;
                default:
            }
            return text
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
</style>
