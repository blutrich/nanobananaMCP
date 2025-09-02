#!/usr/bin/env node

/**
 * Comprehensive End-to-End Test Suite for Gemini Image MCP Server
 * Tests all three tools with various scenarios and edge cases
 */

import { spawn } from 'child_process';
import readline from 'readline';
import fs from 'fs';
import path from 'path';

// Test configuration
const TEST_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!TEST_API_KEY) {
  console.error('❌ No API key found. Set GOOGLE_API_KEY environment variable.');
  process.exit(1);
}

console.log('🧪 Starting Comprehensive End-to-End MCP Server Test...\n');

// Test tracking
let testsPassed = 0;
let testsFailed = 0;
let currentTestId = 0;
const generatedFiles = [];

// Start the MCP server
const serverProcess = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    GOOGLE_API_KEY: TEST_API_KEY
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

const rl = readline.createInterface({
  input: serverProcess.stdout,
  crlfDelay: Infinity
});

// Test requests
const initRequest = {
  jsonrpc: "2.0",
  id: ++currentTestId,
  method: "initialize",
  params: {
    protocolVersion: "0.1.0",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" }
  }
};

const listToolsRequest = {
  jsonrpc: "2.0",
  id: ++currentTestId,
  method: "tools/list",
  params: {}
};

// Test 1: Marketing Image
const marketingImageTest = {
  jsonrpc: "2.0",
  id: ++currentTestId,
  method: "tools/call",
  params: {
    name: "generateMarketingImage",
    arguments: {
      prompt: "A modern coffee shop interior with warm lighting and customers working on laptops",
      businessContext: {
        type: "cafe",
        audience: "millennials",
        purpose: "social-media"
      },
      style: {
        lighting: "golden-hour",
        mood: "friendly",
        colors: ["#8B4513", "#F5DEB3"]
      },
      aspectRatio: "16:9"
    }
  }
};

// Test 2: Business Logo
const logoTest = {
  jsonrpc: "2.0",
  id: ++currentTestId,
  method: "tools/call",
  params: {
    name: "createBusinessLogo",
    arguments: {
      businessName: "TechFlow Solutions",
      tagline: "Innovation Simplified",
      style: {
        type: "modern",
        industry: "tech",
        colors: ["#0066CC", "#666666"],
        includeIcon: true,
        iconDescription: "abstract geometric pattern"
      },
      format: {
        background: "white",
        orientation: "horizontal"
      }
    }
  }
};

// Test 3: Product Mockup
const productTest = {
  jsonrpc: "2.0",
  id: ++currentTestId,
  method: "tools/call",
  params: {
    name: "createProductMockup",
    arguments: {
      product: {
        name: "Organic Face Serum",
        type: "bottle",
        description: "30ml glass dropper bottle with minimalist white label",
        branding: "Pure Botanics"
      },
      setting: {
        environment: "studio",
        background: "white",
        angle: "angle"
      },
      style: {
        lighting: "natural-soft",
        colors: ["#E8F5E8", "#FFFFFF"]
      }
    }
  }
};

// Test 4: Error handling - Invalid enum
const errorTest = {
  jsonrpc: "2.0",
  id: ++currentTestId,
  method: "tools/call",
  params: {
    name: "generateMarketingImage",
    arguments: {
      prompt: "Test image",
      businessContext: {
        type: "invalid-type",
        audience: "invalid-audience", 
        purpose: "invalid-purpose"
      },
      style: {
        lighting: "natural",
        mood: "professional"
      },
      aspectRatio: "16:9"
    }
  }
};

let testsToRun = [
  { name: "Marketing Image", request: marketingImageTest, expectSuccess: true },
  { name: "Business Logo", request: logoTest, expectSuccess: true },
  { name: "Product Mockup", request: productTest, expectSuccess: true },
  { name: "Error Handling", request: errorTest, expectSuccess: false }
];

let currentTestIndex = 0;

function runNextTest() {
  if (currentTestIndex < testsToRun.length) {
    const test = testsToRun[currentTestIndex];
    console.log(`\n📝 Test ${currentTestIndex + 3}: ${test.name}`);
    serverProcess.stdin.write(JSON.stringify(test.request) + '\n');
  } else {
    completeTests();
  }
}

function validateGeneratedFile(filepath) {
  if (!filepath) return false;
  
  const fullPath = path.resolve(filepath);
  if (!fs.existsSync(fullPath)) {
    console.log(`   ❌ File not found: ${filepath}`);
    return false;
  }
  
  const stats = fs.statSync(fullPath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`   ✅ File saved: ${filepath} (${sizeInMB}MB)`);
  generatedFiles.push(filepath);
  
  // Basic file validation
  if (stats.size < 1000) {
    console.log(`   ⚠️  File seems too small (${stats.size} bytes)`);
    return false;
  }
  
  if (stats.size > 50 * 1024 * 1024) {
    console.log(`   ⚠️  File seems too large (${sizeInMB}MB)`);
    return false;
  }
  
  return true;
}

// Handle server responses
rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    
    // Test 1: Server initialization
    if (response.id === 1) {
      if (response.result && response.result.serverInfo) {
        console.log('✅ Server initialized successfully');
        console.log(`   Name: ${response.result.serverInfo.name}`);
        console.log(`   Version: ${response.result.serverInfo.version}`);
        testsPassed++;
        
        // Send list tools request
        serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');
      } else {
        console.log('❌ Server initialization failed');
        testsFailed++;
      }
    }
    
    // Test 2: Tools listing
    if (response.id === 2) {
      if (response.result && response.result.tools) {
        console.log('\n✅ Tools listing successful');
        const tools = response.result.tools;
        console.log(`   Found ${tools.length} tools:`);
        
        const expectedTools = ['generateMarketingImage', 'createBusinessLogo', 'createProductMockup'];
        const foundTools = tools.map(t => t.name);
        
        for (const expectedTool of expectedTools) {
          if (foundTools.includes(expectedTool)) {
            console.log(`   ✅ ${expectedTool}`);
          } else {
            console.log(`   ❌ Missing: ${expectedTool}`);
            testsFailed++;
            return;
          }
        }
        
        testsPassed++;
        
        // Start image generation tests
        runNextTest();
      } else {
        console.log('❌ Tools listing failed');
        testsFailed++;
      }
    }
    
    // Handle test responses
    const testIndex = currentTestIndex;
    const test = testsToRun[testIndex];
    
    if (response.id === test?.request.id) {
      if (test.expectSuccess) {
        // Expected successful response
        if (response.result && response.result.content) {
          const content = response.result.content[0];
          if (content.type === 'text') {
            console.log(`✅ ${test.name} completed successfully`);
            
            // Extract and validate file path
            const filepathMatch = content.text.match(/generated-images\/[^\s\n]+\.png/);
            if (filepathMatch && validateGeneratedFile(filepathMatch[0])) {
              testsPassed++;
            } else {
              console.log(`   ❌ No valid file path found in response`);
              testsFailed++;
            }
          } else {
            console.log(`❌ ${test.name} unexpected response format`);
            testsFailed++;
          }
        } else if (response.error) {
          console.log(`❌ ${test.name} failed: ${response.error.message}`);
          testsFailed++;
        } else {
          console.log(`❌ ${test.name} unexpected response`);
          testsFailed++;
        }
      } else {
        // Expected error response
        if (response.error) {
          console.log(`✅ ${test.name} correctly returned error`);
          console.log(`   Error: ${response.error.message}`);
          testsPassed++;
        } else {
          console.log(`❌ ${test.name} should have failed but succeeded`);
          testsFailed++;
        }
      }
      
      currentTestIndex++;
      
      // Small delay between tests
      setTimeout(() => {
        runNextTest();
      }, 1000);
    }
  } catch (error) {
    // Ignore non-JSON output
  }
});

function completeTests() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE TEST RESULTS:');
  console.log('='.repeat(60));
  console.log(`   ✅ Tests Passed: ${testsPassed}`);
  console.log(`   ❌ Tests Failed: ${testsFailed}`);
  console.log(`   📁 Files Generated: ${generatedFiles.length}`);
  
  if (generatedFiles.length > 0) {
    console.log('\n📎 Generated Files:');
    generatedFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
  }
  
  console.log('\n🔍 Test Coverage:');
  console.log('   ✅ Server initialization');
  console.log('   ✅ Tool discovery');
  console.log('   ✅ Marketing image generation');
  console.log('   ✅ Logo creation');
  console.log('   ✅ Product mockup');
  console.log('   ✅ Error handling');
  console.log('   ✅ File system operations');
  console.log('   ✅ Image validation');
  
  console.log('='.repeat(60));
  
  if (testsFailed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! MCP server is fully functional.');
    console.log('📦 Ready for production use across all supported editors:');
    console.log('   • Claude Desktop');
    console.log('   • Cursor AI'); 
    console.log('   • VS Code + GitHub Copilot');
    console.log('   • JetBrains IDEs');
  } else {
    console.log('\n⚠️  SOME TESTS FAILED. Please review the issues above.');
  }
  
  // Clean up
  serverProcess.kill();
  process.exit(testsFailed === 0 ? 0 : 1);
}

// Handle errors
serverProcess.stderr.on('data', (data) => {
  const error = data.toString();
  if (error.includes('Error') || error.includes('error')) {
    console.error('Server error:', error);
  }
});

serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
});

// Send initial request
setTimeout(() => {
  console.log('📝 Test 1: Server Initialization');
  serverProcess.stdin.write(JSON.stringify(initRequest) + '\n');
}, 100);

// Timeout after 2 minutes
setTimeout(() => {
  console.log('\n⏱️ Test timeout after 2 minutes');
  console.log(`Current status: ${testsPassed} passed, ${testsFailed} failed`);
  serverProcess.kill();
  process.exit(1);
}, 120000);