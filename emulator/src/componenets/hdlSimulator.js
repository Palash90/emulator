export default function runSimulation(currFileId, files) {
    if(files && files.length>0){
        var file = files.find((el) => el.key === currFileId);
    }
}