module.exports = function (eleventyConfig){
    eleventyConfig.addPassthroughCopy("_src/_includes/");
    eleventyConfig.addPassthroughCopy("./_src/css/");

    return{
        dir: {
            input: "_src",
            output: "_site"
        },
    };
};