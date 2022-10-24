<template>
  <el-card class="card">
    <!-- form -->
    <div class="form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            class="input"
            placeholder="请输入搜索姓名"
            @keyup.enter.native="searchRoles"
            v-model.trim="queryInfo.query"
            clearable
            @clear="getRoles"
          ></el-input>
          <!-- 查 -->
          <el-button
            icon="el-icon-search"
            type="warning"
            @click="searchRoles"
          ></el-button>
        </el-col>
        <el-col :span="12" class="add">
          <!-- 增 -->
          <el-button
            type="success"
            icon="el-icon-plus"
            class="add-button"
            @click="openDialog"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </div>
    <!-- table -->
    <el-table stripe border style="width: 100%" :data="data" class="table">
      <el-table-column
        v-for="item in label"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
      ></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <template v-slot="scoped">
          <!-- 改 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="editRole(scoped.row)"
          ></el-button>
          <!-- 删 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="deleteRole(scoped.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 30, 80, 100, 200]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>
    <!-- dialog -->
    <diaLog
      :dialogVisible="dialogVisible"
      :title="title"
      @closeDialog="closeDialog"
      @submitForm="submitForm"
      v-if="dialogVisible"
      ref="dialog"
    />
  </el-card>
</template>

<script>
import { getRoles, deleteRole, editRole, addRole } from '@/api/roles'
import diaLog from './components/dialog.vue'
export default {
  name: 'users-view',
  components: {
    diaLog
  },
  data() {
    return {
      data: [],
      label: [
        {
          prop: 'name',
          label: '姓名',
          width: 100
        },
        {
          prop: 'address',
          label: '家庭地址'
        },
        {
          prop: 'ip',
          label: 'IP地址'
        },
        {
          prop: 'date',
          label: '注册时间'
        }
      ],
      // 查所需参数
      queryInfo: {
        query: '',
        // 当前页
        pagenum: 1,
        // 一页总数
        pagesize: 10
      },
      // 总数
      total: 200,
      // dialog visible
      dialogVisible: false,
      // title
      title: '新增角色'
    }
  },
  methods: {
    async getRoles() {
      const res = await getRoles(this.queryInfo)
      this.data = res.roles
    },
    // newPagesize
    handleSizeChange(newPagesize) {
      // console.log(newPagesize)
      this.queryInfo.pagesize = newPagesize
      this.getRoles()
    },
    // newPagenum
    handleCurrentChange(newPagenum) {
      // console.log(newPagenum)
      this.queryInfo.pagenum = newPagenum
      this.getRoles()
    },
    // search
    searchRoles() {
      // 判空
      if (!this.queryInfo.query) {
        this.$message({
          type: 'error',
          message: '搜索内容不可为空',
          center: true
        })
      } else {
        this.getRoles()
      }
    },
    // delete
    async deleteRole(id) {
      // console.log(id)
      await deleteRole(id)
      // getRoles
      this.getRoles()
    },
    // edit
    editRole(row) {
      this.title = '编辑角色'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dialog.handleRow(row)
      })
    },
    // openDialog
    openDialog() {
      this.title = '新增角色'
      this.dialogVisible = true
    },
    // closeDialog
    closeDialog() {
      this.dialogVisible = false
    },
    // submitForm
    async submitForm(form) {
      // console.log(form)
      this.dialogVisible = false
      // addRole
      if (!form.id) {
        await addRole(form)
      } else {
        await editRole(form)
      }
      // getRoles
      this.getRoles()
    }
  },
  created() {
    this.getRoles(this.queryInfo)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: end;
  padding-top: 20px;
}
.input {
  width: 75%;
  margin-right: 20px;
}
.table {
  margin-top: 20px;
}
.card {
  box-sizing: border-box;
  margin: 15px;
}
.add {
  display: flex;
  justify-content: flex-end;
  &-button {
    margin-right: 65px;
  }
}
</style>
