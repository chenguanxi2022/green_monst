<template>
  <el-dialog :visible="dialogVisible"
             :title="title"
             @close="handleClose">
    <el-form label-width="70px"
             :rules="rules"
             :model="form"
             ref="form">
      <!-- name -->
      <el-form-item label="姓名"
                    prop="name">
        <el-input placeholder="输入姓名"
                  v-model="form.name"></el-input>
      </el-form-item>
      <!-- address -->
      <el-form-item label="地址"
                    prop="address">
        <el-input placeholder="输入地址"
                  v-model="form.address"></el-input>
      </el-form-item>
      <!-- ip -->
      <el-form-item label="IP地址"
                    prop="ip">
        <el-input placeholder="输入IP地址"
                  v-model="form.ip"></el-input>
      </el-form-item>
      <!-- date -->
      <el-form-item label="日期"
                    prop="date">
        <el-date-picker type="date"
                        placeholder="选择日期"
                        v-model="form.date">
        </el-date-picker>
      </el-form-item>
      <!-- button -->
      <div class="button">
        <el-button type="primary"
                   @click="handleSubmit">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'dialog-component',
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        ip: [{ required: true, message: 'IP地址不能为空', trigger: 'blur' }],
        date: [{ required: true, message: '日期不能为空', trigger: 'blur' }]
      },
      form: {
        name: '',
        address: '',
        ip: '',
        date: ''
      }
    }
  },
  props: {
    // dislog show
    dialogVisible: {
      type: Boolean,
      required: true
    },
    // title
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    // close
    handleClose() {
      this.$emit('closeDialog')
    },
    // submit
    handleSubmit() {
      // 统一校验
      this.$refs.form.validate((valid) => {
        // 验证成功
        if (valid) {
          this.$emit('submitForm', this.form)
        } else {
          return false
        }
      })
    },
    handleRow(row) {
      this.form = row
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: end;
}
</style>