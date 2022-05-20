export default function runSimulation(currFileId, files){
    var file = files.find((el) => el.key === currFileId);
    console.log(file.content);
}