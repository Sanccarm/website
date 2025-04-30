module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/resume");
    eleventyConfig.addPassthroughCopy("css/style.css");
    eleventyConfig.addPassthroughCopy("blog");
    return {
        dir: {
            input: "src",
            output: "_site",
        }
    };
};

