// element 按需引入
import Vue from 'vue'

import {
  Aside,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Container,
  Dropdown,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Submenu,
  DropdownItem,
  DropdownMenu,
  Tag,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Backtop,
  Icon,
  Dialog,
  DatePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(DatePicker)

Vue.prototype.$message = Message
