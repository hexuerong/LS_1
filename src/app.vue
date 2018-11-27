<template>
    <div>
        嘿嘿
        <p class="text-line">菜菜菜菜菜</p>
        <input type="text" @keydown.enter="submitArray" />
        <p>{{ arr }}</p>
        <button @click="quickSort">快速排序</button>
        <button @click="insertSort(arr)">插入排序</button>
        <button @click="shellSort(arr)">希尔排序</button>
    </div>
</template>

<script>
export default {
    name: 'index-app',
    data () {
        return {
            arr: [6,2,7,3,8,9],
        };
    },
    created () {
        console.log('app vue 创建成功');
    },
    methods: {
        submitArray (e) {
            let value = e.target.value;
            this.arr = [];
            let a = value.split(',');
            a.forEach(element => {
                this.arr.push( Number(element) );
            });
        },

        quickSort () {//快速排序
            const AQuick = function (arr,i,j) {
                if(i >= j){//如果左边索引大于或者等于右边的索引就代表已经整理完成一个组了
                    console.log('一组循环结束');
                    return;
                }
                let left = i,right = j,key = arr[left];
                while(left < right){
                    while(left < right && arr[right] > key){
                        right --;
                    }
                    arr[left] = arr[right];
                    arr[right] = key;
                    while(left < right && arr[left] < key){
                        left ++;
                    }
                    arr[right] = arr[left];
                    arr[left] = key;
                }
                // arr[left] = key;
                console.log('一趟循环结束',arr);
                AQuick(arr,i,left-1);
                AQuick(arr,left+1,j);
            };
            AQuick(this.arr,0,this.arr.length - 1);
        },

        shellSort (arr) {//希尔排序
            //49, 38, 65, 97, 76, 13, 27, 49, 55, 4
            //gap是增量序列（向下取整），用 "/" 算出来是整数。
            for(let gap = Math.floor(arr.length / 2);gap >= 1;gap = Math.floor(gap / 2)){//要进行多少趟<即增量序列的长度>
                console.log('gap:',gap);
                //接下来从第gap个元素进行直接插入排序
                for(let i = gap;i < arr.length;i ++){
                    let j = i;
                    while(j-gap >= 0 && arr[j] < arr[j-gap]){
                        //交换位置
                        let tmp = arr[j];
                        arr[j] = arr[j-gap];
                        arr[j-gap] = tmp;

                        j -= gap;
                    }
                }
                console.log('一趟排序结束',arr);
            }
        },

        insertSort (arr) {//直接插入排序
            for(let i = 1;i < arr.length;i ++){//从下标为1的数开始
                let j = i - 1,tmp = arr[i];
                while(tmp < arr[j] && j >= 0){
                    arr[j+1] = arr[j];
                    j --;
                }
                arr[j+1] = tmp;
            }
            console.log('插入排序结果：',arr);
        }
    }
}
</script>

<style lang="less">
@import './../static/style.less';
</style>
