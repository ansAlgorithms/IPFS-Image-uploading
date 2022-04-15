
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function getTime(n) {
    await sleep(5000)
    const newdate = new Date()
    console.log(n+newdate)
    return n+newdate;
}
let arr = []  // Declaring the Array 

time = async (n) => {
    
    for(let i=0;i<n;i++){
        arr[i] = getTime(i)   //  Storing Promises is array
        console.log(arr[i])   //  Print the promises
    }
    const result = async (n)=>{
            const x =  await Promise.all(arr) // converting promise Array into Value array.
            console.log(x)    // Print the values (desire results)
    };
    result(n)
}

time(5)





//console.log(getTime())
//getTime()
// pratyush.harsh@snumbers.com

// expected output = 
// [
// "a",
// "b"
// ]
// function result(n) {
//    time(n);
// }
