# Basic Usage Examples

This document provides practical examples of using the Gemini Image MCP Server with Claude Desktop.

## 🚀 Getting Started

After installing and configuring the server, you can use these examples directly in your Claude Desktop conversations.

## 🎨 Marketing Image Generation

### Example 1: Coffee Shop Hero Image

```
Use the generateMarketingImage tool with these parameters:

prompt: "A cozy coffee shop interior with warm wood tables, exposed brick walls, vintage pendant lights, and a barista preparing latte art at a copper espresso machine. Customers working on laptops in soft window light."

businessContext:
- type: "cafe" 
- audience: "millennials"
- purpose: "hero-image"

style:
- lighting: "golden-hour"
- mood: "friendly" 
- colors: ["#8B4513", "#F5DEB3", "#D2691E"]

aspectRatio: "16:9"
```

**Expected Result:** Professional hero image suitable for website headers, social media banners, or marketing materials.

### Example 2: Tech Startup Office

```
Generate a marketing image for a modern tech office showing:
- Open collaborative workspace
- Standing desks with monitors
- Glass conference rooms
- Plants and natural light
- Diverse team working together

Business context: tech startup targeting professionals for website use
Style: professional mood with natural lighting
```

## 🏷️ Logo Creation

### Example 3: Restaurant Logo

```
Use the createBusinessLogo tool:

businessName: "Farm Fresh Bistro"
tagline: "From Garden to Table"

style:
- type: "modern"
- industry: "food"
- colors: ["#228B22", "#8FBC8F", "#2F4F4F"]
- includeIcon: true
- iconDescription: "stylized leaf or fork design"

format:
- background: "white"
- orientation: "horizontal"
```

### Example 4: Tech Company Logo

```
Create a logo for "CodeCraft Solutions" with:
- Minimalist, corporate style
- Tech industry focus  
- Blue and gray color scheme (#0066CC, #666666)
- Include a subtle geometric icon
- Square format for profile use
```

## 📦 Product Mockups

### Example 5: Skincare Product

```
Use the createProductMockup tool for:

product:
- name: "Glow Serum"
- type: "bottle"
- description: "30ml glass dropper bottle with amber tint and minimalist white label"
- branding: "Pure Radiance"

setting:
- environment: "studio"
- background: "white" 
- angle: "angle"

style:
- lighting: "studio-professional"
- colors: ["#FFB6C1", "#FFFFFF"]
```

### Example 6: Book Cover Mockup

```
Create a product mockup for my new cookbook:
- "Healthy Weeknight Meals" by Chef Maria
- Hardcover book format
- Show on a kitchen counter with ingredients around it
- Natural lighting for lifestyle feel
- Include the book title clearly visible on cover
```

## 📊 Visual Strategy

### Example 7: Restaurant Strategy

```
Use the visual-strategy prompt:

businessType: "Family Italian Restaurant"
goals: "increase foot traffic, showcase authentic atmosphere, attract families"
targetAudience: "Families with children, food enthusiasts, local community"
budget: "small-business"
timeline: "3 months for grand opening campaign"
```

This will generate a comprehensive strategy including:
- Priority visual content recommendations
- Platform-specific image formats
- Content calendar suggestions
- ROI projections for each image type

## 🔧 Advanced Usage Tips

### Batch Generation Strategy

For consistent branding across multiple images:

1. **Define your brand colors** once and reuse them
2. **Create a style guide** from your first successful generation
3. **Use consistent business context** parameters
4. **Save successful prompts** for future reference

### Optimization Techniques

**For Social Media:**
- Use 1:1 aspect ratio for Instagram posts
- Use 9:16 for Stories and Reels
- Include space for text overlays

**For E-commerce:**
- Request white backgrounds for main product shots
- Ask for lifestyle settings for contextual images
- Generate multiple angles of the same product

**For Marketing Materials:**
- Specify the exact use case (email header, website banner, etc.)
- Include brand colors consistently
- Request appropriate aspect ratios for your platforms

## 📁 File Management

Generated images are saved to `generated-images/` with descriptive names:

```
generated-images/
├── marketing-1756761697374.png
├── logo-farm-fresh-bistro-1756761698123.png
├── product-glow-serum-1756761699456.png
└── ...
```

### Quick Access Commands

```bash
# Open the generated images folder
open generated-images/

# View the most recent image
ls -t generated-images/ | head -1 | xargs -I {} open "generated-images/{}"

# View all images
open generated-images/*.png
```

## ❓ Troubleshooting

### Common Issues

**"No image data received"**
- Try simplifying your prompt
- Check your API key is valid
- Ensure you have sufficient API quota

**"Images too generic"**
- Add more specific business context
- Include brand colors and style preferences
- Be more descriptive about the desired mood and atmosphere

**"Text not readable in logos"**
- Specify the exact text in quotes
- Request specific font styles (serif, sans-serif, modern)
- Ask for high contrast between text and background

### Best Practices

1. **Be specific** - More details = better results
2. **Use business language** - Mention your industry, audience, and goals
3. **Iterate** - Refine prompts based on results
4. **Save what works** - Document successful prompts for reuse

## 🎯 Results You Can Expect

- **Marketing Images**: Professional quality suitable for websites and social media
- **Logos**: Clean, readable designs ready for business use
- **Product Mockups**: E-commerce ready images with proper lighting and composition
- **File Sizes**: Typically 150KB-2MB for optimal web use
- **Generation Time**: 3-8 seconds per image

Happy generating! 🎨