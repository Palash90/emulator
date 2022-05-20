export default function runSimulation(currFileId, files, callback) {
    var result;
    if(files && files.length>0){
        var file = files.find((el) => el.key === currFileId);
        console.log(file.content)
        if(!file.content || file.content===''){
            result = {
                error:true,
                errorMessage: 'Nothing to run. Please select a valid file and/or write some code.'
            }

        } else {
            result ={
                error:false
            }
        }
    } else {
        result = {
            error:true,
            errorMessage: 'Nothing to run. Please select a valid file and/or write some code.'
        };
    }

    console.log(result)
    if(callback){
        callback(result)
    } else {
        console.log("No callback specified for simulator. Simulation result", result);
    }
}