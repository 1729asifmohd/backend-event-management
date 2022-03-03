
export function date_util(dt:string):String{
    const newDate=new Date(dt).toISOString();
    return newDate;
}


// module.exports=date_util;