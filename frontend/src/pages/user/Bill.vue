<template>
    <div class="flex flex-col gap-y-10"  >
        <div v-for="(item, index) in bills" :key="index" >
            <div class="flex flex-col gap-y-1">
                <div class="flex gap-x-5 items-center">
                    <span class="separate">
                        Trạng thái: 
                        <span :class="item.status === 0 ? 'text-yellow-500' : 'text-green-500'" v-bind:class="item.status === 3 ? 'text-red-500' :''" >{{ status(item.status) }}</span>
                    </span>
                   
                    <div v-if="item.status === 2" class="separate">
                        <button class=" hover:underline hover:text-primary">Đánh giá</button>
                    </div>
                    <div v-else class="separate">
                        <span>Hình thức thanh toán:
                            <span>{{ item.paymentMethod }}</span>
                        </span>
                    </div>
                    <div>
                        Tổng tiền: <span class="font-semibold underline">{{ item.totalPrice.toLocaleString()}} đ</span>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="flex flex-col gap-y-3 flex-1">
                        <div v-for="(pro, index) in item.order" :key="index" class="flex-1 flex items-center gap-x-5 justify-between">
                            <div>
                                <img class="w-[60px] h-[60px]" :src="pro.image" alt="">
                            </div>
                            <div class="flex flex-1 gap-x-5">
                                <span>{{ pro.name }}</span>
                                <div class="flex gap-x-3">
                                    Phân loại: 
                                    <span>{{pro.color}} - {{pro.size}}</span>
                                </div>
                                <span>
                                    Gía:
                                    <span>{{ pro.price.toLocaleString() }}</span>
                                </span>
                                <span>
                                    so luong 
                                    <span>{{ pro.quantity }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.status === 0 || item.status === 1">
                            <button @click="handleCancelBill(item.status)" class="btn btn border hover:border-primary ">Huy don hang</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import request from '../../utils/request';


const bills = ref([])

    const status = computed(()=>(type)=>{
        let statusResult = ''
        switch (type) {
            case 0:
                statusResult = 'Đơn hàng đang chờ duyệt'
                break;
            case 1:
                statusResult = 'Đơn hàng đang vận chuyển'
                break;
            case 2:
                statusResult = 'Đơn hàng đã được giao thành công'
                break;
            case 3:
                statusResult = 'Đơn hàng đã được hủy'
                break;
            default:
                statusResult = 'Có lỗi xảy ra'
                break;
        }
        return statusResult
    })
    const getBills = async ()=>{
        const res = await request.get("bill/get_personal_bill")
        bills.value = res.data.data
    }
    getBills()

    const handleCancelBill = (status)=>{
        if(status === 0) {
            alert("đã hủy ( tượng trưng - chưa làm :V)")
        }else {
            alert("vui lòng liên hệ người bán để trao đổi")
        }
    }
</script>
<style>
.separate{
    position: relative;
}
    .separate::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        right: -10px;
        background: #fff;
        opacity: 0.5;
    }
</style>