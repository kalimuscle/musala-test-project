export const normal = "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
export const invalid = "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
export const disabledButton = "w-full bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
export const normalButton = "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
export const checkValidation = ( value, type) =>{

    if( type == "text" && value.length < 8){
        return <p class="mt-2 text-sm text-red-600" id="email-error">Minimum length charactes is 8.</p> 
    }

    if( type == "ip" && (value.length < 7 || 
    !(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)))
    ){
        return <p class="mt-2 text-sm text-red-600" id="email-error">You have entered an invalid IP address!.</p> 
    }

}

export const isValidIpv4 = ( value) =>{
    if(value.length >=7 && value.length <= 15 &&  
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)){
        return true
    }
    return false;

}