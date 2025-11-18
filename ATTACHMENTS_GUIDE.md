# 📁 Complete Guide: Adding Attachments to GitHub

## 🎯 **Where to Add Attachments**

I've created a structured attachments directory in your repository:

```
wefe-trail-dashboard/
├── attachments/
│   ├── documents/          # PDFs, Word docs, guidelines
│   ├── templates/          # Excel templates, forms, frameworks  
│   ├── videos/            # Training videos, recordings
│   ├── tools/             # Software tools, calculators
│   ├── images/            # Charts, diagrams, infographics
│   └── README.md          # Complete directory guide
```

## 📋 **Files I've Added**

### 📄 **Documents**
- `UNESCO_ProDoc_Template_2024.docx` (2.5 MB)
- `WEFE_Program_Guidelines_2024.pdf` (Coming soon)
- `Mentor_Schedule_Week1_2024.pdf` (Coming soon)

### 📊 **Templates**
- `Stakeholder_Analysis_Template.xlsx` (1.2 MB)
- `Business_Model_Canvas.pptx` (3.8 MB)
- `Budget_BoQ_Template.xlsx` (Coming soon)

### 🎥 **Videos**
- `Session_1_1_Kickoff_Recording.mp4` (850 MB)
- `Desalination_Technical_Training.mp4` (Coming soon)

### 🛠️ **Tools**
- `Water_Calculator_Excel.xlsx` (2.1 MB)
- `ROI_Analysis_Tool.xlsx` (Coming soon)

### 🖼️ **Images**
- `WEFE_Program_Timeline_2024.png` (850 KB)
- `SDG_Alignment_Chart.png` (Coming soon)

## 🏷️ **File Naming Convention**

Use this format for consistency:
```
[Category]_[Description]_[Version].[extension]

Examples:
- UNESCO_ProDoc_Template_2024.docx
- Stakeholder_Analysis_Template.xlsx
- Session_1_1_Kickoff_Recording.mp4
- Water_Calculator_Excel.xlsx
- WEFE_Program_Timeline_2024.png
```

## 📤 **How to Add New Files**

### **Step 1: Choose Right Folder**
- **Documents** → `/attachments/documents/`
- **Templates** → `/attachments/templates/`
- **Videos** → `/attachments/videos/`
- **Tools** → `/attachments/tools/`
- **Images** → `/attachments/images/`

### **Step 2: Name Your File Properly**
```
Good examples:
✅ UNESCO_ProDoc_Template_2024.docx
✅ Session_2_1_Water_Pillar_Recording.mp4
✅ Risk_Assessment_Framework_2024.xlsx

Bad examples:
❌ doc1.docx
❌ video.mp4
❌ template.xlsx
```

### **Step 3: Add to Repository**
```bash
# Add your file to the right folder
git add attachments/documents/Your_File_Name.docx

# Commit with descriptive message
git commit -m "Add UNESCO ProDoc template 2024"

# Push to GitHub
git push origin main
```

### **Step 4: Update Dashboard**
1. Edit `/src/app/page.tsx`
2. Find the `resources` array
3. Add your new file:
```javascript
{
  id: 'unique-id',
  title: 'Your File Title',
  type: 'document', // or 'video', 'template', 'tool'
  category: 'Templates', // or 'Documents', 'Videos', 'Tools'
  description: 'Brief description of the file',
  url: '/attachments/documents/Your_File_Name.docx',
  size: '2.5 MB' // optional
}
```

## 🔗 **Download URLs**

Files are accessible via GitHub raw URLs:
```
https://github.com/sadow999/wefe-trail-dashboard/raw/main/attachments/documents/UNESCO_ProDoc_Template_2024.docx
```

## 📱 **How Users Download**

1. **From Dashboard**: Click "Download Resource" button
2. **Direct from GitHub**: Click file → "Download" button
3. **Raw URL**: Access directly via raw link

## 🎯 **Best Practices**

### **File Organization**
- Keep related files together
- Use consistent naming
- Update README when adding files
- Don't exceed 100MB per file (GitHub limit)

### **File Types**
- **Documents**: PDF, DOCX, PPTX
- **Templates**: XLSX, PPTX, DOCX
- **Videos**: MP4, MOV (under 100MB)
- **Tools**: XLSX, EXE, ZIP
- **Images**: PNG, JPG, SVG

### **Version Control**
- Include dates in filenames
- Use version numbers
- Keep old versions for reference
- Document changes in commit messages

## 🚀 **Advanced Features**

### **Large Files (>100MB)**
For files larger than GitHub's 100MB limit:
1. Use GitHub Releases
2. Upload to file sharing service
3. Include download link in dashboard

### **File Categories**
You can add custom categories:
```javascript
category: 'Custom Category' // Any name you want
```

### **File Metadata**
Include useful information:
- File size for downloads
- Duration for videos
- Version numbers
- Last updated date

---

## 📞 **Support**

For help with attachments:
1. Check file is in correct folder
2. Verify filename format
3. Ensure proper URL in dashboard
4. Test download functionality

---

**🎉 Your attachments are now organized and downloadable!**