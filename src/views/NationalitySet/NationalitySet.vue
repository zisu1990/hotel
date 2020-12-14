<template>
    <el-container>
        <el-main>
            <el-row style="margin-bottom: 20px">
                <el-col :span="6">
                    <el-input v-model="nationalityName" clearable @change="handleInput" placeholder="请输入国籍名称">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>

            <el-row type="flex" justify="start">
                <el-button @click="handleClientType" type="primary">新增</el-button>
            </el-row>

            <el-table stripe :data="tableClienType" style="width: 100%" border>
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="name" label="国籍名称" align="center"></el-table-column>
                <el-table-column prop="create_time" label="操作时间" align="center"></el-table-column>
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
                        <el-form :rules="rules" :model="formClienType" ref="formClienType" label-width="100px">
                            <el-form-item prop="name" label="国籍名称：">
                                <el-input clearable v-model="formClienType.name" placeholder="请输入国籍名称"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleRoom">确 定</el-button>
                </span>
            </el-dialog>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </el-main>
    </el-container>
</template>
<script>
    import {
        nationalityIndex,
        nationalityEdit,
        nationalityAdd,
        nationalityDel,
    } from '@/api/NationalitySet.js'
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogTittle: "新增国籍名称",
                tableClienType: [],
                formClienType: {
                    name: ""
                },
                rules: {
                    name: [{
                        required: true,
                        message: "请输入国籍名称",
                        trigger: 'blur'
                    }]
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                nationalityName: ""
            }
        },
        created() {
            this.getRows()
        },
        methods: {
            getRows() {
                let params = {
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                };
                nationalityIndex(params).then(res => {
                    res = typeof res == "string" ? JSON.parse(res) : res;
                    console.log(res)
                    if (res.code == 0) {
                        this.tableClienType = res.data.list
                        this.pagination.total = res.data.count
                    } else {
                        this.message("error", res.message)
                    }
                })
            },
            // 添加或者编辑
            handleRoom() {
                let formClienType = this.formClienType
                this.$refs.formClienType.validate(valite => {
                    if (valite) {
                        if (formClienType.id) {
                            nationalityEdit({
                                name: formClienType.name,
                                id: formClienType.id
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
                            nationalityAdd({
                                name: formClienType.name
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
            // 编辑btn
            showDialogEdit(v) {
                this.dialogVisible = true
                this.dialogTittle = "编辑国籍名称"
                this.formClienType.name = v.row.name
                this.formClienType.id = v.row.id
            },
            // 新增btn
            handleClientType() {
                this.dialogTittle = "新增国籍名称"
                this.dialogVisible = true
            },
            // dialog关闭时
            cleranFormPayType() {
                this.formClienType = {
                    name: "",
                    id: ""
                }
            },
            // 查询
            handleSearch() {
                let params = {
                    page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                    name: this.nationalityName
                };
                nationalityIndex(params).then(res => {
                    res = typeof res == "string" ? JSON.parse(res) : res;
                    console.log(res)
                    if (res.code == 0) {
                        this.tableClienType = res.data.list
                        this.pagination.total = res.data.count
                    } else {
                        this.message("error", res.message)
                    }
                })
            },
            // inputchange事件
            handleInput() {
                if (!this.nationalityName) {
                    this.getRows()
                }
            },
            /** 删除按钮操作 */
            handleDelete(id) {
                this.confirm()
                    .then(() => {
                        nationalityDel({
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
            },
            // 分页器
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                // console.log(`每页 ${val} 条`);
                this.getRows();
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                // console.log(`当前页: ${val}`);
                this.getRows();
            },
        }
    }
</script>
<style scoped>
    .el-pagination {
        margin-top: 30px;
        float: right;
    }
</style>