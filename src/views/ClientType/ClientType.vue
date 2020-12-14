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
                <el-button @click="handleClientType" type="primary">新增</el-button>
            </el-row>

            <el-table :data="tableClienType" style="width: 100%" border>
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="name" label="客户类型" align="center"></el-table-column>
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
                        <el-form :rules="rules" :model="formClienType" ref="formPayType" label-width="100px">
                            <el-form-item prop="name" label="支付方式：">
                                <el-input clearable v-model="formClienType.name" placeholder="请输入支付方式"></el-input>
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
        customertypeLists
    } from '@/api/ClientType.js'
    export default {
        data() {
            return {
                dialogVisible: false,
                tableClienType: [],
                formClienType: {},
                rules: {

                }
            }
        },
        created() {
            this.getRows()
        },
        methods: {
            getRows() {
                customertypeLists().then(res => {
                    res = typeof res == "string" ? JSON.parse(res) : res;
                    console.log(res)
                    if (res.code == 0) {
                        this.tableClienType = res.data
                    } else {
                        this.message("error", res.message)
                    }
                })
            },
            // 新增btn
            handleClientType() {
                this.dialogVisible = true
            },
            // dialog关闭时
            cleranFormPayType() {},
            // 编辑操作
            showDialogEdit() {

            },
        }
    }
</script>