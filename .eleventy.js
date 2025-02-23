const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    outputDir: './dist/img/',
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
   eleventyConfig.addPassthroughCopy("src/assets");
   eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
   eleventyConfig.addLiquidShortcode("image", imageShortcode);
   eleventyConfig.addJavaScriptFunction("image", imageShortcode);
    return {
        dir: {
           input: "src",
            output: "dist"
       }
    }
};
