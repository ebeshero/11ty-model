/* ebb: This is YET ANOTHER new version of the JS that's designed to read subdirectories in the img folder for images filed by topic.
When run, this JS outputs a single nested JSON file that may be easier to work with in Nunjucks. */
const fs = require('fs');
const path = require('path');
const imagesFolder = './img';
const outputFolder = './_data'
const outputFile = './_data/imagesMeta.json'

function getImageFiles(imagesFolder) {
    return fs.readdirSync(imagesFolder, { recursive: true });
}

function processImageData(imageData) {
    const topicData = {}; // Initialize an object to store topic-wise data

    imageData.forEach(file => {
        if (file.startsWith('.')) {
            return; // Skip dot files
        }
        const filePath = path.join(imagesFolder, file);
        const extname = path.extname(filePath);
        const topic = filePath.split("/")[1];

        if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
            if (!topicData[topic]) {
                topicData[topic] = []; // Initialize an array for the topic if it doesn't exist
            }
            topicData[topic].push({
                filename: file.split("/")[1].split(".")[0],
                filepath: filePath,
            });
        }
    });

    // Write the JSON file with topics and nested image data
    const jsonData = JSON.stringify(topicData, null, 2);
    fs.writeFileSync(outputFile, jsonData);
}

const imageFiles = getImageFiles(imagesFolder);
processImageData(imageFiles);
