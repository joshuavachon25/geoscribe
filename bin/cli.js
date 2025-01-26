#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");

// src/utils/image-processor.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_sharp = __toESM(require("sharp"));
var processImages = async (inputDir, outputDir) => {
  const files = import_fs.default.readdirSync(inputDir);
  for (const file of files) {
    const inputPath = import_path.default.join(inputDir, file);
    const outputPath = import_path.default.join(outputDir, file);
    await (0, import_sharp.default)(inputPath).grayscale().threshold(128).toFile(outputPath);
    console.log(`Processed: ${file}`);
  }
};

// src/commands/process-images.ts
var import_opencv_js = __toESM(require("@techstark/opencv-js"));
var processImagesCommand = (inputDir, outputDir) => {
  console.log(`Processing images from ${inputDir} and saving to ${outputDir}...`);
  processImages(inputDir, outputDir).then(() => console.log("Image processing complete!")).catch((err) => console.error("Error during image processing:", err));
};

// src/utils/ocr-service.ts
var import_fs2 = __toESM(require("fs"));
var import_tesseract = require("tesseract.js");
var performOCR = async (imageDir, outputFile) => {
  const files = import_fs2.default.readdirSync(imageDir);
  const worker = await (0, import_tesseract.createWorker)("fra");
  try {
    let results = "";
    for (const file of files) {
      console.log(`Processing file: ${file}`);
      const { data: { text } } = await worker.recognize(`${imageDir}/${file}`);
      results += `File: ${file}
${text}

`;
    }
    import_fs2.default.writeFileSync(outputFile, results);
    console.log(`OCR results saved to ${outputFile}`);
  } catch (error) {
    console.error("Error during OCR:", error);
  } finally {
    await worker.terminate();
  }
};

// src/commands/ocr.ts
var ocrCommand = async (imageDir, outputFile) => {
  console.log(`Extracting text from images in ${imageDir}...`);
  await performOCR(imageDir, outputFile);
};

// src/utils/data-cleaner.ts
var import_fs3 = __toESM(require("fs"));
var cleanData = (inputFile, dictionaryFile, outputFile) => {
  const text = import_fs3.default.readFileSync(inputFile, "utf8");
  const dictionary = JSON.parse(import_fs3.default.readFileSync(dictionaryFile, "utf8"));
  const cleanedText = text.split("\n").map((line) => {
    return line.split(" ").map((word) => dictionary[word.toLowerCase()] || word).join(" ");
  }).join("\n");
  import_fs3.default.writeFileSync(outputFile, cleanedText);
  console.log(`Cleaned data saved to ${outputFile}`);
};

// src/commands/clean-data.ts
var cleanDataCommand = (inputFile, dictionaryFile, outputFile) => {
  console.log(`Cleaning data in ${inputFile} using dictionary ${dictionaryFile}...`);
  cleanData(inputFile, dictionaryFile, outputFile);
};

// src/utils/geolocator.ts
var import_fs4 = __toESM(require("fs"));
var import_axios = __toESM(require("axios"));
var GEOCODE_API_URL = "https://api.opencagedata.com/geocode/v1/json";
var API_KEY = "YOUR_API_KEY";
var geolocateAddresses = async (inputFile, outputFile) => {
  const data = import_fs4.default.readFileSync(inputFile, "utf8");
  const addresses = data.split("\n").filter((line) => line.trim() !== "");
  const results = [];
  for (const address of addresses) {
    console.log(`Geolocating: ${address}`);
    try {
      const response = await import_axios.default.get(GEOCODE_API_URL, {
        params: {
          q: address,
          key: API_KEY,
          limit: 1
        }
      });
      const { lat, lng } = response.data.results[0].geometry;
      results.push({ address, lat, lng });
    } catch (error) {
      console.error(`Failed to geolocate ${address}:`, error.message);
    }
  }
  import_fs4.default.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`Geolocation results saved to ${outputFile}`);
};

// src/commands/geolocate.ts
var geolocateCommand = async (inputFile, outputFile) => {
  console.log(`Geolocating addresses in ${inputFile}...`);
  await geolocateAddresses(inputFile, outputFile);
};

// src/commands/cut.ts
var import_path2 = __toESM(require("path"));
var import_node_child_process = require("child_process");
var processWithExecutable = (imagePath, outputDir) => {
  const scriptPath = import_path2.default.resolve(__dirname, "../scripts/cut_images.exe");
  (0, import_node_child_process.execFile)(scriptPath, [imagePath, outputDir], (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing standalone script:", error);
      return;
    }
    console.log("Script output:", stdout);
    if (stderr) console.error("Script errors:", stderr);
  });
};

// src/index.ts
var program = new import_commander.Command();
program.name("GeoScribe").description("A CLI tool for processing archival images, extracting text, cleaning data, and geolocating addresses.").version("1.0.0");
program.command("image").description("Improve image quality and prepare them for OCR.").argument("<inputDir>", "Directory containing the images").argument("<outputDir>", "Directory to save processed images").action(processImagesCommand);
program.command("ocr").description("Extract text from images using OCR.").argument("<imageDir>", "Directory containing the images").argument("<outputFile>", "File to save extracted text").action(ocrCommand);
program.command("clean").description("Clean and correct extracted text data using a dictionary.").argument("<inputFile>", "File containing extracted text").argument("<dictionaryFile>", "File containing the dictionary").argument("<outputFile>", "File to save cleaned data").action(cleanDataCommand);
program.command("cut <imagePath> <outputDir>").description("Detect document structure and split into sub-images").action(async (imagePath, outputDir) => {
  try {
    await processWithExecutable(imagePath, outputDir);
    console.log("Processing complete!");
  } catch (error) {
    console.error("Error:", error);
  }
});
program.command("locator").description("Geolocate addresses found in the text data.").argument("<inputFile>", "File containing cleaned data with addresses").argument("<outputFile>", "File to save geolocated data").action(geolocateCommand);
program.parse(process.argv);
//# sourceMappingURL=cli.js.map