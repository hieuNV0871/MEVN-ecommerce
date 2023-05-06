<template>
    <div>
        <div>
            <Form action="" enctype="multipart/form-data" @submit="handleChangeInfo" :validation-schema = "schema">
                <div class="flex flex-col gap-y-2">
                    <label for="">Avatar: </label>
                    <input class="hidden" ref="avatarInputRef" type="file" name="" id="" @change="handleFileUpload">
                    <button @click.prevent="selectAvatarInputRef" class="btn btn-outline-effect">
                        <span class="px-1">Chọn ảnh</span><i></i>
                    </button>
                    <div>
                        <img
                            class="w-20 h-20 object-cover"
                            :src="avatar ? avatarBlob : 'https://th.bing.com/th/id/R.5b20997c32480a03ac0ea68a75d2965d?rik=Sg0Qvaatai0zkg&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2ff%2fZ%2fG%2f4%2fh%2fQ%2fno-image-available-hi.png&ehk=HhFXlnwLHC74XN7SsEPRdGTZQh46G09SKN8BTm9MgJw%3d&risl=&pid=ImgRaw&r=0'"
                            alt=""
                        />
                    </div>
                </div>
                <button type="submit" class="btn btn-fill-effect">submit</button>
            </Form>
        </div>
    </div>
</template>
<script setup>
    import { ref, onBeforeUnmount} from 'vue';
    import { authStore } from '../../stores/auth';
    import request from '../../utils/request';
    import { Field, Form, ErrorMessage } from "vee-validate";
    import * as yup from "yup";
    import { errorMessage } from "../../utils/validation";

    const schema = yup.object({
        // name: yup.string().required(errorMessage.require),
        
});
const auth= authStore()
    const userInfo = ref({})
    const  avatar  = ref()
    const avatarBlob = ref()
    const avatarInputRef = ref(null)

    const selectAvatarInputRef = () => {
        avatarInputRef.value.click()
    }
    const handleFileUpload = (e) => {
        avatar.value = e.target.files[0]
        avatarBlob.value = URL.createObjectURL(e.target.files[0])
        
    }
    const handleChangeInfo = async () => {
        if(avatar.value){
            const formData = new FormData()
            formData.append("folderName", 'avatar')
            formData.append("image", avatar.value)
            const res = await request.post("upload/upload_avatar", formData)
            const avatarCloudinary = res.data.data
            const value = {
                avatar: avatarCloudinary
            }
            await request.patch("user/update", value)
            await auth.getUserInfo()
        }
    }


    onBeforeUnmount(() => {
        if (avatarBlob.value) {
            URL.revokeObjectURL(avatarBlob.value)
    }
})
</script>
<style>
    
</style>