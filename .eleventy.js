module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/resume");
    eleventyConfig.addPassthroughCopy("css/style.css");

    return {
        dir: {
            input: "src",
            output: "_site",
        }
    };
};

