#!/bin/bash

# Quick deployment script for GitHub Pages

echo "🚀 Deploying WEFE Trail Dashboard to GitHub Pages..."

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files ready in 'out' directory"
    echo ""
    echo "🌐 To deploy:"
    echo "1. Commit and push your changes to GitHub"
    echo "2. In repository Settings > Pages, select:"
    echo "   - Source: Deploy from a branch"
    echo "   - Branch: main"
    echo "   - Folder: /(root)"
    echo "3. Your site will be available at: https://yourusername.github.io/wefe-trail-dashboard/"
else
    echo "❌ Build failed!"
    exit 1
fi