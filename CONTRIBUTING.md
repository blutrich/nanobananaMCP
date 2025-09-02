# Contributing to Gemini Image MCP Server

Thank you for your interest in contributing to the Gemini Image MCP Server! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful** - Treat everyone with respect and kindness
- **Be inclusive** - Welcome contributors from all backgrounds
- **Be constructive** - Provide helpful feedback and suggestions
- **Be collaborative** - Work together towards common goals

## 🚀 Getting Started

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/gemini-image-mcp.git
   cd gemini-image-mcp
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment**:
   ```bash
   cp .env.example .env
   # Add your GOOGLE_API_KEY to .env
   ```
5. **Run tests**:
   ```bash
   npm test
   ```

### Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** with proper testing
3. **Run linting and tests**:
   ```bash
   npm run lint
   npm test
   ```
4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new image generation capability"
   ```
5. **Push and create a Pull Request**

## 📝 Types of Contributions

### 🐛 Bug Reports

When filing bug reports, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected vs actual behavior**
- **Environment details** (Node.js version, OS, etc.)
- **Error messages** or logs if available
- **Screenshots** if applicable

**Template:**
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should have happened

## Actual Behavior
What actually happened

## Environment
- Node.js version:
- OS:
- Package version:

## Error Messages
```
Any error output
```

### 💡 Feature Requests

For feature requests, please include:

- **Use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other ways to solve this
- **Business value** - What impact would this have?

### 🔧 Code Contributions

#### Guidelines

1. **Follow existing patterns** in the codebase
2. **Write tests** for new functionality
3. **Update documentation** as needed
4. **Follow TypeScript best practices**
5. **Use meaningful variable names**
6. **Add proper error handling**

#### Code Style

- **TypeScript** - All code should be properly typed
- **ESLint** - Follow the configured linting rules
- **Formatting** - Use Prettier for consistent formatting
- **Comments** - Add JSDoc comments for public functions

#### Example Code Structure

```typescript
/**
 * Generate marketing images with business context
 * @param prompt - Detailed image description
 * @param businessContext - Business-specific parameters
 * @returns Promise with generated image path
 */
async function generateMarketingImage(
  prompt: string,
  businessContext?: BusinessContext
): Promise<ImageResult> {
  try {
    // Implementation
  } catch (error) {
    throw new Error(`Image generation failed: ${error.message}`);
  }
}
```

## 🧪 Testing

### Test Requirements

- **Unit tests** for all new functions
- **Integration tests** for API interactions
- **Error case testing** for robust error handling
- **Security tests** for input validation

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --testNamePattern="marketing image"

# Watch mode for development
npm run test:watch
```

### Writing Tests

```typescript
describe('generateMarketingImage', () => {
  it('should generate image with business context', async () => {
    const result = await generateMarketingImage(
      'coffee shop interior',
      { type: 'cafe', audience: 'millennials' }
    );
    
    expect(result.success).toBe(true);
    expect(result.filepath).toMatch(/marketing-.*\.png$/);
  });

  it('should handle API errors gracefully', async () => {
    // Mock API error
    jest.spyOn(model, 'generateContent').mockRejectedValue(
      new Error('API quota exceeded')
    );
    
    await expect(generateMarketingImage('test'))
      .rejects.toThrow('Image generation failed');
  });
});
```

## 📚 Documentation

### Documentation Standards

- **Clear examples** for all features
- **Complete API documentation** with parameters
- **Business use cases** showing practical applications
- **Security considerations** where relevant
- **Performance notes** for resource-intensive operations

### Documentation Structure

```markdown
### Function Name

**Description:** Brief description of what it does

**Parameters:**
- `param1` (string, required): Description
- `param2` (object, optional): Description

**Returns:**
- `Promise<Result>`: Description of return value

**Example:**
\`\`\`typescript
const result = await functionName('example', { option: true });
\`\`\`

**Business Impact:**
How this helps business users achieve their goals
```

## 🔒 Security Guidelines

### Security Considerations

1. **API Key Handling**
   - Never log API keys
   - Validate key format before use
   - Support secure environment variables

2. **Input Validation**
   - Validate all user inputs with Zod schemas
   - Sanitize file paths
   - Limit image sizes and generation rates

3. **Error Handling**
   - Don't expose internal details in errors
   - Log security events appropriately
   - Fail securely by default

### Security Testing

- Test input validation edge cases
- Verify API key protection
- Check file path security
- Test rate limiting if implemented

## 🚢 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes, backward compatible

### Commit Messages

Follow [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (no logic changes)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Pull Request Process

1. **Fill out PR template** completely
2. **Link related issues** using keywords
3. **Request appropriate reviewers**
4. **Address feedback** promptly
5. **Ensure CI passes** before merging

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Related Issues
Fixes #123

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Documentation updated

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass locally
- [ ] Documentation updated
```

## 🎯 Roadmap & Priorities

### High Priority

- Performance optimizations
- Additional image generation modes
- Better error handling and recovery
- Security enhancements

### Medium Priority

- Batch processing capabilities
- Template system for consistent branding
- Additional output formats
- Integration examples

### Low Priority

- Web UI for management
- Advanced editing capabilities
- Custom model fine-tuning
- Multi-language support

## 🤔 Questions?

- **General questions**: Use [GitHub Discussions](https://github.com/yourusername/gemini-image-mcp/discussions)
- **Bug reports**: Create an [issue](https://github.com/yourusername/gemini-image-mcp/issues)
- **Feature requests**: Create an [issue](https://github.com/yourusername/gemini-image-mcp/issues) with the "enhancement" label
- **Security issues**: Email maintainers directly (see SECURITY.md)

## 🙏 Recognition

Contributors will be:

- **Listed** in the project README
- **Credited** in release notes
- **Invited** to join the core team (for significant contributors)
- **Given maintainer access** (for trusted long-term contributors)

Thank you for contributing to the Gemini Image MCP Server! 🎉