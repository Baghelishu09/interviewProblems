// =========                 JS INTERVIEW PROGRAM           ========== 

//           Reverse a String 

let str = "Reverse Me";
console.log(str.split('').reverse().join(''));

//          Check for palindrome;

let strA = "ABCAB";
let cleanStr = strA.toLowerCase();
let isPalindrome = cleanStr === cleanStr.split('').reverse().join('');
console.log(isPalindrome);

//         Find factorial

let num =10;
let fact = 1;
for(let i=2; i<=num; i++){
    fact *= i;
}
console.log(fact);


//         Fibonaaci Series

let arr=[];
arr[0]=0;
arr[1]=1;
let size = 6;
for(let i=2;i<size;i++){
    arr[i]=arr[i-1]+arr[i-2];
}
console.log(arr);

//      Find Max and Min in Array

let arr = [1,3,2,4,6,8,2,2,3];

function Max(arr){
    let max = arr[0];
    for(let values in arr){
        if(arr[values]>max){
            max=arr[values];
        }
    }
    return max;
}

function Min(arr){
    let min=arr[0];
    for(let values in arr){
        if(arr[values]<min){
            min=arr[values];
        }
    }
    return min;
}

console.log(`Minimum is : ${Min(arr)}
Maximum is ${Max(arr)}`);

//         Remove Deplicates from Array

let arr = [1,2,4,1,5,3,7,3];

for(let i=0; i<arr.length;i++){
    for(let j=i+1; j<arr.length;j++){
        if(arr[i]===arr[j]){
            arr.splice(j,1);
        }
    }
}

// console.log(arr);

//          Count Occurence of each number

