/* ebb: This is a new version of the JS that's designed to read subdirectories in the img folder for images filed by topic.
When run, this JS outputs nested folders to the _data directory, containing a simple .json file for each subdirectories. */
const fs = require('fs');
const path = require('path');
const imagesFolder = './img';
const outputFolder = './_data'

function getImageFiles(imagesFolder) {
    return fs.readdirSync(imagesFolder, { recursive: true });
}

function processImageData(imageData) {
    const topicData = {}; // Initialize an object to store topic-wise data
    const allTopics = []; // Initialize an object to store all topics


    imageData.forEach(file => {
        if (file.startsWith('.')) {
            return; // Skip dot files
        }
        const filePath = path.join(imagesFolder, file);
        const extname = path.extname(filePath);
        const topic = filePath.split("/")[1];
        const topicFolder = path.join(outputFolder, topic);
        if (!allTopics.includes(topic)) {
            allTopics.push(topic);
        }
        /* ebb: next we make the topic subdirectories using fs */
        if (!fs.existsSync(topicFolder)) {
            fs.mkdirSync(topicFolder, { recursive: true });
        }

        if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
            if (!topicData[topic]) {
                topicData[topic] = []; // Initialize an array for the topic if it doesn't exist
            }
            topicData[topic].push({
                filename: file,
                filepath: filePath,
            });
        }
    });

    // Write JSON files for each topic
    for (const topic in topicData) {
        const topicFilePath = path.join(outputFolder, topic, `${topic}.json`);
        const jsonData = JSON.stringify(topicData[topic], null, 2);
        fs.writeFileSync(topicFilePath, jsonData);
    }
    // Write the top-level JSON file with all topics
    const allTopicsFilePath = path.join(outputFolder, 'alltopics.json');
    const allTopicsData = JSON.stringify({ topics: allTopics }, null, 2);
    fs.writeFileSync(allTopicsFilePath, allTopicsData);
}


const imageFiles = getImageFiles(imagesFolder);
processImageData(imageFiles);
