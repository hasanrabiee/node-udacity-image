# Image Resizing API

This is an Express-based API for resizing JPG images using [Sharp](https://sharp.pixelplumbing.com/). The API allows users to resize images to specific dimensions and caches the resized images for faster subsequent requests.

## Features

- Resize JPG images by specifying `filename`, `width`, and `height`.
- Caches resized images to reduce server load on repeated requests.
- Provides appropriate error messages for missing parameters, invalid inputs, or missing image files.

## Requirements

- Node.js (v14+)
- npm (v6+)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hasanrabiee/node-udacity-image.git
   cd image-resizing-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the necessary directories for storing images:

   ```bash
   mkdir -p images/processed
   ```

4. Place your original JPG images in the `images/` directory.

## Usage

1. Start the server:

   ```bash
   npm run dev
   ```

2. Resize an image by making a GET request to `/api/resize` with the following query parameters:

   - `filename`: The name of the JPG file (without the extension) in the `images/` folder.
   - `width`: The desired width of the resized image.
   - `height`: The desired height of the resized image.

   Example request:

   ```
   GET http://localhost:3000/api/resize?filename=image1&width=300&height=200
   ```

   The resized image will be saved in the `images/processed/` directory, and the cached version will be returned for subsequent requests.

## Error Handling

The API will return appropriate error messages in the following cases:

- **Missing parameters**: If `filename`, `width`, or `height` is missing.
- **Invalid width/height**: If the width or height is not a positive number.
- **Image not found**: If the specified image file does not exist in the `images/` folder.
- **Processing failure**: If there is an error during the image resizing process.

## Example Error Responses

- Missing parameters:

  ```json
  {
    "error": "Missing required parameters (filename, width, height)"
  }
  ```

- Invalid width or height:

  ```json
  {
    "error": "Invalid width or height"
  }
  ```

- Image not found:
  ```json
  {
    "error": "Image not found"
  }
  ```

## Testing

To run tests using Jasmine:

1. Run the tests:
   ```bash
   npm test
   ```

## License

This project is licensed under the MIT License.
