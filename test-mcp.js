#!/usr/bin/env node

/**
 * Test script for Gemini Image MCP Server
 * This tests the actual MCP server functionality
 */

import { spawn } from 'child_process';
import readline from 'readline';

// Test configuration
const TEST_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!TEST_API_KEY) {
  console.error('❌ No API key found. Set GOOGLE_API_KEY environment variable.');
  process.exit(1);
}

console.log('🧪 Starting MCP Server Test...\n');

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

let testsPassed = 0;
let testsFailed = 0;

// Test 1: Server initialization
console.log('📝 Test 1: Server Initialization');
const initRequest = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "0.1.0",
    capabilities: {},
    clientInfo: {
      name: "test-client",
      version: "1.0.0"
    }
  }
};

// Test 2: List tools
const listToolsRequest = {
  jsonrpc: "2.0",
  id: 2,
  method: "tools/list",
  params: {}
};

// Test 3: Generate a test marketing image
const generateImageRequest = {
  jsonrpc: "2.0",
  id: 3,
  method: "tools/call",
  params: {
    name: "generateMarketingImage",
    arguments: {
      prompt: "A simple test image of a modern office space with natural lighting",
      businessContext: {
        type: "tech",
        audience: "professional",
        purpose: "website"
      },
      style: {
        lighting: "natural",
        mood: "professional"
      },
      aspectRatio: "16:9"
    }
  }
};

// Handle server responses
rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    
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
    
    if (response.id === 2) {
      if (response.result && response.result.tools) {
        console.log('\n✅ Tools listing successful');
        console.log('   Available tools:');
        response.result.tools.forEach(tool => {
          console.log(`   - ${tool.name}: ${tool.description}`);
        });
        testsPassed++;
        
        // Send image generation request
        console.log('\n📝 Test 3: Image Generation (this may take a few seconds...)');
        serverProcess.stdin.write(JSON.stringify(generateImageRequest) + '\n');
      } else {
        console.log('❌ Tools listing failed');
        testsFailed++;
      }
    }
    
    if (response.id === 3) {
      if (response.result && response.result.content) {
        const content = response.result.content[0];
        if (content.type === 'text') {
          console.log('✅ Image generation completed');
          
          // Check if filepath is mentioned
          if (content.text.includes('generated-images/')) {
            console.log('✅ Image saved to file system');
            const filepath = content.text.match(/generated-images\/[^\s]+/);
            if (filepath) {
              console.log(`   File: ${filepath[0]}`);
            }
            testsPassed++;
          } else {
            console.log('⚠️  Image generation response received but no file path found');
          }
        }
      } else if (response.error) {
        console.log('❌ Image generation failed:', response.error.message);
        testsFailed++;
      }
      
      // Complete testing
      console.log('\n' + '='.repeat(50));
      console.log('📊 Test Results:');
      console.log(`   ✅ Passed: ${testsPassed}`);
      console.log(`   ❌ Failed: ${testsFailed}`);
      console.log('='.repeat(50));
      
      if (testsFailed === 0) {
        console.log('\n🎉 All tests passed! MCP server is working correctly.');
      } else {
        console.log('\n⚠️  Some tests failed. Please check the configuration.');
      }
      
      // Clean up
      serverProcess.kill();
      process.exit(testsFailed === 0 ? 0 : 1);
    }
  } catch (error) {
    // Ignore non-JSON output
  }
});

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
  serverProcess.stdin.write(JSON.stringify(initRequest) + '\n');
}, 100);

// Timeout after 30 seconds
setTimeout(() => {
  console.log('\n⏱️ Test timeout after 30 seconds');
  serverProcess.kill();
  process.exit(1);
}, 30000);