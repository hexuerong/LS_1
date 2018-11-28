<template>
    <div>
        嘿嘿
        <p class="text-line">菜菜菜菜菜</p>
        <input type="text" @keydown.enter="submitArray" />
        <p>{{ arr }}</p>
        <button @click="quickSort">快速排序</button>
        <button @click="insertSort(arr)">插入排序</button>
        <button @click="shellSort(arr)">希尔排序</button>
        <button @click="heapSort(arr)">堆排序</button>
        <button @click="heapSort1(arr)">假堆排序</button>
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
        },

        heapSort1 (arr) {//假堆排序。(这种方式一趟大顶堆调整后，出现的并不是符合要求的大顶堆，只有根节点符合)
            //16,7,3,20,17,8
            for(let len = arr.length;len > 1;len --){
                //这是一趟
                for(let k = Math.floor(len / 2) - 1; k >= 0; k --){//从第一个非叶子节点开始，小于此下标的全是非叶子节点
                    //k是当前非叶子节点的下标(第一个k节点的左节点肯定存在，右节点不一定存在)
                    if( 2*k+2 < len ){//如果有右节点
                        let t = arr[2*k+1] > arr[2*k+2] ? 2*k+1 : 2*k+2;//先找到左右子节点中的最大值
                        if(arr[t] > arr[k]){
                            //交换位置,把最大的放到当前非叶子节点
                            let tmp = arr[t];
                            arr[t] = arr[k];
                            arr[k] = tmp;
                        }
                    }else{
                        if(arr[2*k+1] > arr[k]){
                            //交换位置,把最大的放到当前非叶子节点
                            let tmp = arr[2*k+1];
                            arr[2*k+1] = arr[k];
                            arr[k] = tmp;
                        }
                    }
                }
                console.log('结束一趟大顶堆调整：',arr);
                //已经找到最大的了，交换头尾
                let tmp = arr[0];
                arr[0] = arr[len-1];
                arr[len-1] = tmp;
            }
        },

        heapSort(arr){//堆排序。（这才是真正的）
            const adjustHeap = function(arr,i,length){//调整大顶堆（仅是调整过程，建立在大顶堆已构建的基础上）
                let temp = arr[i];//先取出当前元素i
                for(let k=i*2+1;k<length;k=k*2+1){//从i结点的左子结点开始，也就是2i+1处开始
                    if(k+1<length && arr[k]<arr[k+1]){//如果左子结点小于右子结点，k指向右子结点
                        k++;
                    }
                    if(arr[k] >temp){//如果子节点大于父节点，将子节点与父节点交换
                        arr[i] = arr[k];
                        arr[k] = temp;
                        i = k;
                    }else{//子节点都小于父节点，构造结束
                        break;
                    }
                }
            };

            //1.构建大顶堆
            for(let i=Math.floor(arr.length/2)-1;i>=0;i--){
                //从第一个非叶子结点从下至上，从右至左调整结构
                adjustHeap(arr,i,arr.length);
            }
            console.log('构造初始大顶堆：',arr);
            //2.调整堆结构+交换堆顶元素与末尾元素
            for(let j=arr.length-1;j>0;j--){
                //将堆顶元素与末尾元素进行交换
                let val = arr[0];
                arr[0] = arr[j];
                arr[j] = val;
                adjustHeap(arr,0,j);//重新对堆进行调整，大顶堆构造好后的调整是从上至下，从左至右
                console.log('调整后的大顶堆：',arr);
            }
        },
    }
}
</script>

<style lang="less">
@import './../static/style.less';
</style>
