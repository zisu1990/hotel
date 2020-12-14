<template>
    <el-container>
        <el-main>
            <!-- <el-row style="margin-bottom: 20px">
                <el-col :span="6">
                    <el-input v-model="payType" clearable @change="handleInput" placeholder="请输入房间类型"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row> -->

            <el-row type="flex" justify="start">
                <el-button @click="addPayTypeHandle" type="primary">新增</el-button>
            </el-row>

            <el-table :data="payLists" style="width: 100%" border>
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="name" label="支付方式" align="center"></el-table-column>
                <el-table-column prop="create_time" label="操作时间" align="center"></el-table-column>
                <el-table-column prop="username" label="操作人" align="center"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="showDialogEdit(scope)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog :title="dialogTittle" :visible.sync="dialogVisible" @closed="cleranFormPayType" width="28%">
                <el-row type="flex" justify="center">
                    <el-col :span="18">
                        <el-form :rules="rules" :model="formPayType" ref="formPayType" label-width="100px">
                            <el-form-item prop="name" label="支付方式：">
                                <el-input clearable v-model="formPayType.name" placeholder="请输入支付方式"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleRoom">确 定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
    import {
        paymethodLists,
        paymethodDel,
        paymethodAdd,
        paymethodEdit
    } from '@/api/BookPayType.js'
    export default {
        data() {
            return {
                payType: "",
                payLists: [],
                dialogVisible: false,
                formPayType: {
                    name: "",
                    id: ""
                },
                rules: {
                    name: [{
                        required: true,
                        message: "请输入支付方式",
                        trigger: "blur"
                    }]
                },
                dialogTittle: "新增支付方式",
            };
        },
        created() {
            this.getRows()
        },
        methods: {
            getRows() {
                paymethodLists().then(res => {
                    res = typeof res == "string" ? JSON.parse(res) : res;
                    console.log(res)
                    if (res.code == 0) {
                        this.payLists = res.data
                    } else {
                        this.message("error", res.message)
                    }
                })
            },
            // 新增编辑
            handleRoom() {
                let formPayType = this.formPayType
                this.$refs.formPayType.validate(valite => {
                    if (valite) {
                        if (this.formPayType.id) {
                            paymethodEdit({
                                name: formPayType.name,
                                id: formPayType.id
                            }).then(res => {
                                res = typeof res == "string" ? JSON.parse(res) : res;
                                if (res.code == 0) {
                                    this.dialogVisible = false
                                    this.message("success", res.message)
                                    this.getRows()
                                } else {
                                    this.message("error", res.message)
                                }
                            })
                        } else {
                            paymethodAdd({
                                name: this.formPayType.name
                            }).then(res => {
                                res = typeof res == "string" ? JSON.parse(res) : res;
                                if (res.code == 0) {
                                    this.dialogVisible = false
                                    this.getRows()
                                    this.message('success', res.message)
                                } else {
                                    this.message("error", res.message)
                                }
                            })
                        }

                    } else {
                        return false
                    }
                })
            },
            // dialog关闭时
            cleranFormPayType() {
                this.formPayType = {
                    name: "",
                    id: ""
                }
            },
            // // input事件查询
            // handleInput() {
            //     if (!this.payType) {
            //         this.getRows()
            //     }
            // },
            // btn查询
            // handleSearch(){

            // },
            // 编辑
            showDialogEdit(v) {
                this.dialogVisible = true
                this.dialogTittle = "编辑支付方式"
                this.formPayType.name = v.row.name
                this.formPayType.id = v.row.id
                console.log(v.row.name, v.row.id)
            },
            // 新增
            addPayTypeHandle() {
                this.dialogVisible = true
                this.dialogTittle = "新增支付方式"
            },
            /** 删除按钮操作 */
            handleDelete(id) {
                this.confirm()
                    .then(() => {
                        paymethodDel({
                            id
                        }).then(res => {
                            res = typeof res == "string" ? JSON.parse(res) : res;
                            console.log(res)
                            if (res.code == 0) {
                                this.getRows()
                                this.message("success", res.message)
                            } else {
                                this.message("error", res.message)
                            }
                        })
                    })
                    .catch(() => {});
            }
        }
    };
</script>

<style lang="less" scope>
    .el-row {
        margin-bottom: 20px;
    }

    .el-table {
        margin-top: 20px;
    }
</style>