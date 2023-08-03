class Storage {
    static set(name, value){
        try{
            localStorage.setItem(name, value)
        }catch(err){
            console.log(err)
        }
    }

    static get(value){
        try{
            return localStorage.getItem(value)
        }catch(err){
            console.log(err)
        } 
    }

    static remove(name){
        try{
           return localStorage.removeItem(name);
        }catch(err){ 
            console.log(err)
        }
    }
}

export default Storage;