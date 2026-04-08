export class MaxHeap {
    
    constructor(compareFn) {
        this.compareFn = compareFn;
        // initialize your array
        this.data = [];
    }

    _compare(i,j){
        return this.compareFn(this.data[i], this.data[j]);
    }

    size() {
        // return length
        return this.data.length;
    }

    _parentIndex(i) {
        // formula
        return Math.floor((i-1)/2);
        
    }

    _leftChildIndex(i) {
        // formula
        return 2*i+1;
    }

    _rightChildIndex(i) {
        // formula
        return 2*i+2;
    }

    insert(value){
        // push to end, then bubble up
        this.data.push(value);
        this._bubbleUp();
    }

    _bubbleUp(){
        // start at last index
        // while current is bigger than parent, swap them
        let index = this.data.length-1;
        while(index > 0) {
            let parentIndex = this._parentIndex(index);
            if (this._compare(index, parentIndex) <= 0) break;
            [this.data[index], this.data[parentIndex]] = [this.data[parentIndex], this.data[index]];


            index = parentIndex;
        }


    }

    extractMax() {
        // handle empty and single element cases
        if(this.data.length === 0) return null;
        if(this.data.length === 1) return this.data.pop();

        // save the max (index 0)
        let max = this.data[0];
        // move last element to root
        this.data[0] = this.data.pop();
        // bubble down
        this._bubbleDown();
        // return the max
        return max;
    }

    _bubbleDown() {
        let index = 0;
        
        while (this._leftChildIndex(index) < this.data.length) {
            let left = this._leftChildIndex(index);
            let right = this._rightChildIndex(index);
            let largest = left;

            // if right child exists AND is bigger than left, use right
            if(right < this.data.length && this._compare(right, left) > 0){
                largest = right;
            }
            // if current is already bigger than largest child, stop
            if (this._compare(index, largest) >= 0) break;
            [this.data[index], this.data[largest]] = [this.data[largest], this.data[index]];
            index = largest;
            // otherwise swap and continue
        }
    }
}