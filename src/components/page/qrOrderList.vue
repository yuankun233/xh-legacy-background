<template>
    <div>
        <!-- 根据订单号查询订单 -->
        <div>
            <!-- <div style="margin-top: 15px;margin-bottom:15px;width:30%">
                <el-input placeholder="请输入订单号" v-model="id" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="orderSearch"></el-button>
                </el-input>
            </div> -->
        </div>
        <!-- 状态切换 -->

        <div style="margin-bottom:10px">
            <el-button @click="changeOrder(0)" type="primary">已完成</el-button>
            <el-button @click="changeOrder(1)" type="primary">待审核</el-button>
            <el-button @click="changeOrder(2)" type="primary">已审核</el-button>
            <el-button @click="changeOrder(3)" type="primary">已提现</el-button>
        </div>

        <!-- 推广码信息列表 -->
        <el-table :data="orderList" border style="width: 100%">
            <el-table-column prop="tname" label="推广者名称" width="100"> </el-table-column>
            <el-table-column prop="order_id" label="订单编号" width="100"> </el-table-column>
            <el-table-column prop="archivename" label="患者名称" width="100"> </el-table-column>
            <el-table-column prop="attend_name" label="护士名称" width="100"> </el-table-column>
            <el-table-column prop="total_fee" label="订单金额" width="100"> </el-table-column>
            <el-table-column prop="commission" label="订单佣金" width="100"> </el-table-column>
            <el-table-column prop="amount" label="实际佣金支付金额" width="100"> </el-table-column>
            <el-table-column prop="create_time" label="订单创建时间" width="150"> </el-table-column>
            <el-table-column prop="end_time" label="订单完成时间" width="150"> </el-table-column>
            <el-table-column prop="pay_time" label="佣金支付时间" width="150"> </el-table-column>
            <el-table-column prop="text" label="备注" width="330"> </el-table-column>
            <el-table-column prop="status" label="订单状态" width="150"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    // 定义属性
    data() {
        return {
            id: '', //推荐订单id
            orderList: [],
            baseurl: 'https://www.xiaohulaile.com/xh/p/alipay/Exorder'
        };
    },
    // 计算属性，会监听依赖属性值随之变化
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async getOrderList() {
            try {
                const res = await this.$axios({
                    method: 'get',
                    url: this.baseurl + '/list'
                });
                console.log(res);
                if (res) {
                    this.orderList = res.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 根据不同状态切换获取订单列表
        async changeOrder(status) {
            console.log('订单状态改变', status);
            try {
                const res = await this.$axios({
                    method: 'post',
                    url: this.baseurl + '/list_stu',
                    data: {
                        status
                    }
                });
                console.log(res);
                if (res) {
                    this.orderList = res.data;
                    this.$message({
                        type: 'success',
                        message: `切换成功`
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 根据订单号搜索订单
        async orderSearch() {
            if (this.id != '') {
                try {
                    const res = await this.$axios({
                        method: 'post',
                        url: this.baseurl + '/index',
                        data: {
                            id: this.id
                        }
                    });
                    console.log(res);
                    if (res) {
                        this.orderList = [];
                        this.orderList.push(res.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getOrderList();
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>

<style lang="less"></style>
