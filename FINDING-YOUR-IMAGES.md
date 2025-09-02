# 🖼️ How to Find Your Generated Images - A Simple Guide

## Where Are My Images?

When you ask Claude to generate images using this tool, they are automatically saved on **YOUR computer** (not in the cloud). Here's exactly how to find them:

## 📍 Quick Answer: The Images Folder

Your images are saved in a folder called **`generated-images`** inside the MCP server folder.

### On Mac:
```
/Users/[YourUsername]/generated-images/
```

### On Windows:
```
C:\Users\[YourUsername]\generated-images\
```

### On Linux:
```
/home/[YourUsername]/generated-images/
```

## 🔍 Step-by-Step: How to Find Your Images

### Method 1: Using Finder (Mac) or File Explorer (Windows)

#### On Mac:
1. Open **Finder** (the smiley face icon in your dock)
2. Click **Go** in the menu bar
3. Select **Go to Folder...**
4. Type: `~/generated-images` and press Enter
5. You'll see all your generated images!

#### On Windows:
1. Open **File Explorer** (folder icon in taskbar)
2. In the address bar, type: `%USERPROFILE%\generated-images`
3. Press Enter
4. You'll see all your generated images!

### Method 2: Ask Claude to Open the Folder

Simply tell Claude:
> "Open the generated images folder for me"

Or:
> "Show me where my images are saved"

Claude can run the command to open the folder directly!

## 📝 Understanding the File Names

Each image has a specific naming pattern to help you identify it:

### Marketing Images:
```
marketing-1756761697374.png
         └── timestamp (ensures unique names)
```

### Logo Images:
```
logo-techflow-solutions-1756761698123.png
     └── business name    └── timestamp
```

### Product Images:
```
product-glow-serum-1756761699456.png
        └── product name  └── timestamp
```

## 💡 Pro Tips for Finding Your Images

### Tip 1: Sort by Date
The **newest images** will always be at the top when you sort by "Date Modified"

### Tip 2: Search by Type
- Search for "marketing" to find all marketing images
- Search for "logo" to find all logos
- Search for "product" to find all product mockups

### Tip 3: Preview Quickly
- **Mac**: Press Spacebar to quick-preview any image
- **Windows**: Click once to see preview in the preview pane

## 🎨 What If I Want to Save Images Elsewhere?

You can change where images are saved! Here are two ways:

### Easy Way (Ask Claude):
Tell Claude:
> "I want to save images to my Desktop instead"

### Manual Way:
1. Find your Claude Desktop configuration
2. Add this line:
```json
"IMAGE_OUTPUT_DIR": "/Users/YourName/Desktop/my-images"
```

## ❓ Common Questions

### Q: "I can't find the generated-images folder"
**A:** The folder is only created after you generate your first image. Try generating an image first!

### Q: "Can I move the images after they're created?"
**A:** Yes! They're normal image files. You can copy, move, or edit them like any other photo.

### Q: "Are my images saved online?"
**A:** No! All images are saved locally on YOUR computer only. They're private and secure.

### Q: "Can I delete old images?"
**A:** Yes! You can delete any images you don't need. They're just regular files on your computer.

### Q: "What program should I use to open them?"
**A:** Any image viewer works:
- **Mac**: Preview (default), Photos
- **Windows**: Photos (default), Paint
- **Any Browser**: Chrome, Safari, Firefox, Edge

## 🚀 Quick Commands to Ask Claude

Here are helpful things you can ask Claude:

1. **"Show me my latest generated image"**
   - Claude will tell you the most recent image file

2. **"Open the generated images folder"**
   - Claude will open the folder for you

3. **"How many images have I generated?"**
   - Claude can count your images

4. **"Delete all test images"**
   - Claude can help clean up test files

## 📱 Viewing on Other Devices

Since images are saved on your computer, you can:
- **Email** them to yourself
- **Upload** to Google Drive/Dropbox/iCloud
- **AirDrop** (Mac) or **Share** (Windows) to your phone
- **Copy** to a USB drive

## 🆘 Still Need Help?

If you're still having trouble finding your images, tell Claude:
> "I can't find my generated images, can you help me locate them?"

Claude will help you step-by-step to find exactly where your images are stored!

---

Remember: Your images are always safe on your computer, in the `generated-images` folder. They're yours to keep, share, and use however you like! 🎨