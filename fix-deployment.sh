#!/bin/bash

echo "🚀 MANUAL DEPLOYMENT FIX"
echo "========================"

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files are in 'out' directory"
    echo ""
    echo "📋 NEXT STEPS:"
    echo "1. Commit these changes:"
    echo "   git add ."
    echo "   git commit -m 'Fix GitHub Pages deployment'"
    echo "   git push origin main"
    echo ""
    echo "2. Go to repository Settings > Pages"
    echo "3. Change Source to 'GitHub Actions'"
    echo "4. Wait 2-3 minutes for deployment"
    echo ""
    echo "🌐 Your dashboard will be at:"
    echo "https://YOUR_USERNAME.github.io/wefe-trail-dashboard/"
else
    echo "❌ Build failed!"
    exit 1
fi