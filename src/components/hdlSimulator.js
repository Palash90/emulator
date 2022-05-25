import { parse } from '../parser/parser';
import defaultFiles from './defaultFiles';

export default function runSimulation(currFileId, files, callback) {
    var result;
    if (files && files.length > 0) {
        var file = files.find((el) => el.key === currFileId);
        if (!file || !file.content || file.content === '') {
            result = {
                error: true,
                errorMessage: 'Nothing to run. Please select a valid file and/or write some code.'
            }

        } else {
            result = {
                error: false,
                result: parse(file.name, file.content, defaultFiles)
            }
        }
    } else {
        result = {
            error: true,
            errorMessage: 'Nothing to run. Please select a valid file and/or write some code.'
        };
    }

    if (callback) {
        callback(result)
    } else {
        console.log("No callback specified for simulator. Simulation result", result);
    }
}