# Gemini Image MCP Server

[![npm version](https://badge.fury.io/js/gemini-image-mcp.svg)](https://badge.fury.io/js/gemini-image-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

An open-source Model Context Protocol (MCP) server that provides AI-powered image generation capabilities using Google's Gemini API. Designed specifically for business applications with tools optimized for marketing, branding, and commercial use.

## 🎯 Features

### Business-Focused Image Generation Tools

- **🎨 Marketing Image Generator** - Create professional marketing visuals and hero images
- **🏷️ Business Logo Creator** - Generate logos with accurate text rendering and branding
- **📦 Product Mockup Generator** - Design realistic product mockups for e-commerce
- **📊 Visual Strategy Consultant** - Get comprehensive visual content strategies

### Key Capabilities

- ✅ **Professional Quality** - Commercial-grade images suitable for business use
- ✅ **Text Rendering** - Accurate text placement in logos and branded content
- ✅ **Business Context** - Tools understand your industry, audience, and purpose
- ✅ **ROI Focused** - Each tool provides business impact insights
- ✅ **Multiple Formats** - Support for various aspect ratios and use cases

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- Google AI API key ([Get one here](https://aistudio.google.com/apikey))
- Claude Desktop (for MCP integration)

### Installation

```bash
npm install -g gemini-image-mcp
```

Or install locally:

```bash
npm install gemini-image-mcp
```

### Configuration

1. **Set up your API key:**
   ```bash
   export GOOGLE_API_KEY='your-google-ai-api-key'
   ```

2. **Configure Claude Desktop:**
   
   Add to your `claude_desktop_config.json`:
   
   ```json
   {
     "mcpServers": {
       "gemini-image": {
         "command": "gemini-image-mcp",
         "env": {
           "GOOGLE_API_KEY": "your-google-ai-api-key"
         }
       }
     }
   }
   ```

3. **Start using in Claude:**
   - Restart Claude Desktop
   - Look for the 🔌 MCP connection indicator
   - Use the image generation tools in your conversations

## 📖 Usage Examples

### Generate Marketing Images

```
Use the generateMarketingImage tool to create a hero image for my coffee shop website. 
I want a warm, inviting scene showing a barista crafting latte art, with golden hour lighting 
and a cozy cafe atmosphere in the background.
```

### Create Business Logos

```
Use the createBusinessLogo tool to design a modern logo for "TechFlow Solutions" 
with a minimalist style, incorporating a subtle tech icon, using blue and gray colors.
```

### Design Product Mockups

```
Use the createProductMockup tool to create a mockup of my new organic skincare bottle. 
It's a 50ml glass bottle with dropper, sage green color, with "Pure Botanics" branding. 
I need a clean studio shot with soft lighting for my e-commerce site.
```

## 🛠️ Development

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/gemini-image-mcp.git
   cd gemini-image-mcp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   # Add your GOOGLE_API_KEY to .env
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

### Testing the Server

```bash
# Test with a simple image generation
echo '{"method": "tools/call", "params": {"name": "generateMarketingImage", "arguments": {"prompt": "A simple test image"}}}' | npm start
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GOOGLE_API_KEY` | ✅ Yes | Google AI API key | - |
| `GEMINI_API_KEY` | ➖ Alternative | Alternative API key variable | - |
| `IMAGE_OUTPUT_DIR` | ❌ No | Custom output directory | `./generated-images` |

### Advanced Configuration

Create a `.env` file for additional settings:

```env
GOOGLE_API_KEY=your-api-key-here
IMAGE_OUTPUT_DIR=./custom-images
MAX_IMAGE_SIZE=50MB
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600
```

## 🖼️ Where to Find Your Generated Images

**⚠️ Important:** All images are saved on YOUR computer (not in Claude or the cloud)

### 📍 Quick Answer:
Images are saved in the **`generated-images/`** folder on your computer.

### 📚 Need Help Finding Them?
**→ [Click here for the complete beginner's guide](./FINDING-YOUR-IMAGES.md)** with screenshots and step-by-step instructions!

### File Organization:
```
generated-images/
├── marketing-1756761697374.png         (Marketing visuals)
├── logo-techflow-solutions-1756761698123.png   (Business logos)
└── product-organic-skincare-1756761699456.png  (Product mockups)
```

### How to View Your Images:
Since Claude Desktop cannot display images directly, you can view them by:

1. **Opening the folder:**
   ```bash
   open generated-images/  # macOS
   explorer generated-images\  # Windows
   ```

2. **Quick preview latest image:**
   ```bash
   ls -t generated-images/ | head -1 | xargs -I {} open "generated-images/{}"
   ```

## 🔒 Security & Privacy

- ✅ **API keys are never logged** or stored in generated files
- ✅ **Images are saved locally** - nothing sent to third parties
- ✅ **Input validation** on all parameters
- ✅ **Error handling** prevents information leakage
- ✅ **Rate limiting** support to prevent abuse

### Security Best Practices

1. **Store API keys securely** using environment variables
2. **Restrict API key permissions** in Google AI Studio
3. **Monitor API usage** to detect unexpected activity
4. **Keep the server updated** to the latest version

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 **Bug Reports** - Found a bug? Let us know!
- 💡 **Feature Requests** - Ideas for new capabilities
- 📖 **Documentation** - Help improve our docs
- 🔧 **Code** - Submit PRs for fixes and features
- 🎨 **Examples** - Share creative use cases

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure tests pass: `npm test`
5. Submit a pull request

## 📊 Roadmap

### Upcoming Features

- [ ] **Batch image generation** for efficient processing
- [ ] **Style transfer** capabilities
- [ ] **Image editing** tools (crop, resize, filters)
- [ ] **Template system** for consistent branding
- [ ] **Web interface** for visual management
- [ ] **Integration examples** for popular frameworks

### Version History

- **v1.0.0** - Initial release with core image generation tools
- More versions coming soon!

## 🆘 Support

### Getting Help

- 📖 **Documentation** - Check this README and inline docs
- 🐛 **Issues** - [Report bugs or request features](https://github.com/yourusername/gemini-image-mcp/issues)
- 💬 **Discussions** - [Community discussions and questions](https://github.com/yourusername/gemini-image-mcp/discussions)

### Common Issues

**Q: "Error: GOOGLE_API_KEY not found"**
A: Make sure you've set the environment variable: `export GOOGLE_API_KEY='your-key'`

**Q: "Images not generating"**
A: Check your API key is valid and you have sufficient quota at [Google AI Studio](https://aistudio.google.com)

**Q: "Claude doesn't see the MCP server"**
A: Restart Claude Desktop after updating the configuration file

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) - The protocol that makes this possible
- [Google AI](https://ai.google.dev) - For the powerful Gemini API
- [Anthropic](https://anthropic.com) - For Claude and the MCP SDK
- [Sharp](https://sharp.pixelplumbing.com) - For fast image processing

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/gemini-image-mcp&type=Date)](https://star-history.com/#yourusername/gemini-image-mcp&Date)

---

**Made with ❤️ for the open-source community**

*Happy image generating! 🎨*