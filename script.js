function generateSign() {
    const chineseText = document.getElementById("chineseInput").value;
    let portugueseText = document.getElementById("portugueseInput").value.toUpperCase(); // Make Portuguese text uppercase

    // Create an image object for the background
    const img = new Image();
    img.src = 'images/Macau_Street_Template.png'; // Path to your image

    img.onload = function() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      // Define margins and letter spacing values
      const marginLeft = 50;
      const marginRight = 50;
      const letterSpacingMin = 2;
      const maxWidth = canvas.width - marginLeft - marginRight;

      // Draw the road sign background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Handle Chinese Text
      let fontSize = 60;
      let letterSpacing = 50;
      ctx.font = `bold ${fontSize}px 標楷體`;
      ctx.fillStyle = '#000052';
      let textWidth = ctx.measureText(chineseText).width + (chineseText.length - 1) * letterSpacing;

      // Adjust letter spacing and font size if necessary
      while (textWidth > maxWidth && letterSpacing > letterSpacingMin) {
        letterSpacing--;
        textWidth = ctx.measureText(chineseText).width + (chineseText.length - 1) * letterSpacing;
      }
      while (textWidth > maxWidth && fontSize > 30) {
        fontSize--;
        ctx.font = `bold ${fontSize}px 標楷體`;
        textWidth = ctx.measureText(chineseText).width + (chineseText.length - 1) * letterSpacing;
      }

      // Set text properties for Chinese Text
      ctx.textAlign = 'center';
      ctx.font = `bold ${fontSize}px 標楷體`;
      ctx.fillStyle = '#000052';

      // Manually draw each Chinese character with letter spacing
      const topMiddleY = canvas.height / 4 + (fontSize * 0.7) / 2;
      let startX = (canvas.width - (ctx.measureText(chineseText).width + (chineseText.length - 1) * letterSpacing)) / 2 + ctx.measureText(chineseText).width/chineseText.length/2;

      for (let i = 0; i < chineseText.length; i++) {
          ctx.fillText(chineseText[i], startX, topMiddleY);
          startX += ctx.measureText(chineseText[i]).width + letterSpacing;
      }

      // Handle Portuguese text (Uppercase and centered, max 2 lines)
      fontSize = 40;
      ctx.font = `bold ${fontSize}px 'Gill Sans'`;
      let lines = [];
      let words = portugueseText.split(' ');
      let currentLine = words[0];

      // Break text into lines with a maximum of 2 lines
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
        if (lines.length === 2) break;
      }
      lines.push(currentLine);

      // If more than 2 lines, reduce font size
      while (lines.length > 2 && fontSize > 20) {
        fontSize--;
        ctx.font = `bold ${fontSize}px 'Gill Sans'`;
        lines = [];
        currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const width = ctx.measureText(currentLine + ' ' + word).width;
          if (width < maxWidth) {
            currentLine += ' ' + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
          if (lines.length === 2) break;
        }
        lines.push(currentLine);
      }

      let factor = 1;
      if (lines.length === 2)
          factor = -1;

      // Draw each line of Portuguese text (centered)
      ctx.textAlign = 'center';
      let y = (3 * canvas.height) / 4 + factor * (fontSize * 0.7) / 2;
      for (const line of lines) {
        ctx.fillText(line, canvas.width / 2, y);
        y += fontSize + 5;
      }

      // Show the road sign container
      document.getElementById("roadSignContainer").classList.remove("hidden");
    };

    // Handle if the image fails to load
    img.onerror = function() {
      alert('Image could not be loaded. Please check the file path.');
    };
}

  // Function to download the generated road sign as an image
function downloadImage() {
    const canvas = document.getElementById("canvas");
    const link = document.createElement('a');
    link.download = 'macau_road_sign.png'; // Set the filename for download
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // Convert the canvas content to PNG format
    link.click(); // Simulate a click to trigger the download
}

function downloadImage2() {
      const frameElement = document.getElementById('border-container');
      const canvas = document.getElementById('canvas');
      // Use html2canvas to capture the div (which includes the canvas and the frame)
      html2canvas(frameElement).then(function (canvas) {
          // Convert the canvas to a data URL
          const image = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");

          // Create a link element to download the image
          const downloadLink = document.createElement('a');
          downloadLink.href = image;
          downloadLink.download = 'framed-image.png';

          // Trigger the download
          downloadLink.click();
      });
}
