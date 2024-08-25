import { createStore } from 'vuex'

export default createStore({
    state: {
        cartList: [], // 购物车的数据
        isDelete: true, // 确定header组件 点击编辑的时候 底部组件的展示
        edit: true, // 
        orderList: [],
        userAddress: [
            {
                id: 1001,
                name: 'Yeluzi001',
                tel: '1234567890X',
                province: '广东省',
                city: '深圳市',
                county: '南山区',
                addressDetail: '深圳湾',
                isDefault: true,
                areaCode: '110101',
            },
            {
                id: 1002,
                name: 'Yeluzi002',
                tel: '1234567890Y',
                province: '江苏省',
                city: '南京市',
                county: '栖霞区',
                addressDetail: '南工院西门外卖柜',
                isDefault: false,
                areaCode: '110101',
            },
        ],
        orderListEnd: [],
    },
    mutations: {
        addCart(state, value) {
            state.cartList = value
        },
        changeDelete(state) {
            state.isDelete = !state.isDelete
        },
        delete(state, value) {
            state.cartList = value
        },
        edit(state, value) {
            if (value) {
                state.edit = true
            } else {
                state.edit = !state.edit
            }
        },
        pay(state, value) {
            state.orderList = value
        },
        orderListEnd(state) {
            state.orderListEnd = state.orderListEnd.concat(state.orderList)
        },
        addAddress(state, value) {
            state.userAddress.map((item) => {
                if (value.isDefault) {
                    item.isDefault = false;
                }
            });
            state.userAddress.push(value);
        },
        editAddress(state, value) {
            state.userAddress = state.userAddress.map((item) => {
                if (value.isDefault) {
                    item.isDefault = false;
                }
                // if (item.id === value.id) {
                //     return value
                // }else{
                //     return item
                // }
                return item.id === value.id ? value : item
            });
        },
        deleteAddress(state, value) {
            state.userAddress = state.userAddress.filter((item) => {
                return !(item.id == value.id)
            })
            if (value.isDefault) {
                state.userAddress[0].isDefault = true
            }
        },
    },
    actions: {}
})