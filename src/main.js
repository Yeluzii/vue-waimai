import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入你需要的组件
// import { Button } from 'vant';
import { Button, Icon } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

import { Toast } from 'vant';
import { ContactCard } from 'vant';
import { Card } from 'vant';
import { Dialog } from 'vant';
import { AddressList } from 'vant';
import { AddressEdit } from 'vant';
import { Form, Field, CellGroup } from 'vant';

import {Tab,Tabs} from 'vant'
import {TreeSelect} from 'vant'
import { Stepper} from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import store from './store'

import 'vant/es/toast/style'

import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';

import './assets/css/common.less'
import 'amfe-flexible'

import router from './router/index'

const app = createApp(App)

app.use(Toast);
app.use(ContactCard);
app.use(Card);
app.use(Dialog);
app.use(AddressList);
app.use(AddressEdit);
app.use(Form);
app.use(Field);
app.use(CellGroup);

app.use(Tab)
app.use(Tabs)
app.use(TreeSelect)
// app.use(router).use(Button)
app.use(router).use(Button).use(Icon)
app.use(store)
app.component('van-stepper',Stepper)
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);

app.use(Checkbox);
app.use(CheckboxGroup);
app.use(SubmitBar);

app.mount('#app')
