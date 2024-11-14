const fs = require('fs');
const path = require('path');
const imagesFolder = './img';


function imageToJson(imagesFolder) {
    const imageFiles = fs.readdirSync(imagesFolder);

    const imageData = imageFiles.map(file => {
        const filePath = path.join(imagesFolder, file);
        const extname = path.extname(filePath);

        if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
            return {
                filename: file,
                filepath: filePath
            };
        }
    }).filter(Boolean); // Remove nullish values

    const jsonData = JSON.stringify(imageData, null, 2);
    console.log(jsonData);

    // To write to a file:
    fs.writeFileSync('image_metadata.json', jsonData);
}

imageToJson(imagesFolder);